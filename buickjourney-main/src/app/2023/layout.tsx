import type { Metadata } from "next";

import Script from "next/script";


export const metadata: Metadata = {
  title: "2023寰行中国",
  description: "欢迎访问上汽通用别克品牌中国官方网站。在这里，您将可以了解别克全线车型，品牌最新动态新闻，市场活动，及全国授权经销商。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>
        <Script src="https://www.buick.com.cn/js/global.js" />
        <link href="https://www.buick.com.cn/css/global.css" rel="stylesheet" />
      </head>
      <body>
        <nav className="nav-global" role="navigation"></nav>
        <>{children}</>
        <div>
          <footer></footer>
        </div>

      </body>

    </html>
  );
}
