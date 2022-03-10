import { AxiosResponse } from 'axios';
import {
  txtString,
  tokenIdString,
  DMuri,
  DMmetadata,
  TSmetadataCarry,
  TSMintPayload,
} from '../types';

const nftConst = {
  reqUri: 'NFT_REQ_URI',
  resUri: 'NFT_RES_URI',
  reqMetadata: 'NFT_REQ_METADATA',
  resMetadata: 'NFT_RES_METADATA',
  reqImg: 'NFT_REQ_IMG',
  resImg: 'NFT_RES_IMG',
  setUri: 'NFT_SET_URI',
  setMetadata: 'NFT_SET_METADATA',
  loadMinted: 'NFT_LOAD_MINTED',
  saveMinted: 'NFT_SAVE_MINTED',
  setMintStatus: 'NFT_SET_MINT_STATUS',
};

const nftAction = {
  reqUri: () => ({
    type: nftConst.reqUri,
  }),
  resUri: (payload: AxiosResponse<txtString>) => ({
    type: nftConst.resUri,
    payload,
  }),
  reqMetadata: (payload: DMuri) => ({
    type: nftConst.reqMetadata,
    payload,
  }),
  resMetadata: (payload: AxiosResponse<DMmetadata>) => ({
    type: nftConst.resMetadata,
    payload,
  }),
  setUri: (payload: DMuri) => ({
    type: nftConst.setUri,
    payload,
  }),
  setMetadata: (payload: TSmetadataCarry) => ({
    type: nftConst.setMetadata,
    payload,
  }),
  loadMinted: () => ({
    type: nftConst.loadMinted,
  }),
  saveMinted: (payload: tokenIdString) => ({
    type: nftConst.saveMinted,
    payload,
  }),
  setMintStatus: (payload: TSMintPayload) => ({
    type: nftConst.setMintStatus,
    payload,
  }),
};

export default { const: nftConst, action: nftAction };
