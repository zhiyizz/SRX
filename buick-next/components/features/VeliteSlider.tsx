import type { FC } from 'react'

import VeliteVertical from "./VeliteVertical";
import type { FeatureMediaPrefix, VeliteSliderType } from '~types/feature';
import type { VeliteCategoryProps } from './VeliteList';
import VeliteHorizonal from './VeliteHorizonal';

type VeliteSliderProps = FeatureMediaPrefix & VeliteCategoryProps & {
  data: VeliteSliderType
}

const VeliteSlider: FC<VeliteSliderProps> = ({ category, name, data, prefix }) => {
  if (data.direction === 'vertical') {
    return (
      <>
        <div className='pc'>
          <VeliteVertical category={category} name={name} data={data} prefix={prefix} />
        </div>
        <div className='m'>
          <VeliteHorizonal category={category} name={name} data={data} prefix={prefix} />
        </div>
      </>
    )
  }
  return <VeliteHorizonal category={category} name={name} data={data} prefix={prefix} />
}

export default VeliteSlider
