import { configureStore } from '@reduxjs/toolkit'
import answersSlice from './features/answersSlice'
import resultSlice from './features/resultSlice'
import apidataSlice from './features/apidataSlice'
// ...

export const store = configureStore({
  reducer: {
    allanswer:answersSlice,
    result:resultSlice,
    apidata:apidataSlice,
  }
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']


