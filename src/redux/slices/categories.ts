import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunkAction} from "../../store";
import {ProductCategory} from "../../entities";
import axios from "axios";
import {HYDRATE} from "next-redux-wrapper";

export type CategoriesState = {
    items: {
        [key: number]: ProductCategory
    };
    loading: boolean;
    error?: string;
};

export const categoriesReducer = createSlice<CategoriesState>({
    name: "categories",
    initialState: {} as CategoriesState,
    reducers: {
        load(state) {
            state.loading = true;
            state.error = undefined;
        },
        success(state, action: PayloadAction<ProductCategory[]>) {
            state.items = action.payload.reduce((result, category) => {
                    result[category.id] = category;
                    return result
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
            return {...state, ...action.payload.categories};
        },
    },
})

export default categoriesReducer.reducer;

export const fetchCategoriesThunk = (): AppThunkAction => async (dispatch, getState) => {
    try {
        dispatch(categoriesReducer.actions.load());
        const response = await axios.get('http://www.mocky.io/v2/5e982f9c3500007a00c47f6b');

        return dispatch(categoriesReducer.actions.success(response.data))
    } catch (err) {
        return dispatch(categoriesReducer.actions.failure())
    }
}

export const selectCategoriesByIds = (state, categoryIds: number[]): ProductCategory[] => categoryIds.reduce(
    (result, categoryId) => {
        result.push(state.categories.items[categoryId]);
        return result;
    },
    []
)