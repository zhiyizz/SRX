'use client'
import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
const Submit = () => {
  const search = useSearchParams().get('form');
  return (
    <>
    {
      search ? (
        <Link href={`/submit/?form=${search}`}>点击报名</Link>
      ):(
        <Link href={`/submit/`}>点击报名</Link>
      )
    }
   </>
  );
};

export default Submit;