import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    
    render(){
        return (
            <html>
                <Head>
                    <meta name="viewport" ccontent="width=device-width, initial-scale=1" />
                    <meta charSet="utf-8" />
                    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
                    <title>CloudFix</title>
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </html>
        );
    }
}