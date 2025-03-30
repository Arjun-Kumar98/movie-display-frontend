import en from './en.json';

export const t = (key:string)=>{
    const keys = key.split('.');
    let value: any=en;
    keys.forEach(k=>value = value?.[k]);
    return value??key;
};