import { Reducer } from 'redux';
import { ethers } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import web3 from '../actions/web3';
import { IAction } from '../types';
import { JKTnft } from '../../../typechain-types';

type TSweb3 = {
  eventListener: ethers.providers.BaseProvider | null;
  connector: InjectedConnector | WalletConnectConnector | null;
  provider: ethers.providers.Web3Provider | null;
  contract: JKTnft | null;
  isConnected: boolean;
  address: string;
  balance: ethers.BigNumber | string;
  isModalOpened: boolean;
};

const initialState: TSweb3 = {
  eventListener: null,
  connector: null,
  provider: null,
  contract: null,
  isConnected: false,
  address: '',
  balance: '0.0',
  isModalOpened: false,
};

const reducer: Reducer<TSweb3, IAction> = (state = initialState, action) => {
  switch (action.type) {
    case web3.const.openModal:
      return {
        ...state,
        isModalOpened: true,
      };
    case web3.const.closeModal:
      return {
        ...state,
        isModalOpened: false,
      };
    case web3.const.setEventListener:
      return {
        ...state,
        eventListener: action.payload,
      };
    case web3.const.setConnector:
      return {
        ...state,
        connector: action.payload,
      };
    case web3.const.setProvider:
      return {
        ...state,
        provider: action.payload,
        isConnected: true,
      };
    case web3.const.setContract:
      return {
        ...state,
        contract: action.payload,
      };
    case web3.const.setAddress:
      return {
        ...state,
        address: action.payload,
      };
    case web3.const.setBalance:
      return {
        ...state,
        balance: action.payload,
      };
    case web3.const.clearWeb3:
      return {
        ...state,
        connector: null,
        provider: null,
        contract: null,
        isConnected: false,
        address: '',
        balance: '0.0',
      };
    default:
      return state;
  }
};

export default reducer;
