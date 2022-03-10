import { useEffect } from 'react';
import { ethers } from 'ethers';
import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import Presenter from './topbarPresenter';
import { useReduxState, useDispatch, web3 } from '../../controllers';
import { TMPropsTopbar } from './topbarType';
import { JKTnft } from '../../../typechain-types';
import JKTnftDoc from '../../../deployments/rinkeby/JKTnft.json';
//import {} from '../../types';

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY || '';
const ALCHEMY_API_URL = `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`;

const getFormattedBalance = (balance: ethers.BigNumber | string) => {
  if (typeof balance === 'string') return balance;
  return parseFloat(ethers.utils.formatEther(balance)).toFixed(3);
};

const Interactor = () => {
  const dispatch = useDispatch();
  const sConnector = useReduxState((state) => state.web3.connector);
  const sProvider = useReduxState((state) => state.web3.provider);

  // Get Chain Event Listener
  useEffect(() => {
    const eventListener = ethers.getDefaultProvider(ALCHEMY_API_URL);
    dispatch(web3.action.setEventListener(eventListener));
  }, []);

  useEffect(() => {
    if (!sProvider) return;
    (async () => {
      const address = await sProvider.getSigner().getAddress();
      dispatch(web3.action.setAddress(address));
      const balance = await sProvider.getSigner().getBalance();
      dispatch(web3.action.setBalance(balance));
      const contact = new ethers.Contract(
        JKTnftDoc.address,
        JKTnftDoc.abi,
        sProvider.getSigner(),
      ) as JKTnft;
      dispatch(web3.action.setContract(contact));
    })();
  }, [sProvider]);

  const connect = async (connector: InjectedConnector | WalletConnectConnector) => {
    await connector.activate();
    dispatch(web3.action.closeModal());
    dispatch(web3.action.setConnector(connector));
    const provider = new ethers.providers.Web3Provider(await connector.getProvider());
    dispatch(web3.action.setProvider(provider));
  };

  const props: TMPropsTopbar = {
    isModalOpened: useReduxState((state) => state.web3.isModalOpened),
    isConnected: useReduxState((state) => state.web3.isConnected),
    address: useReduxState((state) => state.web3.address),
    balance: getFormattedBalance(useReduxState((state) => state.web3.balance)),
    onMetaMaskClick: async (e) => {
      e.stopPropagation();
      const connector = new InjectedConnector({ supportedChainIds: [1, 4] });
      try {
        await connect(connector);
      } catch (error) {
        console.error(error);
        dispatch(web3.action.closeModal());
        dispatch(web3.action.clearWeb3());
      }
    },
    onWalletConnetClick: async (e) => {
      e.stopPropagation();
      const connector = new WalletConnectConnector({
        rpc: { 4: ALCHEMY_API_URL },
        qrcode: true,
      });
      try {
        await connect(connector);
      } catch (error) {
        connector.walletConnectProvider = undefined;
        dispatch(web3.action.closeModal());
        dispatch(web3.action.clearWeb3());
      }
    },
    onOutsideModalClick: () => {
      dispatch(web3.action.closeModal());
    },
    onModalClick: (e) => e.stopPropagation(),
    onConnectClick: () => {
      dispatch(web3.action.openModal());
    },
    onDisconnectClick: () => {
      if (sConnector) sConnector.deactivate();
      dispatch(web3.action.clearWeb3());
    },
  };

  return <Presenter {...props} />;
};

export default Interactor;
