import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunkAction} from "../../store";
import {Product} from "../../entities";
import axios from "axios";
import {HYDRATE} from "next-redux-wrapper";

export type ProductsState = {
    items: {
        [key: number]: Product
    };
    currentProduct: number;
    loading: boolean;
    error?: string;
};

export const productsReducer = createSlice<ProductsState>({
    name: "products",
    initialState: {} as ProductsState,
    reducers: {
        load(state) {
            if (state.items) {
                return;
            }

            state.loading = true;
            state.error = undefined;
        },
        success(state, action: PayloadAction<Product[]>) {
            state.items = action.payload.reduce((result, product) => {
                    result[product.id] = product;
                    return result;
                },
                {}
            );
            state.loading = false;
            state.error = undefined;
        },
        failure(state) {
            state.loading = false;
            state.error = "Unable to fetch products";
        }
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log(action);
            return {...state, ...action.payload.products};
        },
    },
})

export default productsReducer.reducer;

export const fetchProductsThunk = (): AppThunkAction => async (dispatch, getState) => {
    try {
        dispatch(productsReducer.actions.load());
        const response = await axios.get('http://www.mocky.io/v2/5e982fa93500007f00c47f6c');

        return dispatch(productsReducer.actions.success(response.data));
    } catch (err) {
        return dispatch(productsReducer.actions.failure())
    }
}

export const selectAllProducts = (state): Product[] => Object.values(state.products.items);

export const selectProductById = (state, productId: number): Product => state.products.items[productId];