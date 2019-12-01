import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';

import 'semantic-ui-css/semantic.min.css';
import 'react-date-range/dist/theme/default.css';
import 'react-date-range/dist/styles.css';

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps;
        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }
        return { pageProps }
    }
    componentDidMount(){
        window.onbeforeprint = () => {
            sessionStorage.clear();
        }
    }
    render() {

        const { Component, pageProps } = this.props;
        return (
            <Container>
                <Head>
                    <meta name="viewport" ccontent="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
                    {/* <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" /> */}
                    <title>CloudFix</title>
                </Head>
                <Component {...pageProps} />
            </Container>
        )
    }
}

export default MyApp;