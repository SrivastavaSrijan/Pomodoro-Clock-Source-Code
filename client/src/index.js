import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import App from "./components/MainApp/App";
import { Helmet } from "react-helmet";
ReactDOM.render(
  <React.StrictMode>
    <Helmet>
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="./media/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="./media/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="./media/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="./media/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="./media/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="./media/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="./media/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="./media/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="./media/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="./media/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="./media/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="./media/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="./media/images/favicon-16x16.png"
      />
      <link
        rel="icon"
        type="image/png"
        href="./media/favicon.ico"
        sizes="16x16"
      />
      <meta
        content="website"
        prefix="og: http://ogp.me/ns#"
        property="og:type"
      />
      <meta
        content="./media/preview.jpg"
        prefix="og: http://ogp.me/ns#"
        property="og:image"
      />
      <meta
        content="https://srivastavasrijan.github.io/"
        prefix="og: http://ogp.me/ns#"
        property="og:url"
      />
      <meta
        content="Being productive is hard. We make it easy."
        prefix="og: http://ogp.me/ns#"
        property="og:description"
      />
      <meta
        content="Being productive is hard. We make it easy."
        name="description"
      />
      <link rel="manifest" href="./manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content="./media/ms-icon-144x144.png"
      />
      <meta name="theme-color" content="#ffffff" />

      <meta name="theme-color" content="#008f68" />
    </Helmet>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
