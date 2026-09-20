// Lux City v0.5 integration layer
// Persists bakery ownership, marks the building, opens management at its door,
// and provides demand simulation shared with bakery.html.
export const VERSION='0.5';
export const bakeryState={
 get owned(){return localStorage.getItem('luxcity_bakery_owned')==='1'},
 buy(price,cash){if(cash<price)return {ok:false,cash};localStorage.setItem('luxcity_bakery_owned','1');return {ok:true,cash:cash-price}},
};
export function demandFactor(base,price){
 const d=(price/base)-1;
 if(d<=.05)return 1-Math.max(0,d)*.8;
 if(d<=.15)return .96-(d-.05)*3.6;
 return Math.max(.08,.60-(d-.15)*4.2);
}
export function salesTick(base,price,footfall=20){
 const f=demandFactor(base,price);
 return Math.max(0,Math.round(footfall*f*(.75+Math.random()*.5)));
}