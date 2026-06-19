# Requirements Document

## Introduction

This feature adds curated travel content (Top Places, Yurt Stays, Stargazing Spots, Drone Photography Spots) and a dedicated drone-regulations information screen to the existing Kyrgyzstan Travel PWA. The new content integrates with the existing **Itinerary** feature (`#/itinerario`, populated from the global `ITINERARY` array, with per-day custom activities persisted to the IndexedDB `edits` store) and the existing **Saved Places** feature (`#/gps`, populated from `DEFAULT_PLACES` / `RECOMMENDED_PLACES`, with user bookmarks persisted to the IndexedDB `places` store).

The feature introduces a single underlying **Place entity** that is tagged with one or more **categories** (`top-place`, `yurt-stay`, `stargazing`, `drone-spot`) so that places appearing in multiple curated lists (for example Song-Kul Lake and Kel-Suu Lake) exist as one canonical record rather than being duplicated per list. Every curated entry is browsable, addable to the user's Itinerary on a specific day, and bookmarkable into Saved Places.

The existing Drone screen (`#/droni`, currently rendered from `DRONE_INFO`) is extended with the visitor-specific regulations supplied for this feature and with the new curated drone photography spots.

> ⚠️ **Resolved — drone regulations contradiction reflects real legal ambiguity.** The source content for this feature contains a direct contradiction:
> 1. "Foreign visitor drone flights are not allowed."
> 2. "You can bring a drone through customs and fly in mountains and natural areas."
>
> Web research (drone-laws.com, UAV Coach, March 2025 reporting on Kyrgyzstan's UAV tracking pilot) confirms the contradiction is **intrinsic to the source content itself**, not a copy-paste error. The Kyrgyz Civil Aviation Agency has not codified drone regulations, and the same authoritative reference page that says foreign visitor drone flights are "not allowed" also states drone operations are "currently not regulated" and that pilot license / registration / Remote ID / insurance are "not applicable" for tourists. Tourist field reports include both successful flights and drone confiscation at customs.
>
> **Chosen resolution: keep the contradiction visible AND surface ambiguity context.** Requirement 6 retains both statements together with a flagged warning (AC 6.4) and adds an "Ambiguity Context" block explaining the four reasons the rules are unclear, a "Recommended Safest Practices" block (AC 6.7), and source attribution with a last-verified date stamp (AC 6.8). See the resolved entry under "Open Questions for User Clarification" below.

## Glossary

- **PWA**: The existing Kyrgyzstan Travel PWA (vanilla JS, Capacitor Android wrapper, hash router, IndexedDB persistence).
- **Place**: A single canonical record describing a geographic point of interest. Fields: `id`, `name`, `lat`, `lng`, `categories` (array of category keys), `description`, `region`, `notes`, optional `source`.
- **Category**: A tag attached to a Place. Defined keys for this feature: `top-place`, `yurt-stay`, `stargazing`, `drone-spot`. A Place MAY carry one or more categories.
- **Curated List**: A user-facing list of Places filtered by a single category. Four lists are defined: Top Places, Yurt Stays, Stargazing Spots, Drone Photography Spots.
- **Highlights Section**: The new top-level screen of the PWA (route `#/highlights`) that lets the user browse the four Curated Lists.
- **Drone Info Section**: The existing screen at route `#/droni`, extended by this feature with visitor-specific regulations and the curated drone photography spots.
- **Itinerary**: The existing feature at route `#/itinerario` that displays a 15-day plan from the global `ITINERARY` array. Each day exposes an "Aggiungi attività" button that appends a custom activity stored under the `edits` IndexedDB store with key `itinerary-day-{N}-activities`.
- **Saved Places**: The existing feature at route `#/gps`. The "I Miei" tab lists user-bookmarked Places persisted in the `places` IndexedDB store.
- **Itinerary_Integration**: The mechanism that adds a Place from a Curated List to a chosen Itinerary day as a new custom activity.
- **Saved_Places_Integration**: The mechanism that bookmarks a Place from a Curated List into the user's Saved Places "I Miei" tab.
- **Place_Repository**: The in-memory data module that exposes the canonical, deduplicated set of Places and their categories. Implemented as a global JavaScript variable consistent with the existing `DEFAULT_PLACES` / `RECOMMENDED_PLACES` / `DRONE_INFO` style.
- **Drone_Regulation_Advisory**: The text block on the Drone Info Section that summarises drone rules for foreign visitors. Includes the flagged contradiction (both source statements with warning labels), an **Ambiguity Context** block explaining why the rules are unclear, a **Recommended Safest Practices** block, and **source attribution** links with a last-verified date stamp.

## Requirements

### Requirement 1: Unified Place Repository with Category Tagging

**User Story:** As a traveller, I want places that appear in more than one curated list (Song-Kul, Kel-Suu, Altyn-Arashan) to be a single record with multiple tags, so that when I bookmark or add such a place I do not create duplicate entries in my Saved Places or Itinerary.

#### Acceptance Criteria

1. THE Place_Repository SHALL expose a single Place record for each unique geographic location across the four Curated Lists.
2. THE Place_Repository SHALL assign one or more category keys from the set `{top-place, yurt-stay, stargazing, drone-spot}` to each Place.
3. WHERE a Place appears in multiple source lists supplied for this feature, THE Place_Repository SHALL set the Place `categories` field to contain every matching category key, and a `categories` array containing a single matching key SHALL satisfy this requirement when the Place appears in only one supplied list.
4. THE Place_Repository SHALL include for each Place: a stable string `id`, a `name`, numeric `lat` and `lng`, a non-empty `categories` array, a `region` string, and a `description` string.
5. WHERE coordinates for a Place already exist in the current PWA data (`DEFAULT_PLACES`, `RECOMMENDED_PLACES`, or `ITINERARY[].gps`), THE Place_Repository SHALL reuse the existing latitude and longitude rather than introducing new values.
6. IF the Place_Repository is asked for a Place by id and no such Place exists, THEN THE Place_Repository SHALL return a null result.

### Requirement 2: Top Places Curated List

**User Story:** As a traveller planning my trip, I want to browse the Top 5 Places in Kyrgyzstan, so that I can decide which ones to visit.

#### Acceptance Criteria

1. THE Place_Repository SHALL include exactly five Places tagged with the `top-place` category: Song-Kul Lake, Kel-Suu Lake, Altyn-Arashan, Jeti-Oguz, and Issyk-Kul Lake.
2. THE Highlights Section SHALL display a Curated List named "Top Places" that shows all Places carrying the `top-place` category.
3. WHEN the user opens the Top Places list, THE Highlights Section SHALL display, for each Place, the name, region, and the supplied descriptive blurb.
4. THE Highlights Section SHALL display each entry in the Top Places list with an action to add the Place to the Itinerary and an action to bookmark the Place in Saved Places.
5. IF the Place_Repository contains zero Places carrying the `top-place` category, THEN THE Highlights Section SHALL hide the "Top Places" Curated List entirely rather than displaying an empty list.

### Requirement 3: Yurt Stays Curated List

**User Story:** As a traveller looking for nomadic experiences, I want to browse the Top Places to Stay in a Yurt, so that I can choose which yurt camps to include in my plan.

#### Acceptance Criteria

1. THE Place_Repository SHALL include Places tagged with the `yurt-stay` category for: Kok-Kiya Valley, Kol-Ukok Lake, Song-Kul Lake, Kilemche Valley, and Kel-Suu Lake.
2. THE Highlights Section SHALL display a Curated List named "Yurt Stays" that shows all Places carrying the `yurt-stay` category.
3. WHEN the user opens the Yurt Stays list, THE Highlights Section SHALL display, for each Place, the name and the region.
4. THE Highlights Section SHALL display each entry in the Yurt Stays list with an action to add the Place to the Itinerary and an action to bookmark the Place in Saved Places.
5. IF a Place tagged with the `yurt-stay` category is missing a required field (`name`, `lat`, `lng`, or `region`), THEN THE Highlights Section SHALL omit that Place from the Yurt Stays list rather than rendering a partial entry.

### Requirement 4: Stargazing Spots Curated List

**User Story:** As a traveller interested in night skies, I want to browse the Top Stargazing Spots, so that I can plan night-photography stops.

#### Acceptance Criteria

1. THE Place_Repository SHALL include Places tagged with the `stargazing` category for: Kel-Suu Lake (Naryn region), Tash-Rabat (Naryn region), Altyn-Arashan (Issyk-Kul region), Ala-Kul Lake (Issyk-Kul region), Song-Kul Lake (Naryn region), and Kok-Kiya (Naryn region).
2. THE Highlights Section SHALL display a Curated List named "Stargazing Spots" that shows all Places carrying the `stargazing` category.
3. WHEN the user opens the Stargazing Spots list, THE Highlights Section SHALL display, for each Place, the name and the region.
4. THE Highlights Section SHALL display each entry in the Stargazing Spots list with an action to add the Place to the Itinerary and an action to bookmark the Place in Saved Places.
5. IF the Itinerary_Integration or Saved_Places_Integration actions cannot be loaded for a Stargazing Spots entry, THEN THE Highlights Section SHALL still render the entry (name, region) so the user can read the information, and SHALL hide or disable only the failing action control.

### Requirement 5: Drone Photography Spots Curated List

**User Story:** As a traveller flying a drone, I want to browse the Top Drone Photography Spots, so that I know where the best aerial footage opportunities are.

#### Acceptance Criteria

1. THE Place_Repository SHALL include Places tagged with the `drone-spot` category for: Son-Kul Lake, Karakol Gorge, Barskoon Waterfall, Ak-Say Canyon, Eshenkul Lake, Arstanbap, and Tulpar Kol.
2. THE Highlights Section SHALL display a Curated List named "Drone Photography Spots" that shows all Places carrying the `drone-spot` category.
3. THE Drone Info Section SHALL display the same Drone Photography Spots list, sourced from the same Place_Repository records, alongside the Drone_Regulation_Advisory.
4. THE Highlights Section SHALL display each entry in the Drone Photography Spots list with an action to add the Place to the Itinerary and an action to bookmark the Place in Saved Places.
5. IF the Place_Repository contains zero Places carrying the `drone-spot` category, THEN THE Highlights Section SHALL hide the "Drone Photography Spots" Curated List entirely, and THE Drone Info Section SHALL hide the embedded Drone Photography Spots list while still displaying the Drone_Regulation_Advisory.

### Requirement 6: Drone Regulation Advisory for Foreign Visitors

**User Story:** As a foreign visitor planning to fly a drone, I want a single screen that summarises the drone rules that apply to me, so that I do not break local laws or get my drone confiscated.

#### Acceptance Criteria

1. THE Drone Info Section SHALL display a Drone_Regulation_Advisory block containing every rule supplied for this feature, including: drone operations in Kyrgyzstan are not currently regulated; foreign visitor pilot license is not applicable; drone registration, Remote ID, and insurance are not applicable for tourists; bringing a drone through customs is allowed; flying in mountains and natural areas is allowed.
2. THE Drone Info Section SHALL display a "Where NOT to fly" list containing: cities, near government buildings, military zones, airports, and near borders (including remote border areas).
3. THE Drone Info Section SHALL display a tips block stating: respect nature, check weather, follow local regulations.
4. WHILE the source content contains contradictory statements about whether foreign visitor drone flights are allowed, THE Drone Info Section SHALL display both statements together with a clear warning label, AND SHALL display an "Ambiguity Context" block explaining: (a) Kyrgyzstan has no codified drone regulations; (b) tourists have reported both successful flights and drone confiscation at customs; (c) rules are evolving — Kyrgyzstan was reported in March 2025 to be testing a drone tracking system; (d) the sub-250g drone class (e.g. DJI Mini 2) does not receive automatic exemption because Kyrgyzstan has no weight-based legal framework.
5. WHERE the source content for the Drone_Regulation_Advisory is missing required fields, fails to load, or fails an integrity check, THE Drone Info Section SHALL render the same flagged advisory styling used for contradictions and SHALL identify which content reliability issue triggered the flag.
6. THE Drone Info Section SHALL preserve the existing `DRONE_INFO.regolamenti`, `DRONE_INFO.noFlyZones`, `DRONE_INFO.bestSpots`, and `DRONE_INFO.altitudeTips` content currently visible to the user, or migrate that content into the new Drone_Regulation_Advisory structure without information loss.
7. THE Drone Info Section SHALL include a "Recommended Safest Practices" block stating: stay below 120 m AGL, keep visual line of sight, avoid the listed no-fly zones, and consult the CAA (caa.kg) before flying in case rules have changed.
8. THE Drone Info Section SHALL display source attribution links for the Drone_Regulation_Advisory pointing to drone-laws.com (https://drone-laws.com/drone-laws-in-kyrgyzstan/) and the CAA (http://caa.kg/), together with a "last verified" date stamp set to 2026-05-25.

### Requirement 7: Add Curated Place to Itinerary

**User Story:** As a traveller browsing a Curated List, I want to add a Place to a specific day of my Itinerary, so that the Place appears in my day-by-day plan.

#### Acceptance Criteria

1. WHEN the user activates the "Add to Itinerary" action on a Curated List entry, THE Itinerary_Integration SHALL prompt the user to choose one day from the existing 15-day Itinerary.
2. WHEN the user confirms a chosen day, THE Itinerary_Integration SHALL append a custom activity for that day under the IndexedDB `edits` store with key `itinerary-day-{day}-activities`, using the same array format used by the existing "Aggiungi attività" feature.
3. THE custom activity text appended by THE Itinerary_Integration SHALL include the Place name and the Place categories, so that the user can identify the source list when later reviewing the day.
4. WHEN THE Itinerary_Integration successfully appends a custom activity, THE Highlights Section SHALL display a confirmation toast using the existing `showToast` mechanism.
5. IF the user cancels the day-selection prompt, THEN THE Itinerary_Integration SHALL make no changes to the `edits` store.
6. IF a write to the IndexedDB `edits` store fails, THEN THE Itinerary_Integration SHALL display a failure message via `showToast` and SHALL leave the Itinerary state unchanged.

### Requirement 8: Bookmark Curated Place in Saved Places

**User Story:** As a traveller browsing a Curated List, I want to bookmark a Place into my Saved Places, so that I can find it later in the "I Miei" tab.

#### Acceptance Criteria

1. WHEN the user activates the "Bookmark" action on a Curated List entry, THE Saved_Places_Integration SHALL write the Place to the IndexedDB `places` store using a record shape compatible with the existing Saved Places schema (`id`, `name`, `lat`, `lng`, `category`, `notes`, `source`).
2. THE bookmarked record id written by THE Saved_Places_Integration SHALL begin with the prefix `rec-` so that the existing Saved Places "I Miei" tab treats the entry as user-added and renders the delete control.
3. WHEN THE Saved_Places_Integration writes a bookmark for a Place that is already present in the `places` store with the same Place_Repository id, THE Saved_Places_Integration SHALL update the existing record rather than creating a duplicate.
4. WHEN THE Saved_Places_Integration successfully writes a bookmark, THE Highlights Section SHALL display a confirmation toast using the existing `showToast` mechanism.
5. IF a write to the IndexedDB `places` store fails, THEN THE Saved_Places_Integration SHALL display a failure message via `showToast` and SHALL leave the Saved Places state unchanged.

### Requirement 9: Highlights Section Navigation Entry

**User Story:** As a traveller, I want to reach the curated content from the home screen, so that I can browse it without searching for a hidden route.

#### Acceptance Criteria

1. THE PWA SHALL register a hash route `#/highlights` that renders the Highlights Section.
2. THE Highlights Section SHALL appear as a navigation tile on the home screen grid, alongside the existing tiles defined in `DEFAULT_NAV_ITEMS`.
3. THE Highlights Section SHALL display the four Curated Lists as switchable categories (Top Places, Yurt Stays, Stargazing Spots, Drone Photography Spots) using the same tab pattern already used by the Saved Places screen.
4. WHEN the user selects a category tab on the Highlights Section, THE Highlights Section SHALL display only Places carrying the corresponding category key.

### Requirement 10: Offline Behaviour

**User Story:** As a traveller in remote Kyrgyzstan with no connectivity, I want the curated content and drone regulations to remain visible offline, so that the information is useful when I need it most.

#### Acceptance Criteria

1. THE Place_Repository SHALL be loaded from a static JavaScript source bundled with the PWA, with no network request required at runtime.
2. THE Drone_Regulation_Advisory SHALL be loaded from a static source bundled with the PWA, with no network request required at runtime.
3. WHILE the device is offline, THE Itinerary_Integration SHALL successfully append a custom activity to the IndexedDB `edits` store, and the absence of network connectivity alone SHALL NOT cause the append operation to fail.
4. WHILE the device is offline, THE Saved_Places_Integration SHALL successfully write a bookmark to the IndexedDB `places` store, and the absence of network connectivity alone SHALL NOT cause the write operation to fail.
5. IF an offline append or write fails because of an underlying IndexedDB fault (storage quota exceeded, database corruption, or transaction abort), THEN the failure handling defined by Requirement 7.6 and Requirement 8.5 SHALL apply.

---

## Open Questions for User Clarification

All previously open questions for this feature have been resolved. The resolutions are recorded below for traceability.

1. **Drone regulation contradiction. ✅ RESOLVED — Keep contradiction + add ambiguity context.** The supplied source content contains two contradictory statements:
   - (a) "Foreign visitor drone flights are not allowed in Kyrgyzstan."
   - (b) "You can bring a drone through customs and fly in mountains and natural areas."

   **Resolution applied:** Both statements remain visible in the Drone_Regulation_Advisory under a flagged warning (AC 6.4). Web research confirmed the contradiction is intrinsic to the source content and reflects genuine legal ambiguity rather than a copy-paste error, so neither statement is treated as authoritative.

   The following four ambiguity context points are now embedded in Requirement 6 (AC 6.4):
   - (a) Kyrgyzstan has no codified drone regulations (the Civil Aviation Agency has not issued a UAV legal framework).
   - (b) Tourist field reports include both successful flights and drone confiscation at customs.
   - (c) Rules are evolving — Kyrgyzstan was reported in March 2025 to be testing a drone tracking system.
   - (d) The sub-250g drone class (e.g. DJI Mini 2) does not receive automatic exemption because Kyrgyzstan has no weight-based legal framework.

   In addition, AC 6.7 introduces a "Recommended Safest Practices" block (stay below 120 m AGL, keep visual line of sight, avoid the listed no-fly zones, consult caa.kg before flying), and AC 6.8 adds source attribution links (drone-laws.com, caa.kg) with a last-verified date stamp of 2026-05-25.
