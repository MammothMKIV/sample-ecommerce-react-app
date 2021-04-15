import {Product} from "../entities";
import {useDispatch, useSelector} from "react-redux";
import {cartReducer, isItemInCart} from "../redux/slices/cart";

type AddToCartButtonProps = {
    product: Product
}

const AddToCartButton = (props: AddToCartButtonProps) => {
    const dispatch = useDispatch();
    const inCart = useSelector(state => isItemInCart(state, props.product));

    function onClick() {
        if (!inCart) {
            dispatch(cartReducer.actions.addProduct(props.product));
        } else {
            dispatch(cartReducer.actions.removeProduct(props.product));
        }
    }

    return <button onClick={onClick}>{!inCart ? "Add To Cart" : "Remove from Cart"}</button>;
};
export default AddToCartButton;