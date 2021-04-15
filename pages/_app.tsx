import App, {AppContext, AppInitialProps} from "next/app";
import Layout from "../src/components/Layout";
import {wrapper} from "../src/store";

class WrappedSampleEcommerceApp extends App<AppInitialProps> {
    static async getInitialProps({Component, ctx}: AppContext) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        return { pageProps };
    }

    render() {
        const {Component, pageProps} = this.props;

        return <Layout>
            <Component {...pageProps}/>
        </Layout>
    }
}

export default wrapper.withRedux(WrappedSampleEcommerceApp);