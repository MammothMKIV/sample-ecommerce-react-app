import Head from "next/head";
import Link from 'next/link';
import {useSelector} from "react-redux";
import {calculateTotalCount, calculateTotalPrice} from "../redux/slices/cart";

const Layout = ({ children }) => {
    const cartItemCount = useSelector(calculateTotalCount);
    const cartItemTotalPrice = useSelector(calculateTotalPrice);

    return <div>
        <Head>
            <title>Sample Ecommerce App</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
        <style jsx>{`
        .navbar {
            background-color: blue;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 40px;
            color: white;
            display: flex;
            flex-direction: row;
        }
        
        .nav-block {
        
        }
        
        .nav-block.pull-right {
            margin-left: auto;
        }
        
        .title {
            margin: 6px;
            font-size: 1.2em;
        }
        
        .title a:link,
         .title a:visited,
         .title a:hover,
         .title a:active {
            color: white;
            text-decoration: none;
        }
        
        .wrapper {
            margin-top: 40px;
        }
      `}</style>
        <div className="navbar">
            <div className="nav-block">
                <div className="title"><Link href="/"><a>Sample Ecommerce App</a></Link></div>
            </div>
            <div className="nav-block pull-right">
                <div className="title"><Link href="/cart"><a>Cart: {cartItemCount} (${cartItemTotalPrice})</a></Link></div>
            </div>
        </div>
        <div className="wrapper">{children}</div>
    </div>;
};
export default Layout;