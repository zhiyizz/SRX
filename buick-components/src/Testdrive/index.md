---
nav:
  title: Components
  path: /components
---

## Testdrive

Demo:

```tsx
import React from 'react';
import { Testdrive } from '@futian/buick-components';

export default () => 
  <div>
    <Testdrive
   
    theme="black"
    // hideSeries={['century']}
    btnStyle={{ background: '#d91e32' }}
    lbs={true}
    // selectedDealerCode={["BSC001","BZJ001","BZJ002","NB1301","NB1302","NB1304","NB1305","NB1309","NB1310","NB1311","NB1315","NB1316","NB1317","NB1370","NB1372","NB1375","NB1500","NB1501","NB1502","NB1505","NB1506","NB1507","NB1513","NB1519","NB1539","NB1580","NB1675","NB1677","NB1680","NB1683","NB2315","NB2612","NB2675","NB2676","NB2690","NB2696","NB5679","BJS001","BJS002","BJS006","NB1740","NB2741","NB2767","NB1733","NB1737","NB1765","NB1775","NB1768","NB2703","NB1764","NB1603","NB5665","NB1601","NB1600","NB1611","NB1610","NB2643","BCQ001","NB2720","NB1720","NB1032","NB2641","NB1656","NB2659","NB5659","NB2617","BHN003","BHN001","BHN002","NB1655","NB2639","NB1781","NB1783","NB1789","NB1791","NB1793","NB2786","NB1782","BSX001","NB1801","NB1799","NB2730","NB2762","BAH001","NB1432","NB1431","NB1009","NB1423","NB1404","NB1416","NB1417","NB1638","NB1636","NB1402","NB1465","NB1457","NB2785","NB1632","NB1630","NB1424","NB1425","NB1412","NB1446","NB1479","NB1636","NB2432"]}
    // xny={true}
    tracking="活动页"
    // seriesOrder = {['century','enclave','electra_e5']}
//    depthName
    // offline="30090801"
    seriesCode="enclave"
  />
  </div>
  ;
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
