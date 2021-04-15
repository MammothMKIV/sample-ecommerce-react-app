import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Product} from "../../entities";

export type CartState = {
    items: {
        [key: number]: Product;
    };
};

export const cartReducer = createSlice({
    name: "cart",
    initialState: {
        items: {}
    } as CartState,
    reducers: {
        addProduct(state, action: PayloadAction<Product>) {
            const product = action.payload;

            if (!state.items[product.id]) {
                state.items[product.id] = product;
            }
        },
        removeProduct(state, action: PayloadAction<Product>) {
            const product = action.payload;

            if (state.items[product.id]) {
                delete state.items[product.id];
            }
        },
        clear(state) {
            state.items = {};
        }
    }
})

export default cartReducer.reducer;

export const isItemInCart = (state, product: Product): boolean => state.cart.items[product.id] !== undefined;

export const calculateTotalPrice = (state): number => Object.values(state.cart.items).map(item => item.cost).reduce((result, price) => result + price, 0);

export const calculateTotalCount = (state): number => Object.keys(state.cart.items).length;

export const getItems = (state): Product[] => Object.values(state.cart.items)