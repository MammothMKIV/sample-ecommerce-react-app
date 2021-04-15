import {Product} from "../entities";
import {useDispatch, useSelector} from "react-redux";
import {cartReducer, isItemInCart} from "../redux/slices/cart";

const Container = ({ children }) => {
    return <div className="container">
        {children}
        <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }`}</style>
    </div>;
};
export default Container;