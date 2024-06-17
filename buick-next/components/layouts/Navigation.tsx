'use client'

import { type FC, Fragment, useCallback, useEffect, useState, useMemo } from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { combineUrl, divideByElement } from '@utils/helper'
import AliImage from '@components/AlImage'
import { trackEvent } from '@utils/tracking'
import { showTd, useDispatch, useSelector } from 'lib/redux'
import type { FeatureMedia } from '~types/feature'
import type { SeriesCategory, SeriesObject } from '~types/series'
import SeriesPriceComponent from '../SeriesPriceComponent'
import SvgIcon from '../icons'

import styles from '@styles/layouts/nav.module.scss'

import logoImg from '../../public/img/common/logo.png'

// declare global {
//   var series: {
//     data: SeriesObject[] | { [code: string]: SeriesObject }
//     category: SeriesCategory[]
//   }
// }

export type EventObject = {
  title: string
  link: string
  media: FeatureMedia
}

export type NavigationProperties = {
  seriesData?: SeriesObject[]
  categoryList?: SeriesCategory[]
  eventList?: EventObject[]
  promoList?: EventObject[]
  onBuy?: VoidFunction
  // onTestdrive?: MouseEventHandler
}

const mzMap = ['别克车型', '购车指引', '车主服务', '官方二手车', '品牌资讯', '别克科技']

const CARLIST_COLUMN = 3

function CampaignDropdown({ data, showEvent, mzLabel, onClick }: {
  data?: EventObject[]
  mzLabel?: string
  showEvent?: boolean
  onClick?: (name: string) => void
}) {
  const [image, setImage] = useState(data?.[0])

  const isMobile = useSelector(state => state.global.isMobile)

  return (
    <div className={styles.dropdown}>
      <div className={classNames(styles.board, {
        'animate__animated': !isMobile && showEvent,
        'animate__slideInDown': !isMobile && showEvent,
        'animate__fast': !isMobile && showEvent,
      })}>
        <div className={styles.frame}>
          <div className={styles.list}>
            {data?.map((item, index) => <a key={index} href={item.link} target="_blank" rel="noreferrer" onMouseEnter={() => {
              setImage(item)
            }} onClick={() => onClick?.(`${mzLabel}-${item.title}`)}>
              <span>{item.title}</span>
              <SvgIcon icon="chevron-right" />
            </a>)}
          </div>
          {image && <figure>
            <a href={image.link} target="_blank" rel="noreferrer" onClick={() => onClick?.(`${mzLabel}-${image.title}-图片`)}>
              <AliImage alt={mzLabel ?? '活动'} prefix={combineUrl(process.env.NEXT_PUBLIC_STATIC_HOST, 'assets/campaign')} src={`${image.media.url}`} width={image.media.width || 760} height={ image.media.height || 380} />
            </a>
          </figure>}
        </div>
      </div>
    </div>
  )
}

const EXTERNAL_LINK = /^https?:|^\/act\//

const Navigation: FC<NavigationProperties> = ({ seriesData, categoryList, eventList, promoList }) => {
  const [show, setShow] = useState(-1)
  const [close, setClose] = useState(false)
  const [currentSeries, setCurrentSeries] = useState(-1)
  const [showEvent, setShowEvent] = useState(false)

  // const [catList, setCarList] = useState<JSX.Element[]>()

  // const [actImage, setActImage] = useState(eventList?.[0])
  // const [promoImage, setPromoImage] = useState(promoList?.[0])

  // for mob
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownShown, setDropdownShown] = useState(false)
  const [showISaleNotice, setShowISaleNotice] = useState(false)

  const pathname = usePathname()

  const router = useRouter()

  const dispatch = useDispatch()
  const { position, theme, hide = false, tdInView } = useSelector(state => state.nav)
  const isMobile = useSelector(state => state.global.isMobile)

  const bindMenuEvent = useCallback((index: number) => (
    {
      onMouseEnter: () => {
        setClose(false)
        setShow(index)
        if (!~currentSeries && index === 0) {
          setCurrentSeries(index)
        }
      },
      onClick: () => {
        setShow(index)
        if (isMobile) {
          setCurrentSeries(-1)
        }
        triggerMzClick(mzMap[index])
      }
    }
  ), [currentSeries, isMobile])

  useEffect(() => {
    if (!isMobile) {
      setDropdownShown(false)
    }
  }, [isMobile])


  function triggerMzClick(name: string) {
    if (window.BUICK && BUICK.currentPage) {
      trackEvent(`${BUICK.currentPage}-主导航-${name}`)
    }
  }

  useEffect(() => {
    if (pathname) {
      setClose(true)
      setMenuOpen(false)
    }
  }, [pathname])

  const catList = useMemo(() => {
    const toAnimateClasses = (index: number) => {
      if (!isMobile) {
        return {
          'animate__animated': currentSeries == index,
          'animate__slideInDown': currentSeries == index,
          'animate__fast': currentSeries == index,
        }
      }
    }

    return seriesData && categoryList && categoryList.map((cat, catIdx) => {
      let seriesList: (SeriesObject | undefined)[] | undefined
      if (cat.series) {
        seriesList = cat.series.map(code => seriesData.find(item => item.code === code))
      } else {
        seriesList = seriesData.filter(item => item.category === cat.name)
      }
      seriesList = seriesList && seriesList.map(item => {
        if (item) {
          const { url, ...rest } = item
          let seriesUrl = url
          if (url) {
            if (!EXTERNAL_LINK.test(url)) {
              seriesUrl = `/${url.replace(/^\/|\/$/g, '')}`
            }
          } else {
            seriesUrl = `/${item.code}`
          }
          return {
            ...rest,
            url: seriesUrl,
          }
        }
        return item
      })
      const offset = cat.intro ? 1 : 0
      return (
        <li key={catIdx} className={classNames({
          [styles.active]: currentSeries == catIdx
        })}>
          <span className={classNames(styles.category,{
            [styles.cellName]:(cat.displayName || cat.name).length >= 6
          })} onMouseEnter={() => {
            if (!isMobile) {
              setCurrentSeries(catIdx)
            }
          }} onClick={() => {
            if (isMobile) {
              setDropdownShown(true)
              setCurrentSeries(catIdx)
            }
            triggerMzClick(cat.name)
          }}>{cat.displayName || cat.name}</span>
          <div className={classNames(styles.dropdown, {
            [styles.customize]: cat.series && (cat.intro?.title ? cat.series.length > 5 : cat.series.length > 6)
          })} onClick={e => e.stopPropagation()}>

            <div className={classNames(styles.board, toAnimateClasses(catIdx))}>

              {cat.intro && (
                <div className={classNames(styles.cell, styles.intro)}>
                  <h3>{cat.intro.title}</h3>
                  <p>{cat.intro.content}</p>
                  {cat.intro.link && (
                    <Link href={cat.intro.link} onClick={() => triggerMzClick(`${cat.name}-查看更多`)}>
                      <span className={styles.label}>查看更多</span><span className={styles.arrow}><AliImage src="/img/icon/link-arrow.svg" alt="arrow" width={8} height={16} /></span>
                    </Link>
                  )}
                </div>
              )}
              {Array.isArray(seriesList) && seriesList.map((series, index, arr) => {
                if (series) {
                  const quickLink: JSX.Element[] = []
                  const { flags, name } = series
                  if (flags?.exterior !== false || flags.interior !== false) {
                    quickLink.push(<Link href={`${series.url}#exterior`} onClick={(e) => {
                      e.stopPropagation()
                      triggerMzClick(`${name}-360看车`)
                    }}>360看车</Link>)
                  }
                  if (flags?.gmac !== false) {
                    quickLink.push(<Link href={`${series.url}#finance`} onClick={(e) => {
                      e.stopPropagation()
                      triggerMzClick(`${name}-金融方案`)
                    }}>金融方案</Link>)
                  }
                  if (flags?.spec !== false) {
                    quickLink.push(<Link href={`${series.url}#specs`} onClick={(e) => {
                      e.stopPropagation()
                      triggerMzClick(`${name}-车型配置`)
                    }}>车型配置</Link>)
                  }
                  return (
                    <Fragment key={series.code}>
                      {index > 0 && (index + offset) % CARLIST_COLUMN === 0 && <div className={styles.hr} />}
                      <div className={classNames(styles.cell, {
                        [styles.full]: flags?.navFull && arr.length === 1,
                      })}>
                        <div className={styles['cell-wrapper']} onClick={() => {
                          if (EXTERNAL_LINK.test(series.url!)) {
                            window.open(series.url)
                          } else {
                            router.push(series.url!)
                          }
                          triggerMzClick(series.name)
                        }}>
                          <div className={styles.figure}><AliImage src={series.pic} alt={series.name} width={1000} height={800} /></div>
                          <div className={styles.frame}>
                            <h4>{series.displayName || series.name}</h4>
                            {series.price !== undefined && <SeriesPriceComponent className={styles.price} price={series.price} />}
                            {quickLink.length > 0 && <div className={styles.quicklink}>
                              {divideByElement(quickLink, <div className={styles.line} />)}
                            </div>}
                          </div>
                        </div>
                      </div>
                    </Fragment>
                  )
                }
              })}
            </div>
          </div>
        </li>
      )
    })
    // setCarList(catList)
  }, [categoryList, currentSeries, isMobile, router, seriesData])
  //postCategoryList, currentSeries, menuOpen, router.route, seriesArray, postSeriesData, show

  return (
    <header className={classNames(styles['nav-global'], {
      [`${styles['nav-absolute']}`]: position !== 'fixed' &&  position === 'absolute' || position !== 'fixed' && hide,
      [`${styles['nav-fixed']}`]: position === 'fixed',
      [`${styles['nav-hidden']}`]: position !== 'fixed' && position === 'absolute' && hide || !menuOpen && position === 'fixed' && hide,
      'theme-blue': theme === 'blue'
    })}>
      <div className={styles.wrapper}>
        {menuOpen && dropdownShown ? (
          <div className={styles.back} onClick={() => {
            setDropdownShown(false)
            triggerMzClick('手机导航-返回')
          }}>
            <SvgIcon icon="back" />
          </div>
        ) : (
          <Link href="/" className={styles.logo} onClick={() => triggerMzClick('别克logo')}>
            <AliImage src={logoImg} alt="别克logo" priority />
          </Link>
        )}
        <nav className={classNames({
          [styles['sub-active']]: dropdownShown,
          [styles.show]: menuOpen,
          [styles.closed]: close
        })}>
          <div className={styles.container} onTransitionEnd={() => {
            if (!dropdownShown && isMobile) {
              setCurrentSeries(-1)
              setShowEvent(false)
            }
          }}>
            <div className={classNames(styles.item, {
              [styles.active]: show === 0,
            })} {...bindMenuEvent(0)}>
              <span>别克车型</span>
            </div>
            <div className={classNames('sub', styles['series-bar'])} onMouseEnter={() => {
              setShow(0)
            }} onMouseLeave={() => {
              if (!isMobile) {
                setShow(-1)
              }
            }}>
              <ul className={styles.series}>
                {catList}
              </ul>
            </div>
            <div className={classNames(styles.item, {
              [styles.active]: show === 1,
            })} {...bindMenuEvent(1)}>
              <span>购车指引</span>
            </div>
            <div className={classNames('sub', styles['menu-sub'])} onMouseEnter={() => {
              setShow(1)
            }} onMouseLeave={() => {
              if (!isMobile) {
                setShow(-1)
              }
            }}>
              <ul>
                {Array.isArray(promoList) && promoList.length > 0 && <li className={classNames({
                  [styles.active]: showEvent,
                })} onMouseLeave={() => {
                  if (!isMobile) {
                    setShowEvent(false)
                  }
                }}>
                  <a className={styles.arrow} onMouseEnter={() => {
                    setShowEvent(true)
                  }} onClick={() => {
                    if (isMobile) {
                      setDropdownShown(true)
                    }
                    setShowEvent(true)
                    triggerMzClick('促销活动')
                  }}>
                    <span>促销活动</span>
                    <SvgIcon icon="chevron-right" className="m" />
                  </a>
                  <CampaignDropdown data={promoList} mzLabel="促销活动" showEvent={showEvent} onClick={triggerMzClick} />
                  {/* <div className={styles.dropdown}>
                    <div className={classNames(styles.board, {
                      'animate__animated': !isMobile && showEvent,
                      'animate__slideInDown': !isMobile && showEvent,
                      'animate__fast': !isMobile && showEvent,
                    })}>
                      <div className={styles.frame}>
                        <div className={styles.list}>
                          {promoList?.map((item, index) => <a key={index} href={item.link} target="_blank" rel="noreferrer" onMouseEnter={() => {
                            setPromoImage(item)
                          }} onClick={() => triggerMzClick(`别克促销-${item.title}`)}>
                            <span>{item.title}</span>
                            <SvgIcon icon="chevron-right" />
                          </a>)}
                        </div>
                        <figure>
                          <a href={promoImage?.link} target="_blank" rel="noreferrer" onClick={() => triggerMzClick(`别克促销-${promoImage?.title}-图片`)}>
                            <AliImage alt="促销" src={`/img/${promoImage?.media.url}`} width={promoImage?.media.width || 760} height={promoImage?.media.height || 380} />
                          </a>
                        </figure>
                      </div>
                    </div>
                  </div> */}
                </li>}
                {/* <li><a href="https://ebuick.sgmsonline.com.cn/" target="_blank" rel="noreferrer" onClick={() => triggerMzClick('别克商城')}>别克商城</a></li> */}
                <li><Link href="/finance" onClick={() => triggerMzClick('金融购车')}>金融购车</Link></li>
                <li><Link href="/dealer" onClick={() => triggerMzClick('网点查询')}>网点查询</Link></li>
                <li><Link href="/testdrive" onClick={() => triggerMzClick('预约试驾')}>预约试驾</Link></li>
                <li><a href="https://buick.tmall.com/" target="_blank" rel="noreferrer" onClick={() => triggerMzClick('天猫旗舰店')}>天猫旗舰店</a></li>
                <li className="m"><a href="http://ibuickminicloud.apps.sgmlink.com/mini/mini.html?path=%2Fpages%2Findex%2Findex%3Ftab%3D2%26channel%3Dbuickgw" target="_blank" rel="noreferrer" onClick={() => triggerMzClick('别克Buick小程序')}>别克Buick小程序</a></li>
                <li><Link href="/oversea-student" onClick={() => triggerMzClick('留学生购车')}>留学生购车</Link></li>
              </ul>
            </div>
            <div className={classNames(styles.item, {
              [styles.active]: show === 2,
            })} {...bindMenuEvent(2)}>
              <span>车主服务</span>
            </div>
            <div className={classNames('sub', styles['menu-sub'])} onMouseEnter={() => {
              setShow(2)
            }} onMouseLeave={() => {
              if (!isMobile) {
                setShow(-1)
              }
            }}>
              <ul>
                <li><Link href="/app" onClick={() => triggerMzClick('iBuick APP')}>iBuick APP</Link></li>
                <li><a href="/care/" rel="noreferrer" target="_blank" onClick={() => triggerMzClick('售后服务')}>售后服务</a></li>
                <li><Link href="/guide" onClick={() => triggerMzClick('用车指南')}>用车指南</Link></li>
              </ul>
            </div>
            <div className={classNames(styles.item, {
              [styles.active]: show === 3,
            })} {...bindMenuEvent(3)}>
              <span>官方二手车</span>
            </div>
            <div className={classNames('sub', styles['menu-sub'])} onMouseEnter={() => {
              setShow(3)
            }} onMouseLeave={() => {
              if (!isMobile) {
                setShow(-1)
              }
            }}>
              <ul>
                <li><a href="/usedcar/" onClick={() => triggerMzClick('产品介绍')}>产品介绍</a></li>
                <li><a href="/usedcar/replacement.html" onClick={() => triggerMzClick('以旧换新')}>以旧换新</a></li>
                <li><a href="/usedcar/evaluation.html" onClick={() => triggerMzClick('爱车评估')}>爱车评估</a></li>
                <li><a href="/usedcar/selling.html" onClick={() => triggerMzClick('我要卖车')}>我要卖车</a></li>
                <li><a href="/usedcar/application.html" onClick={() => triggerMzClick('我要买车')}>我要买车</a></li>
              </ul>
            </div>
            <div className={classNames(styles.item, {
              [styles.active]: show === 4,
              [styles.show]: menuOpen,
            })} {...bindMenuEvent(4)}>
              <span>品牌资讯</span>
            </div>
            <div className={classNames('sub', styles['menu-sub'])} onMouseEnter={() => {
              setShow(4)
            }} onMouseLeave={() => {
              if (!isMobile) {
                setShow(-1)
              }
            }}>
              <ul>
                <li><Link href="/news" onClick={() => triggerMzClick('别克新闻')}>别克新闻</Link></li>
                <li><Link href="/history" onClick={() => triggerMzClick('别克历史')}>别克历史</Link></li>
                <li className={classNames({
                  [styles.active]: showEvent,
                })} onMouseLeave={() => {
                  if (!isMobile) {
                    setShowEvent(false)
                  }
                }}>
                  <a className={styles.arrow} onMouseEnter={() => {
                    setShowEvent(true)
                  }} onClick={() => {
                    if (isMobile) {
                      setDropdownShown(true)
                    }
                    setShowEvent(true)
                    triggerMzClick('别克活动')
                  }}>
                    <span>别克活动</span>
                    <SvgIcon icon="chevron-right" className="m" />
                  </a>
                  <CampaignDropdown data={eventList} mzLabel="别克活动" showEvent={showEvent} onClick={triggerMzClick} />
                  {/* <div className={styles.dropdown}>
                    <div className={classNames(styles.board, {
                      'animate__animated': !isMobile && showEvent,
                      'animate__slideInDown': !isMobile && showEvent,
                      'animate__fast': !isMobile && showEvent,
                    })}>
                      <div className={styles.frame}>
                        <div className={styles.list}>
                          {eventList?.map((item, index) => <a key={index} href={item.link} target="_blank" rel="noreferrer" onMouseEnter={() => {
                            setActImage(item)
                          }} onClick={() => triggerMzClick(`别克活动-${item.title}`)}>
                            <span>{item.title}</span>
                            <SvgIcon icon="chevron-right" />
                          </a>)}
                        </div>
                        {actImage && <figure>
                          <a href={actImage.link} target="_blank" rel="noreferrer" onClick={() => triggerMzClick(`别克活动-${actImage.title}-图片`)}>
                            <AliImage alt="活动" src={`/img/${actImage.media.url}`} width={actImage.media.width || 760} height={ actImage.media.height || 380} />
                          </a>
                        </figure>}
                      </div>
                    </div>
                  </div> */}
                </li>
                <li><a href="/act/brand/gift" target="_blank" rel="noreferrer" onClick={() => triggerMzClick('别克精品')}>别克精品</a></li>
                <li><a href="/act/trafficsafety/" target="_blank" rel="noreferrer" onClick={() => triggerMzClick('交通安全日')}>交通安全日</a></li>
              </ul>
            </div>
             <div className={classNames(styles.item, {
              [styles.active]: show === 5,
            })} {...bindMenuEvent(5)}>
              <span>别克科技</span>
            </div>
            <div className={classNames('sub', styles['menu-sub'])} onMouseEnter={() => {
              setShow(5)
            }} onMouseLeave={() => {
              if (!isMobile) {
                setShow(-1)
              }
            }}>
              <ul>
                <li><Link href="/technology">科技</Link></li>
                <li className={styles.wide}><Link href="/technology/ultium">ULTIUM奥特能平台</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className={styles['right-links']}>
          <div className={styles.link}>
            <a href="https://ebuick.sgmsonline.com.cn/" target="_blank" rel="noreferrer" onClick={() => triggerMzClick('个人中心')}>
              <figure className={classNames(styles.icon, styles.user)}>
                <SvgIcon icon="user" />
              </figure>
              <span>个人中心</span>
            </a>
          </div>
          <div className={styles.link}>
            <Link href="/testdrive" onClick={e => {
              if (tdInView) {
                e.preventDefault()
                dispatch(showTd())
              }
              triggerMzClick('预约试驾')
            }}>
              <figure className={classNames(styles.icon, styles.td)}>
                <SvgIcon icon="testdrive" />
              </figure>
              <span>预约试驾</span>
            </Link>
          </div>
        </div>
        <div className={styles['right-action']}>
          {menuOpen ? (<>
            <a className={styles.btn} href="https://ebuick.sgmsonline.com.cn/" target="_blank" rel="noreferrer" onClick={() => triggerMzClick('手机导航-个人中心')}>
              <SvgIcon icon="user" />
            </a>
            <Link href="/testdrive" className={styles.btn} onClick={e => {
              if (tdInView) {
                e.preventDefault()
                if (!menuOpen && !~show) {
                  setShow(0)
                }
                setMenuOpen(false)
                dispatch(showTd())
                triggerMzClick('手机导航-预约试驾')
              }
            }}>
              <SvgIcon icon="testdrive" />
            </Link>
          </>) : (<>
            {/* onBuy && <div className={styles.btn}>
              <a rel="noreferrer" onClick={() => {
                onBuy()
                triggerMzClick('立即购车')
              }}><SvgIcon icon="cart" /></a>
            </div> */}
            <div className={styles.btn}>
              <a href="https://ichat.saic-gm.com/buick-ichat-web/index.html?brandName=home&utmsource=&utmmedium=&utmcampaign=&utmterm=" target="_blank" rel="noreferrer" onClick={() => triggerMzClick('在线客服')}><SvgIcon icon="online" /></a>
            </div>
            <div className={styles.btn}>
              <Link href="/hotline" onClick={(e) => {
                const now = new Date()
                const hour = now.getHours()
                if (hour < 9 || hour >= 21) {
                  e.preventDefault()
                  setShowISaleNotice(true)
                }
                triggerMzClick('经销商热线')
              }}><SvgIcon icon="hotline" /></Link>
            </div>
          </>)}
          <div className={classNames(styles.btn, styles.menu, {
            [styles.close]: menuOpen
          })} onClick={() => {
            if (!menuOpen && !~show) {
              setShow(0)
            }
            setMenuOpen(!menuOpen)
            triggerMzClick(menuOpen ? '手机导航-关闭' : '手机导航-打开')
          }}><i></i></div>
        </div>
      </div>
      {showISaleNotice && <div className={styles['chat-toast']}>
        <div className="icon-close" onClick={() => {
          setShowISaleNotice(false)
          triggerMzClick('经销商热线弹层-关闭')
        }}></div>
        <p>抱歉！<br/>电话接听时间为周一至周日9:00-21:00，<br/>您可先和在线客服聊聊！</p>
        <div className="btn" onClick={() => {
          setShowISaleNotice(false)
          triggerMzClick('经销商热线弹层-确定')
        }}>确定</div>
      </div>}
    </header>
  )
}

export default Navigation
