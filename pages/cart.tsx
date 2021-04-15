import {NextPage} from "next";
import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";
import {AppThunkDispatch} from "../src/store";
import {cartReducer, getItems} from "../src/redux/slices/cart";
import {fetchProductsThunk} from "../src/redux/slices/products";
import {fetchCategoriesThunk} from "../src/redux/slices/categories";
import CheckoutForm from "../src/components/CheckoutForm";
import Container from "../src/components/Container";

const Cart: NextPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(getItems);

    function onRemoveItemClick(product) {
        return () => dispatch(cartReducer.actions.removeProduct(product));
    }

    function onEmptyCartClick() {
        dispatch(cartReducer.actions.clear());
    }

    return <Container>
        <Head>
            <title>Cart - Sample Ecommerce App</title>
        </Head>
        <div>
            {cartItems.length > 0 ? <div>
                <table>
                    <tbody>
                    {cartItems.map(cartItem => <tr>
                        <td>{cartItem.name}</td>
                        <td>{cartItem.cost}</td>
                        <td><button onClick={onRemoveItemClick(cartItem)}>Remove</button></td>
                    </tr>)}
                    </tbody>
                </table>
                <button onClick={onEmptyCartClick}>Empty Cart</button>
            </div> : <div>Your cart is empty</div>}
        </div>
        <div>
            <h3>Checkout</h3>
            <CheckoutForm/>
        </div>
    </Container>
}

Cart.getInitialProps = async ({store, pathname, req, res}) => {
    const dispatch = store.dispatch as AppThunkDispatch;
    await dispatch(fetchProductsThunk());
    await dispatch(fetchCategoriesThunk());
}

export default Cart;