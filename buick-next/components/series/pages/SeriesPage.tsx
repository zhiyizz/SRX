import type { SeriesPageProperties } from '~types/series'
import type { FC } from 'react'
import dynamic from 'next/dynamic'

const AvenirPage = dynamic(() => import('./AvenirPage'), {
  loading: () => <p>正在加载...</p>,
})
const GeneralPage = dynamic(() => import('./GeneralPage'), {
  loading: () => <p>正在加载...</p>,
})
// const VelitePage = dynamic(() => import('./VelitePage'), {
//   loading: () => <p>正在加载...</p>,
// })
const ElectraPage = dynamic(() => import('./ElectraPage'), {
  loading: () => <p>正在加载...</p>,
})

const SeriesPage: FC<SeriesPageProperties & {
  avenir?: boolean
  velite?: boolean
  electra?: boolean
}> = ({ avenir, electra, ...props }) => {
  if (avenir) {
    return <AvenirPage {...props} />
  // } else if (velite) {
  // // Velite目前使用油车模板
  //   return <VelitePage {...props} />
  }else if (electra) {
    return <ElectraPage {...props} />
  } else {
    return <GeneralPage {...props} />
  }
}

export default SeriesPage
