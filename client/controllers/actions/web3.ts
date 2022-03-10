//import { AxiosResponse } from 'axios';
//import {} from '../types';
import { ethers } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { JKTnft } from '../../../typechain-types';

const web3Const = {
  openModal: 'WEB3_OPEN_MODAL',
  closeModal: 'WEB3_CLOSE_MODAL',
  setConnector: 'WEB3_SET_CONNECTOR',
  setProvider: 'WEB3_SET_PROVIDER',
  setEventListener: 'WEB3_SET_EVENT_LISTENER',
  setAddress: 'WEB3_SET_ADDRESS',
  setBalance: 'WEB3_SET_BALANCE',
  setContract: 'WEB3_SET_CONTRACT',
  clearWeb3: 'WEB3_CLEAR_WEB_3',
};

const web3Action = {
  openModal: () => ({
    type: web3Const.openModal,
  }),
  closeModal: () => ({
    type: web3Const.closeModal,
  }),
  setConnector: (payload: InjectedConnector | WalletConnectConnector) => ({
    type: web3Const.setConnector,
    payload,
  }),
  setProvider: (payload: ethers.providers.Web3Provider) => ({
    type: web3Const.setProvider,
    payload,
  }),
  setEventListener: (payload: ethers.providers.BaseProvider) => ({
    type: web3Const.setEventListener,
    payload,
  }),
  setAddress: (payload: string) => ({
    type: web3Const.setAddress,
    payload,
  }),
  setBalance: (payload: ethers.BigNumber) => ({
    type: web3Const.setBalance,
    payload,
  }),
  setContract: (payload: JKTnft) => ({
    type: web3Const.setContract,
    payload,
  }),
  clearWeb3: () => ({
    type: web3Const.clearWeb3,
  }),
};

export default { const: web3Const, action: web3Action };
