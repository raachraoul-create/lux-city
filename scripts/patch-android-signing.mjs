import fs from 'node:fs';
const p='android/app/build.gradle';if(!fs.existsSync(p))process.exit(0);
let s=fs.readFileSync(p,'utf8');
if(!s.includes('luxcity-release.jks')){
 s=s.replace(/android\s*\{/,'android {\n    signingConfigs {\n        release {\n            storeFile file("luxcity-release.jks")\n            storePassword System.getenv("LUXCITY_KEYSTORE_PASSWORD")\n            keyAlias System.getenv("LUXCITY_KEY_ALIAS")\n            keyPassword System.getenv("LUXCITY_KEY_PASSWORD")\n        }\n    }');
 s=s.replace(/buildTypes\s*\{\s*release\s*\{/,'buildTypes {\n        release {\n            signingConfig signingConfigs.release');
 fs.writeFileSync(p,s)
}
