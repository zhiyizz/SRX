import { createElement, Fragment, type ReactElement, type ReactNode } from 'react'
import type { ISeriesPrice } from './SeriesPrice'

/**
 * 按三位分隔价格。
 * @param input 价格。
 * @param c 分隔符（默认为 `,`）。
 * @returns 返回添加分隔符的价格字符串。
 */
export const formatPrice = (input: string | number | ISeriesPrice | ISeriesPrice[], c: string = ',') => {
  let num: string | number
  if (Array.isArray(input)) {
    if (input.length) {
      num = input[0].min
    } else {
      return ''
    }
  } else if (typeof input !== 'string' && typeof input !== 'number') {
    num = input.min
  } else if (typeof input === 'string') {
    const trans = Number(input.replace(/\D/g, ''))
    if (!trans || isNaN(trans)) {
      return ''
    }
    num = trans
  } else {
    num = input
  }
  if (!num) {
    return ''
  }
  return String(num).replace(/\B(?=(\d{3})+$)/g, c)
}

/**
 * 将HTML元素插入间隔，字符串将被分割。
 * @param input 元素数组或待分割的字符串。
 * @param el 将要插入的元素（默认为 `<br />`）。
 * @param separator 分割依据（默认为*换行符*）。
 * @returns 返回结果数组。
 */
export function divideByElement(input?: string | ReactElement[], el: ReactElement = <br />, separator: string | RegExp = /[\r\n]+/): ReactNode | ReactElement[] {
  const result: (string | ReactElement)[] | undefined = typeof input === 'string' ? input.split(separator) : input
  if (result && result.length > 1) {
    const LEN = result.length
    for (let i = 0; i < LEN - 1; i++) {
      result.splice(1 + 2 * i, 0, el)
    }
    return result.filter(item => item !== '').map((ele, index) => <Fragment key={index}>{ele}</Fragment>)
  }
  return Array.isArray(input) ? input[0] : input
}

export function mapLines(input?: string, el = 'p', props: { className?: string } = {}): ReactElement[] {
  if (input) {
    return input.split(/[\r\n]+/).map((line, idx) => createElement(el, { ...props, key: idx}, line))
  }
  return []
}

/**
 * 根据宽度计算高度（16:9）。
 * @param width 宽度。
 * @returns 计算后得出的高度。
 */
export function calculateHeight(width: number) {
  return Math.ceil(width * 9 / 16)
}

/**
 * 提取字符串中的HTML标签。
 * @param html 待提取HTML标签的字符串。
 * @param divide 是否混合使用 `divideByElement` 进行默认的换行操作。
 * @returns 
 */
export function extractHtmlTag(html: string, divide = false): ReactNode | ReactElement[] {
  if (divide) {
    const list = divideByElement(html)
    if (Array.isArray(list)) {
      return list.flatMap<string | ReactElement[]>((ele, index) => {
        if (index % 2 === 0 && typeof ele.props.children === 'string') {
          return extractHtmlTag(ele.props.children)
        }
        return ele.props.children
      }).map((item, index) => <Fragment key={index}>{item}</Fragment>)
    }
  }
  const matcher = html.match(/<([^>]+)>([^<]+)<\/\1>|<([^>/]+) *\/?>/)
  if (matcher) {
    const [match, tag, value, ctag] = matcher
    if (tag) {
      const ele = createElement(tag, null, value)
      return divideByElement(html, ele, match)
    } else if (ctag) {
      const ele = createElement(ctag)
      return divideByElement(html, ele, match)
    }
  }
  return html
}

/**
 * 类型断言：字符串。
 * @param val 待判断的变量。
 * @returns 是否为字符串。
 */
export function isString(val: unknown): val is string {
  return typeof val === 'string'
}

/**
 * 拼合URL。
 * @param prefix 路径前缀。
 * @param rest 待拼合的URL.
 * @returns 拼合后的URL。
 */
export function combineUrl(prefix?: string, ...rest: (string | undefined)[]) {
  const arr = [prefix, ...rest]
  let u = arr.join('/')
  const match = u.match(/^[a-z]+:\/\//)
  let proto = ''
  if (match) {
    const [p] = match
    proto = p
    u = u.substring(p.length)
  }
  u = u.replace(/\/+/g, '/')
  return proto + u
}

/**
 * youku 视频播放
 */
//  declare const window: Window & { WeixinJSBridge:any };

// export function youkuVideo(divId: string, obj?: any) {
//   const youkuVideoPlayers: Record<string, any> = {};
//   const u = navigator.userAgent;
//   const isAndroid = u.indexOf('Android')> -1 || u.indexOf('Adr') > -1; //安卓终端
//   function videoPlayer() {
//     if (!divId) { console.warn('divId不能为空值'); return; }
//     const divEle = document.getElementById(divId);
//     if (!divEle) { console.warn('DIV标签没有找到: id="' + divId + '"'); return; }
//     if (youkuVideoPlayers[divId]) {
//       if (obj === false) { divEle.innerHTML = ""; youkuVideoPlayers[divId] = null; return; }
//       else if (obj && obj.rebuild === true) { divEle.innerHTML = ""; youkuVideoPlayers[divId] = null; }
//       else return youkuVideoPlayers[divId];
//     }

//     if (!YKU || !YKU.Player) { console.warn('youku player API没有定义. 请在页面中添加<script type="text/javascript" src="//player.youku.com/jsapi"><\/script>'); return; }

//     if (obj === false) return;
//     else if (!obj) obj = {};

//     const vid = obj.vid || divEle.getAttribute("data-vid");
//     if (vid == null || vid == "") { console.warn("vid值没有定义。"); return; }
//     else obj.vid = vid;
//     obj.autoplay = !!(obj.autoplay == null ? divEle.getAttribute("data-autoplay") : !!obj.autoplay);
//     obj.poster = obj.poster == null ? divEle.getAttribute("data-poster") : obj.poster;
//     obj.posterm = obj.posterm == null ? divEle.getAttribute("data-posterm") : obj.posterm;
//     obj.controls = !(obj.controls === false);//default show controls, only false hide controls.
//     obj.onPlayEnd = typeof (obj.onPlayEnd) == "function" ? obj.onPlayEnd : function () { };
//     obj.onPlayStart = typeof (obj.onPlayStart) == "function" ? obj.onPlayStart : function () { };
//     obj.onPlayerReady = typeof (obj.onPlayerReady) == "function" ? obj.onPlayerReady : function () { };
//     if (obj.preview) {
//       let preview = obj.preview;
//       if (typeof preview != "string") preview = obj.poster;
//       if (typeof preview == "string") {
//         if(obj.postertype === 'video'){
//           if(isAndroid){
//             divEle.innerHTML = `<div class="videoplayer-preview-box"><div class="big-play-button"></div><img src="${obj.poster}.webp" ></img></div>`;
//           }else{
//             divEle.innerHTML = `<div class="videoplayer-preview-box"><div class="big-play-button"></div><video id="${divId}"  playsInline webkit-playsinline="true" x5-video-player-type="h5" autoPlay muted loop ><source src="${obj.poster}.mp4"  /></video></div>`;

//             if (typeof window.WeixinJSBridge === "undefined") {
//               // alert('000000')
//                //未执行WeixinJSBridge 开始监听 WeixinJSBridge
//                document.addEventListener('WeixinJSBridgeReady', () => {
//                 (divEle.getElementsByTagName('video')[0]).play()
//                }, false);
//              } else {
//                //已经执行 使用 getNetworkType 调用获取网络类型后执行
//                window.WeixinJSBridge.invoke("getNetworkType", {}, () => {
//               //   alert(222222)
//               (divEle.getElementsByTagName('video')[0]).play()
//                });
//              }

//           }
//         }else if (obj.posterm) {
//           divEle.innerHTML = '<div class="videoplayer-preview-box"><div class="big-play-button"></div><picture><source srcSet={"' + obj.previewm + '" media="(max-width: 768px)" /><img src="' + preview + '" alt="" /></picture></div>';
//         } else {
//           console.log(preview)
//           divEle.innerHTML = '<div class="videoplayer-preview-box"><div class="big-play-button"></div><img src="' + preview + '" ></div>';
//         }
//         //divEle.
//         // divEle.childNodes[0].onclick=function(){divEle.innerHTML = '';_buildYoukuVideoPlayer(divId, obj)}
//       //  alert(divId)
//       //  setTimeout(() => {

//       //  },500)

//         divEle.childNodes[0].addEventListener('click', function () { _buildYoukuVideoPlayer(divId, obj) })
//         return;
//       }


//     }


//     return _buildYoukuVideoPlayer(divId, obj);
//   }

//   function _buildYoukuVideoPlayer(divId: string, obj: { vid: any; autoplay: any; onPlayEnd: (arg0: any, arg1: any) => void; controls: any; onPlayStart: (arg0: any, arg1: any) => void; onPlayerReady: (arg0: any, arg1: any) => void; poster: any }) {
//     const vObj: Record<string, any> = {
//       styleid: '0', id: "ykv_" + divId, prefer: "flash",
//       client_id: '08e2ea03c2c3fffd',//buick
//       vid: obj.vid, autoplay: obj.autoplay,
//       newPlayer: false, show_related: false,
//       events: {
//         onPlayEnd: function () { obj.onPlayEnd(divId, obj.vid); },
//         onPlayStart: function () { if (!obj.controls && obj.autoplay) {/*player.hideControls();*/ }; obj.onPlayStart(divId, obj.vid); },
//         onPlayerReady: function () { if (!obj.controls) {/*player.hideControls();*/ }; obj.onPlayerReady(divId, obj.vid); }
//       }
//     };
//     if (obj.poster) vObj.poster = obj.poster;
//     const player = new YKU.Player(divId, vObj);
//     youkuVideoPlayers[divId] = player;
//     return player;
//   }



//   return videoPlayer();
  
// }

/**
 * 检测设备是否为手机。
 * @param strict 严格模式，验证`UA`和触摸屏。
 * @returns 
 */
export function isMobileDevice(strict?: boolean) {
  const isTouchDevice = (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (!!navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0))
  const isMobileUA = /iPhone|iPod|BlackBerry|Mobile|Opera Mini/i.test(navigator.userAgent)

  if (strict) {
    return isMobileUA && isTouchDevice
  } else {
    return window.innerWidth < 768
  }
}

export function increaseBrightness(hex: string, percent: number) {
  // strip the leading # if it's there
  hex = hex.replace(/^\s*#|\s*$/g, '');

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if(hex.length == 3){
      hex = hex.replace(/(.)/g, '$1$1');
  }

  const r = parseInt(hex.substring(0, 2), 16),
        g = parseInt(hex.substring(2, 4), 16),
        b = parseInt(hex.substring(4, 6), 16);

  return '#' +
     ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substring(1) +
     ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substring(1) +
     ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substring(1);
}
