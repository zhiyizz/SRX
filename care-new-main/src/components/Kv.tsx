import {  Fragment, ReactElement, ReactNode } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { getImageUrl } from '../utils/getImageUrl';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../styles/kv.scss';
import { Link } from 'react-router-dom';

type mediaType = {
  pc:string
  mob:string,
  subTitle?:string,
  title?:string,
  text?:string
  url?:string
}
const index = ({media}:{media:mediaType[]}) => {
  function divideByElement(input?: string | ReactElement[], el: ReactElement = <br />, separator: string | RegExp = /[\r\n]+/): ReactNode | ReactElement[] {
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
  return (
    <div className="kv">
      <>
        {
          media.length > 1 ? <>
            <Swiper
              navigation
              // spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Navigation, Pagination]}
            >
               
              {
                media.map((item,index) => (
                  <SwiperSlide key={index}>
                    {item.url ? (
                      <Link to={item.url}>
                        <picture >
                          <source media='(min-width: 768px)' srcSet={getImageUrl(item.pc)} />
                          <img src={getImageUrl(item.mob)} alt="" />
                        </picture>
                        <div className="content">
                          <div className="subTitle">{divideByElement(item.subTitle)}</div>
                          <h2 className="title">{divideByElement(item.title)}</h2>
                          <p className="text" >{divideByElement(item.text)}</p>
                        </div>
                      </Link>
                    ) : (
                        <>
                          <picture >
                            <source media='(min-width: 768px)' srcSet={getImageUrl(item.pc)} />
                            <img src={getImageUrl(item.mob)} alt="" />
                          </picture>
                          <div className="content">
                            <div className="subTitle">{divideByElement(item.subTitle)}</div>
                            <h2 className="title">{divideByElement(item.title)}</h2>
                            <p className="text" >{divideByElement(item.text)}</p>
                          </div>
                        </>
                    )}
                    
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </>:
            <>
              <picture >
                <source media='(min-width: 768px)' srcSet={getImageUrl(media[0].pc)} />
                <img src={getImageUrl(media[0].mob)} alt="" />
              </picture>
              <div className="content">
                <div className="subTitle">{divideByElement(media[0].subTitle)}</div>
                <h2 className="title">{divideByElement(media[0].title)}</h2>
                <p className="text">{divideByElement(media[0].text)}</p>
              </div>
            </>
        }
       
        </>
    </div>
  );
};

export default index;