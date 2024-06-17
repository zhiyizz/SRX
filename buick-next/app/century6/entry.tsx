
import { useState } from 'react';
import Overlay from './Overlay';
 const Entry = ({ prefix }: { prefix: string }) => {
    const [type, setType] = useState<string>('safety')
    return (
        <div className='entry'>
            <button onClick={() => setType('exterior')}>外观</button>
            <button onClick={() => setType('curtainwall')}>内饰</button>
            <Overlay prefix={prefix} type={type} show={type?true:false} onClose={() => setType('')} />

        </div>
    );
 };
 
 export default Entry;
