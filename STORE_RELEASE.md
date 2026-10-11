# Lux City – Store Release

Die nativen Debug-/Archiv-Builds für Android und iOS laufen bereits erfolgreich.

## Einmalig benötigte Store-Zugänge

### Google Play Console
Repository-Secrets:
- GOOGLE_PLAY_SERVICE_ACCOUNT_JSON
- ANDROID_KEYSTORE_BASE64
- ANDROID_KEYSTORE_PASSWORD
- ANDROID_KEY_ALIAS
- ANDROID_KEY_PASSWORD

### Apple App Store Connect
Repository-Secrets:
- APPLE_CERTIFICATE_P12_BASE64
- APPLE_CERTIFICATE_PASSWORD
- APPLE_PROVISIONING_PROFILE_BASE64
- APP_STORE_CONNECT_KEY_ID
- APP_STORE_CONNECT_ISSUER_ID
- APP_STORE_CONNECT_PRIVATE_KEY

Danach kann der Workflow `Publish mobile stores` gestartet werden. Android wird zuerst auf den internen Play-Testtrack hochgeladen, iOS zu TestFlight.

Bundle-/Package-ID: `lu.luxcity.game`
Datenschutz: https://raachraoul-create.github.io/lux-city/privacy.html
Support: https://raachraoul-create.github.io/lux-city/
