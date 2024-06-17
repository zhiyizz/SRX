import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

class BuickDocument extends Document {

  render() {
    return (
      <Html>
        <Head />
        <link href="https://www.buick.com.cn/css/global.css" rel="stylesheet" />
        <body>
          <nav className="nav-global" role="navigation"></nav>
          <Main />
          <NextScript />
          <footer></footer>
          
          <Script src="https://www.buick.com.cn/js/global.js"   strategy="beforeInteractive"/>
        </body>
      </Html>
    )
  }
}

export default BuickDocument
