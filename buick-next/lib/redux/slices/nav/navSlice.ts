/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
// import { incrementAsync } from './thunks'

const initialState: NavSliceState = {
  position: 'static',
  hide: false,
  theme: 'red',
  tdInView: false,
}

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    hideNav: (state) => {
      state.hide = true
    },
    showNav: (state) => {
      state.hide = false
    },
    setPosition: (state, action: PayloadAction<'static' | 'absolute' | 'fixed'>) => {
      state.position = action.payload
    },
    setTheme: (state, action: PayloadAction<'red' | 'blue'>) => {
      state.theme = action.payload
    },
    setTdInView: (state, action: PayloadAction<boolean>) => {
      state.tdInView = action.payload
    },
    showTd: (state) => {
      state.td = true
    },
    resetTd: (state) => {
      state.td = false
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading'
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle'
  //       state.value += action.payload
  //     })
  // },
})

export const { setTdInView, hideNav, showNav, setPosition, setTheme, showTd, resetTd } = navSlice.actions

/* Types */
export interface NavSliceState {
  /**
   * 主导航位置状态（默认：`static`）。
   */
  position: 'static' | 'absolute' | 'fixed'
  /**
   * 隐藏主导航。
   */
  hide?: boolean
  /**
   * 主题颜色。
   */
  theme?: 'red' | 'blue'
  /**
   * 显示页面中的试驾。
   */
  tdInView?: boolean
  /**
   * 显示试驾（仅当 `tdInView` 为 `true` 时触发）。
   */
  td?: boolean
}
