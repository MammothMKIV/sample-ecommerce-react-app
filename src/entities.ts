export type Product = {
    id: number;
    name: string;
    descr: string;
    cost: number;
    categories: number[];
};

export type ProductCategory = {
    id: number;
    title: string;
};