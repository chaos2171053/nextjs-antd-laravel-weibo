import React from "react";
import Head from "next/head";

interface IProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string;
}

const SocialMeta = ({ title, description, image, url, keywords }: IProps) => (
  <Head>
    <meta
      name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1"
      className="next-head"
    ></meta>
    <meta charSet="utf-8" className="next-head"></meta>
    {title && <meta name="og:title" content={title} />}
    {url && <meta name="og:url" content={url} />}
    {description && <meta name="description" content={description} />}
    {description && <meta name="og:description" content={description} />}
    {image && (
      <meta name="og:image" content={`https://www.buduangeng365.cn${image}`} />
    )}
    {keywords && <meta name="keywords" content={keywords} />}
  </Head>
);

export default SocialMeta;
