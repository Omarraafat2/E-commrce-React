// src/lib/utils.ts
export const cn = (classes: string[]) => {
    return classes.filter(Boolean).join(' ');
};
export const formatPrice = (price: number): string => {
    return `EGP ${price.toLocaleString()}`;
  };
  