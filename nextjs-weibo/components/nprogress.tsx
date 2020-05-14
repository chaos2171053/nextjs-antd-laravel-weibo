import NProgress from "nprogress";
import Router from "next/router";
import '../styles/nprogress.less'
let timeout;
const start = () => {
  timeout = setTimeout(NProgress.start, 100);
};

const done = () => {
  clearTimeout(timeout);
  NProgress.done();
};

Router.events.on("routeChangeStart", start);
Router.events.on("routeChangeComplete", done);
Router.events.on("routeChangeError", done);
export default () => <></>;
