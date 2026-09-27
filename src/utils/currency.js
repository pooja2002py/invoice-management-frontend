export const money=(value=0)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',minimumFractionDigits:2}).format(Number(value)||0);
export const num=(value=0)=>Number(value)||0;
