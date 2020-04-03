import NProgress from "nprogress";
import Router from "next/router";
import './nprogress.scss'
let timeout;
// TODO 组件替换为 https://material-ui.com/components/progress/
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
