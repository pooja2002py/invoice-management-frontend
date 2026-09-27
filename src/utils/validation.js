export const required=value=>String(value??'').trim().length>0;
export const validEmail=value=>!value||/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
