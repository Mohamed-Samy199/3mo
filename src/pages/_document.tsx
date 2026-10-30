import { Html, Head, Main, NextScript } from "next/document";
import Document, { type DocumentContext } from "next/document";

export default class ThreeMoDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }

  render() {
    const pathname = this.props.__NEXT_DATA__.page || "";
    const isArabic = pathname === "/ar" || pathname.startsWith("/ar/");

    return (
      <Html lang={isArabic ? "ar" : "en"} dir={isArabic ? "rtl" : "ltr"}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
