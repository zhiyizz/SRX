import Script from 'next/script'
import '../globals.css'
export const metadata = {
  title: '别克高尔夫',
  description: '50年来，别克一直与高尔夫同行并与之实现精神统一。别克 品牌强调 “进取•成就•气度”，而高尔夫运动正是进取和品位的完美结合，别克品牌与高尔夫运动相契相合、相映生辉。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
     <head>
     <Script src="https://www.buick.com.cn/js/global.js"></Script>
     
     </head>
      <body>
        <nav className="nav-global" role="navigation"></nav>
        {children}
        <footer></footer>
      </body>
    </html>
  )
}
