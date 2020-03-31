import React, { useState } from "react";
import Link from "next/link";
import config from "../config/config";
const Footer = () => (
  <div className="footer-component">
    <div className="copyright">
      © <span>{new Date().getFullYear()}</span>
      <span className="with-love">
      </span>
      <span className="author">{config.theme.author}</span>
    </div>
    <div>由 React + Node + Ant Desgin 驱动 </div>

    <div className="theme-info">
      主题 —{" "}
      <Link href="//www.github.com/iissnan/hexo-theme-next">
        <a target="_blank" className="theme-link">
          NexT.Pisces
        </a>
      </Link>{" "}
      v5.1.4
    </div>
    <Link href="//www.beian.miit.gov.cn">
      <a target="_blank">桂ICP备19003346号-1 | </a>
    </Link>
    <Link href="//www.beian.gov.cn/portal/registerSystemInfo?recordcode=45010302001777">
      <a target="_blank">
        <span>
          <img src="https://s2.ax1x.com/2019/07/12/ZW3O1A.png" />
        </span>
        <span> 桂公网安备 45010302001777号</span>
      </a>
    </Link>
  </div>
);

export default Footer;
