import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rte';
import { useDispatch } from 'react-redux';

const store = configureStore({ reducer: rootReducer });

export type RteDispatch = typeof store.dispatch;
export const useRteDispatch = useDispatch.withTypes<RteDispatch>();

export default store;
