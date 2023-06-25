import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Layout from "../layout/Layout";
import store from "../redux/store";
import Router from "next/router";
import NProgress from "nprogress";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { useRouter } from "next/router"; 

import "../styles/globals.css";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const excludedPages = ["nebi"]; 
 
  const router = useRouter();
  const shouldUseLayout = !excludedPages.includes(router.pathname.replace("/", ""));

  return (
    <SessionProvider session={session}>
    <Provider store={store}>
    
    <div className="pt-[0px]">
    <ToastContainer />
      {shouldUseLayout && <Layout><Component {...pageProps} /></Layout>}
      {!shouldUseLayout && <Component {...pageProps} />}
    </div>
    </Provider>
    </SessionProvider>
  );
};

export default MyApp;

















