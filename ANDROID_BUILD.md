# Kyrgyzstan 2025 — Android Build

## Prerequisiti
- Node.js 18+
- Android Studio (con SDK 34+)
- JDK 17

## Setup rapido

```bash
cd kyrgyzstan-pwa
npm install
```

## Build e apertura in Android Studio

```bash
npm run cap:build
```

Questo comando:
1. Copia i file web in `www/`
2. Sincronizza con il progetto Android
3. Apre Android Studio

## Da Android Studio
- **Run** → seleziona emulatore o dispositivo collegato via USB
- **Build** → **Build Bundle / APK** → **Build APK** per generare l'APK

## Comandi singoli

| Comando | Descrizione |
|---------|-------------|
| `npm run build` | Copia assets web in www/ |
| `npm run cap:sync` | Build + sync con Android |
| `npm run cap:open` | Apre Android Studio |

## Generare APK firmato (per Play Store)

Da Android Studio:
1. **Build** → **Generate Signed Bundle / APK**
2. Scegli **APK** o **Android App Bundle**
3. Crea un keystore (o usa uno esistente)
4. Firma e genera

## Sideload diretto (senza Play Store)

1. Genera APK debug: **Build** → **Build APK**
2. Il file sarà in `android/app/build/outputs/apk/debug/app-debug.apk`
3. Trasferisci sul telefono e installa (abilita "Origini sconosciute")

## Icona app

Per sostituire l'icona di default, metti la tua icona 512x512 in `icons/icon-512.png` e usa
[Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/icons-launcher.html)
per generare tutte le dimensioni, poi copia in `android/app/src/main/res/mipmap-*/`.
