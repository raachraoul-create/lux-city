# Lux City graphics 9.7.0

Changes are scoped to graphics-six-hour-pass.

- Fix the pre-existing missing closing parenthesis in the landscape module; the original module failed Node syntax checking.
- Add surface bump maps, proportional gabled roofs, visible side/rear windows and glass in front of interior panels.
- Align centre-road markings to the actual meshes; remove duplicate expanded crosswalks; leave intersections free of centre markings and curbs.
- Smooth sky transitions and hill shapes, add irregular tree crowns, and make the day/night module the owner of sun intensity.
- Correct weather tinting of textured surfaces, focus shadows around the player, and share static detail draws in spatial cells.
- Keep the same expanded building footprints on mobile and desktop.

Verification: all seven changed/new JavaScript modules pass node --check. Real Three.js 0.180.0 geometry and module initialisation were exercised in Node for desktop and mobile with canvas/network/renderer stubs, through noon, dusk, night and dawn. Vertex positions are finite, road/ground materials have bump maps, base player and road transforms stay unchanged. A synthetic two-house scene has 2,957 desktop / 2,943 mobile mesh objects after batching. These are not FPS measurements.

No browser/WebGL rendering, full gameplay session, physical-device test or public deployment has been verified. Controls, login, saves, camera-control and collision source files were not edited.
