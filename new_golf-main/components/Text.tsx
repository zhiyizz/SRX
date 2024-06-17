import React from 'react';

import { divideByElement } from '@/utils/helper';
const Text = ({data}:{data:string | string[]}) => {
  return (
    <>
      {
         Array.isArray(data) ?
         data.map((item,idx) => (
           <p key={idx}>{divideByElement(item)}</p>
         )) :
          <p>{divideByElement(data)} </p>
      }
    </>
  );
};

export default Text;