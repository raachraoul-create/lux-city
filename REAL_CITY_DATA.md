# Lux City – Real Luxembourg data

We will use official Luxembourg open geodata instead of copying Google Maps assets.

Sources:
- Administration du cadastre et de la topographie BD-L-BATI3D 2023/2026: official 3D buildings, LOD 2.2, CC0.
- BD-L-GeoBase: official roads, addresses, parcels, buildings, elevation, CC0.
- Geoportail API for map/geocoding integration where access rules permit.

Implementation plan:
1. Start with Luxembourg City / Grund.
2. Convert official building/road/elevation data into lightweight web tiles.
3. Stream tiles around player position.
4. Bind businesses and property gameplay to real building footprints/addresses.
5. Add detailed shop interiors separately so gameplay remains performant.

Google Maps 3D imagery/models will not be copied into game assets.