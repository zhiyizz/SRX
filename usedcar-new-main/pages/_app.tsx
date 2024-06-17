import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
      <meta name="keywords" content="别克汽车,别克官网,别克轿车,别克SUV" />
      <meta name="description" content="欢迎访问上汽通用别克品牌中国官方网站。在这里，您将可以了解别克全线车型，品牌最新动态新闻，市场活动，及全国授权经销商。" />
      <title>别克官方认证二手车</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"></link>
   
    </Head>
    <Component {...pageProps} />
    <Script id="miaozhen" strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(a, e, f, g, b, c, d) {a.ClickiTrackerName = b;
          a[b] = a[b] || function() {(a[b].queue = a[b].queue || []).push(arguments)};
          a[b].start = +new Date; c = e.createElement(f); d = e.getElementsByTagName(f)[0];
          c.async = 1; c.src = g; d.parentNode.insertBefore(c, d)
          })(window, document, 'script', ('https:' == document.location.protocol ? 'https://stm-collect' : 'http://stm-cdn') + '.cn.miaozhen.com/clicki.min.js', 'stm_clicki');
          stm_clicki('create', 'dc-992', 'auto');
          //SiteMonitor 热图统计代码
          stm_clicki('require','heatmap', ('https:'==document.location.protocol?'https://stm-collect':'http://stm-cdn')+'.cn.miaozhen.com/plugins/heatmap.js');
          stm_clicki('heatmap:on',5);
        `,
        }} />

      <Script id="rm_adnewer" strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          var _addnewer = _addnewer || {trackClick:function(){},trackPv:function(){}};
          var _AD = []; _AD.config = {
            site_id: 'SGM001'//buick
          };
          (function() {
            var collect = document.createElement('script');
            collect.type = 'text/javascript';
            collect.async = true;
            collect.defer= true; 
            var t=parseInt((new Date()).getTime()/1000);
            collect.src =  "https://su.addnewer.com/js/stm/addnewer_click.min.js?v="+ (t-t%300);
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(collect, s);
          })();
        `
        }} />

      <Script id="baidu_agl" strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window._agl = window._agl || [];
          (function () {
            _agl.push(['production', '_f7L2XwGXjyszb4d1e2oxPybgD']);
            (function () {
              var agl = document.createElement('script');
              agl.type = 'text/javascript';
              agl.async = true;
              agl.src = 'https://fxgate.baidu.com/angelia/fcagl.js?production=_f7L2XwGXjyszb4d1e2oxPybgD';
              var s = document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(agl, s);
            })();
          })();
        `
        }} />

      <Script id="bytedance" strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(r,d,s){r._tt_config=true;var _baq=(r._baq=r._baq||[]);_baq.methods=["track","off","on"];
          _baq.factory=function(method){return function(){var args=Array.prototype.slice.call(arguments);
          args.unshift(method);_baq.push(args);return _baq}};for(var i=0;i<_baq.methods.length;i++){
          var key=_baq.methods[i];_baq[key]=_baq.factory(key)}_baq.load=function(){
          var js,fjs=d.getElementsByTagName(s)[0];js=d.createElement(s);
          js.src="https://analytics.oceanengine.com/api/v2/js/sdk";fjs.parentNode.insertBefore(js,fjs)};
          _baq.load();if(_baq.invoked){return}_baq.invoked=true;_baq.track("pageview")})(window,document,"script");
        `
        }} />
    </>
  )
}
