// Lux City Beckerich real-map migration foundation v1.3
// Official source: ACT BD-L-GeoBase / BD-L-BATI3D. Runtime keeps v1.2.1 stable while imported Beckerich geometry is prepared.
window.LuxBeckerichMap={
  version:'1.3.0',
  crs:'EPSG:2169',
  source:'ACT BD-L-GeoBase 2026 + BD-L-BATI3D 2023v2',
  mode:'real-footprints-migration',
  replacementBusinesses:[
    {id:'bakery',label:'Bäckerei',replaceExistingBuilding:true},
    {id:'cafe',label:'Café',replaceExistingBuilding:true},
    {id:'pub',label:'Kneipe',replaceExistingBuilding:true},
    {id:'mill',label:'Mühle',replaceExistingBuilding:true},
    {id:'sugar',label:'Zuckerbetrieb',replaceExistingBuilding:true},
    {id:'bottler',label:'Wasser / Getränkeabfüllung',replaceExistingBuilding:true},
    {id:'post',label:'Post & Logistik',replaceExistingBuilding:true,services:['Pakete','Warenversand','Lieferaufträge']}
  ]
};