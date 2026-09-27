export const itemAmount=item=>{const qty=Number(item.qty)||0;const rate=Number(item.rate)||0;const adjust=Number(item.adjust)||0;return qty*rate*(1-adjust/100)};
export const subtotal=items=>(items||[]).reduce((s,i)=>s+itemAmount(i),0);
export const tax=(items,discount,pct=18)=>(Math.max(subtotal(items)-Number(discount||0),0)*Number(pct||0))/100;
export const total=(items,discount,pct=18)=>Math.max(subtotal(items)-Number(discount||0)+tax(items,discount,pct),0);
