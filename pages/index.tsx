import Head from 'next/head'
import {NextPage} from "next";
import {AppThunkDispatch} from "../src/store";
import {fetchProductsThunk, selectAllProducts} from "../src/redux/slices/products";
import {fetchCategoriesThunk, selectCategoriesByIds} from "../src/redux/slices/categories";
import {useSelector} from "react-redux";
import Link from 'next/link';
import AddToCartButton from "../src/components/AddToCartButton";
import Container from "../src/components/Container";

const Home: NextPage = () => {
  const products = useSelector(selectAllProducts);

  return (
    <Container>
      <Head>
        <title>Sample Ecommerce App</title>
      </Head>

      <main>
        <h1 className="title">
          Sample Ecommerce App
        </h1>

        <div className="grid">
            {products && products.map(product => (<div key={product.id} className="product-card">
              <h3><Link href={"/products/" + product.id}><a>{product.name}</a></Link></h3>
              <p>${product.cost}</p>
              <p>{product.categories && useSelector(state => selectCategoriesByIds(state, product.categories)).map(category => category.title).join(', ')}</p>
                <AddToCartButton product={product}/>
            </div>))}
        </div>
      </main>

      <footer>
        <a
          href="https://www.linkedin.com/in/nikita-rogovoy-499aa9a3/"
          target="_blank"
          rel="noopener noreferrer"
        >
            <strong>Nikita Rogovoi</strong>
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
        
        .grid {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: row;
            max-width: 720px;
            flex-wrap: wrap;
        }
        
        .product-card {
            border: 1px solid #d6d6d6;
            border-radius: 10px;
            padding: 10px;
            margin: 10px;
            width: 150px;
            box-shadow: 5px 4px 5px rgb(0 0 0 / 10%);
        }
        
        .product-card h3 {
            margin-top: 0;
        }
      `}</style>
    </Container>
  )
}

Home.getInitialProps = async ({store, pathname, req, res}) => {
  const dispatch = store.dispatch as AppThunkDispatch;
  await dispatch(fetchProductsThunk());
  await dispatch(fetchCategoriesThunk());
}

export default Home;