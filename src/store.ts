import {AnyAction, configureStore, Store, ThunkDispatch} from "@reduxjs/toolkit";
import {combineReducers} from "redux";
import {ThunkAction} from "redux-thunk"
import {createWrapper, MakeStore} from "next-redux-wrapper";
import productsReducer from "./redux/slices/products";
import categoriesReducer from "./redux/slices/categories";
import cartReducer from "./redux/slices/cart";

const rootReducer = combineReducers({
    products: productsReducer,
    categories: categoriesReducer,
    cart: cartReducer,
});

type RootState = ReturnType<typeof rootReducer>
export type AppThunkAction = ThunkAction<void, RootState, null, AnyAction>
export type AppThunkDispatch = ThunkDispatch<RootState, null, AnyAction>

export const makeStore: MakeStore = (context): Store => {
    const store: Store = configureStore({
        reducer: rootReducer
    });

    // // @ts-ignore
    // if (process.env.NODE_ENV === "development" && module.hot) {
    //     // @ts-ignore
    //     module.hot.accept("./slice", () => {
    //         const newRootReducer = require("./redux/slices/products").default;
    //         store.replaceReducer(newRootReducer);
    //     });
    // }

    return store;
}

export const wrapper = createWrapper<RootState>(makeStore, {debug: true});