import { globalSlice, navSlice, scrollSlice } from './slices'

export const reducer = {
  global: globalSlice.reducer,
  nav: navSlice.reducer,
  scroll: scrollSlice.reducer,
}
