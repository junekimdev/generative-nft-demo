import { combineReducers } from 'redux';
import { createSelectorHook } from 'react-redux';
import { IAction } from '../types';
import web3 from './web3Reducer';
import nft from './nftReducer';

const rootReducer = combineReducers({ web3, nft });

export default rootReducer;
export type TSRoot = ReturnType<typeof rootReducer>;
export const useReduxState = createSelectorHook<TSRoot, IAction>();
