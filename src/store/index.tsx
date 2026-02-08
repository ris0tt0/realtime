import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from './rte';

const store = configureStore({ reducer: rootReducer });

export type RteDispatch = typeof store.dispatch;
export const useRteDispatch = useDispatch.withTypes<RteDispatch>();

export default store;
