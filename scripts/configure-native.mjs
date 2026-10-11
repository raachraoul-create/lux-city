import fs from 'node:fs';
function patchAndroid(){
 const p='android/app/src/main/AndroidManifest.xml';if(!fs.existsSync(p))return;
 let s=fs.readFileSync(p,'utf8');
 s=s.replace(/(<activity\b[^>]*android:name="\.MainActivity"[^>]*)(>)/s,(m,a,b)=>/screenOrientation=/.test(a)?m:a+' android:screenOrientation="sensorLandscape"'+b);
 fs.writeFileSync(p,s)
}
function patchIOS(){
 const p='ios/App/App/Info.plist';if(!fs.existsSync(p))return;
 let s=fs.readFileSync(p,'utf8');
 const block='<key>UIRequiresFullScreen</key><true/><key>UISupportedInterfaceOrientations</key><array><string>UIInterfaceOrientationLandscapeLeft</string><string>UIInterfaceOrientationLandscapeRight</string></array><key>UISupportedInterfaceOrientations~ipad</key><array><string>UIInterfaceOrientationLandscapeLeft</string><string>UIInterfaceOrientationLandscapeRight</string></array>';
 s=s.replace(/<key>UIRequiresFullScreen<\/key>\s*<(?:true|false)\/>/g,'').replace(/<key>UISupportedInterfaceOrientations(?:~ipad)?<\/key>\s*<array>[\s\S]*?<\/array>/g,'');
 s=s.replace('</dict>',block+'</dict>');fs.writeFileSync(p,s)
}
patchAndroid();patchIOS();console.log('Native orientation locked to landscape.');
