'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { isMobileDevice } from '@utils/helper'
import { trackPv } from '@utils/tracking'
import type { SeriesObject } from '~types/series'
import { enableInitialMobile, setIsMobile, useDispatch } from 'lib/redux'

// TODO: 移至CMS中进行配置
const MZ_MAP: Record<string, string | undefined> = {
  '/': '首页',
  '/app': 'iBuick APP',
  '/contact-us': '联系我们',
  '/dealer': '网点查询',
  '/ebuick': '立即购车',
  // '/finance': '金融购车页',
  '/history': '别克历史',
  '/hotline': '经销商热线',
  // '/oversea-student': '留学生购车',
  '/testdrive': '预约试驾',
  '/technology': '别克科技',
  '/technology/ultium': 'ultium别克奥特能平台',
  '/guide': '用车指南',
  '/news': '新闻资讯',
  '/news/update': 'OTA及电子系统升级公告',
  '/electra_x': '车型页-概念车',
}

export default function Tracking({ series }: {
  series?: SeriesObject[]
}) {
  const pathname = usePathname()

  const dispatch = useDispatch()

  useEffect(() => {
    if (!window.BUICK) {
      window.BUICK = {}
    }
    if (!window.BUICK.mzPrefix) {
      if (isMobileDevice(true)) {
        window.BUICK.mzPrefix = '别克官网MOB端'
        window.legacyHost = 'https://m.buick.com.cn'
        window.initialMobile = true
        dispatch(enableInitialMobile())
      } else {
        window.BUICK.mzPrefix = '别克官网PC端'
        window.legacyHost = 'https://www.buick.com.cn'
        window.initialMobile = false
      }
    }
  }, [dispatch])

  useEffect(() => {
    const adjust = () => {
      const mobileDevice = isMobileDevice()
      const doc = document.documentElement
      // const sat = getComputedStyle(document.documentElement).getPropertyValue('--sab')
      console.log('adjust', window.innerHeight)
      doc.style.setProperty('--view-height', `${window.innerHeight}px`)
      dispatch(setIsMobile(mobileDevice))
    }
    setTimeout(adjust, 100)
    // adjust()

    window.addEventListener('resize', adjust)
    return () => {
      window.removeEventListener('resize', adjust)
    }
  }, [dispatch])

  useEffect(() => {
    let mz = MZ_MAP[pathname]
    if (!mz && series) {
      const codeLike = pathname.replace(/^\//, '')
      const current = series.find(item => item.code === codeLike || item.url?.replace(/^\//, '') === codeLike)
      if (current) {
        mz = `车型页-${(typeof current.tracking === 'string' ? current.tracking : current.tracking?.mz) || current.name}`
      }
    }
    if (mz) {
      trackPv(mz)

      if (window.BUICK) {
        BUICK.currentPage = mz
      } else {
        window.BUICK = {
          currentPage: mz
        }
      }
    } else {
      console.log('PV: not match!', pathname)
    }
  }, [pathname, series])

  return (
    <>
      <Script id="miaozhen">
        {`
          (function(a, e, f, g, b, c, d) {a.ClickiTrackerName = b;
          a[b] = a[b] || function() {(a[b].queue = a[b].queue || []).push(arguments)};
          a[b].start = +new Date; c = e.createElement(f); d = e.getElementsByTagName(f)[0];
          c.async = 1; c.src = g; d.parentNode.insertBefore(c, d)
          })(window, document, 'script', ('https:' == document.location.protocol ? 'https://stm-collect' : 'http://stm-cdn') + '.cn.miaozhen.com/clicki.min.js', 'stm_clicki');
          stm_clicki('create', 'dc-992', 'auto');
          //SiteMonitor 热图统计代码
          stm_clicki('require','heatmap', ('https:'==document.location.protocol?'https://stm-collect':'http://stm-cdn')+'.cn.miaozhen.com/plugins/heatmap.js');
          stm_clicki('heatmap:on',5);
        `}
      </Script>

      <Script id="rm_adnewer">
        {`
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
        `}
      </Script>

      <Script id="baidu_agl" strategy="lazyOnload">
        {`
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
        `}
      </Script>

      <Script id="bytedance" strategy="lazyOnload">
        {`
          (function(r,d,s){r._tt_config=true;var _baq=(r._baq=r._baq||[]);_baq.methods=["track","off","on"];
          _baq.factory=function(method){return function(){var args=Array.prototype.slice.call(arguments);
          args.unshift(method);_baq.push(args);return _baq}};for(var i=0;i<_baq.methods.length;i++){
          var key=_baq.methods[i];_baq[key]=_baq.factory(key)}_baq.load=function(){
          var js,fjs=d.getElementsByTagName(s)[0];js=d.createElement(s);
          js.src="https://analytics.oceanengine.com/api/v2/js/sdk";fjs.parentNode.insertBefore(js,fjs)};
          _baq.load();if(_baq.invoked){return}_baq.invoked=true;_baq.track("pageview")})(window,document,"script");
        `}
      </Script>

      <Script id="baidu_hmt" strategy="lazyOnload">
        {`
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?4d4c383ce996f3b4a3ea6b6eaa0c0179";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();
        `}
      </Script>
    </>
  )
}
