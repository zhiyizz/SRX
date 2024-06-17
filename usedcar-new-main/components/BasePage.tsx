 import React, { ReactNode } from 'react';
import KvSlide from './KvSlide';
import SubMenu from './SubMenu';
 const BasePage = ({children,className,kv}:{children:ReactNode,className?: string,kv?:string}) => {
    return (
        <>
         {kv && <KvSlide src={kv} />}
         <SubMenu />
         <main className={className}>
            {children}
         </main>  
         
        </>
    );
 };
 
 export default BasePage;

 