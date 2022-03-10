import { useEffect, MouseEvent } from 'react';
import { ethers } from 'ethers';
import Presenter from './galleryPresenter';
import { useReduxState, useDispatch, nft, web3 } from '../../controllers';
import { TMPropsGallery } from './galleryType';
import JKTnftDoc from '../../../deployments/rinkeby/JKTnft.json';
//import {} from '../../types';

const Interactor = () => {
  const dispatch = useDispatch();
  const sProvider = useReduxState((state) => state.web3.provider);
  const sContract = useReduxState((state) => state.web3.contract);
  const sAddress = useReduxState((state) => state.web3.address);
  const sNft = useReduxState((state) => state.nft);
  const sEventListener = useReduxState((state) => state.web3.eventListener);
  const JKTinterface = new ethers.utils.Interface(JKTnftDoc.abi);

  useEffect(() => {
    // Get the list of ipfs URI to get NFTs' data
    dispatch(nft.action.reqUri());
    // Load minted NFTs from local storage
    dispatch(nft.action.loadMinted());
  }, []);

  // Event listening
  useEffect(() => {
    if (!sProvider || !sEventListener || !sContract) return;
    const transferEvent = sContract.filters.Transfer(null, sAddress); // All Transfers "to" my address
    sEventListener.on(transferEvent, (logs) => {
      const parsed = JKTinterface.parseLog(logs);
      const id: string = parsed.args.tokenId.toString();
      dispatch(nft.action.saveMinted(id));
      (async () => {
        const newbalance = await sProvider.getSigner().getBalance();
        dispatch(web3.action.setBalance(newbalance));
      })();
    });
    return () => {
      if (sEventListener) sEventListener.off(transferEvent);
    };
  }, [sProvider, sEventListener, sContract, sAddress]);

  const onMintClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!sProvider) {
      alert('Please, connect your wallet first');
      return;
    }
    const id = (e.target as HTMLButtonElement).getAttribute('data-nft-id');
    console.log('mint id:', id);
    if (!id || !sContract) return;
    try {
      dispatch(nft.action.setMintStatus({ id, status: 'minting' }));
      const tx = await sContract.safeMint(sAddress, id, sNft[id].uri, { gasLimit: 3e6 });
      await tx.wait();
    } catch (error) {
      console.error(error);
      dispatch(nft.action.setMintStatus({ id, status: undefined }));
    }
  };
  const onSaleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    if (!sProvider) {
      alert('Please, connect your wallet first');
      return;
    }
    const id = (e.target as HTMLButtonElement).getAttribute('data-nft-id');
    //TODO: Implement sales
    console.log('sale id:', id);
  };

  const props: TMPropsGallery = {
    data: useReduxState((state) => state.nft),
    onMintClick,
    onSaleClick,
  };

  return <Presenter {...props} />;
};

export default Interactor;
