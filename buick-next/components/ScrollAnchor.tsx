import { useEffect, useLayoutEffect, useState } from 'react'

export const capitalize = (text: string) =>
  text.charAt(0).toUpperCase() + text.substring(1);
const clamp = (value: number) => Math.max(0, value);
const isBetween = (value: number, floor: number, ceil: number) =>
  value >= floor && value <= ceil;

// hooks
export const useScrollspy = (ids: string[], nav: string) => {
  const [activeId, setActiveId] = useState<number>();

  useLayoutEffect(() => {
    const listener = () => {
      const scroll = window.scrollY;
      const ele = document.querySelector(nav) as HTMLElement | null
      const offsetHeight = ele?.offsetHeight || 0;
      const position = ids
        .map((id,idx) => {
          const element = document.getElementById(id);
          if (!element) return { id, top: -1, bottom: -1 };

          const rect = element.getBoundingClientRect();
          const top = clamp(rect.top + scroll - offsetHeight);
          const bottom = clamp(rect.bottom + scroll - offsetHeight);
          return { id, top, bottom,idx };
        })
        .find(({ top, bottom }) => isBetween(scroll, top, bottom));
      setActiveId(position?.idx || 0);

    };
    listener();
    window.addEventListener("resize", listener);
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("resize", listener);
      window.removeEventListener("scroll", listener);
    };
  }, [ids, nav]);

  useEffect(() => {
    const ele = document.querySelector(nav) as HTMLElement | null
    const current = ele?.querySelectorAll('a')
    const offsetHeight = ele?.offsetHeight || 0;
    current?.forEach((item) => {
        item.addEventListener('click',(e: { preventDefault: () => void; }) => {
            e.preventDefault();
            const target = window.document.getElementById(
                item.href?.split("#")[1]
              );
              if (target) {
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - offsetHeight+1;
                window.scrollBy({
                  top: offsetPosition,
                  behavior: "smooth",
                });
              }
        })
  
     })

  },[nav])


  return activeId;
};


// export const onPress = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,offset:number) => {
//     e.preventDefault();
//     const target = window.document.getElementById(
//       e.currentTarget.href.split("#")[1]
//     );
//     if (target) {
//       var elementPosition = target.getBoundingClientRect().top;
//       var offsetPosition = elementPosition - offset;
//       window.scrollBy({
//         top: offsetPosition,
//         behavior: "smooth",
//       });
//     }

//  };
