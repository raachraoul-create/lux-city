import{bakeryProducts as products}from'./bakery-data.js';import{salesTick}from'./gameplay-v5.js';
const saved=JSON.parse(localStorage.getItem('luxcity_prices')||'{}');
export function simulateCustomers(prices=saved){
 let total=0,lines=[];for(const p of products){let price=+(prices[p.name]??p.price),n=salesTick(p.price,price,Math.random()*4);if(n){total+=n*price;lines.push({name:p.name,qty:n,revenue:n*price})}}
 return{total,lines};
}
export function savePrices(prices){localStorage.setItem('luxcity_prices',JSON.stringify(prices))}