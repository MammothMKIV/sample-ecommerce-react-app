import {useRouter} from "next/router";
import {NextPage} from "next";
import {fetchProductsThunk, selectProductById} from "../../src/redux/slices/products";
import {AppThunkDispatch} from "../../src/store";
import {fetchCategoriesThunk} from "../../src/redux/slices/categories";
import Head from "next/head";
import {useSelector} from "react-redux";
import AddToCartButton from "../../src/components/AddToCartButton";
import Container from "../../src/components/Container";

const Product: NextPage = () => {
    const router = useRouter();
    const {id} = router.query as String;
    const product = useSelector(state => selectProductById(state, parseInt(id)));

    return <Container>
        <Head>
            <title>{product.name} - Sample Ecommerce App</title>
        </Head>
        <div>
            <h1>{product.name}</h1>
            <p>{product.descr}</p>
            <p>${product.cost}</p>
            <AddToCartButton product={product}/>
        </div>
    </Container>
}

Product.getInitialProps = async ({store, pathname, req, res}) => {
    const dispatch = store.dispatch as AppThunkDispatch;
    await dispatch(fetchProductsThunk());
    await dispatch(fetchCategoriesThunk());
}

export default Product;