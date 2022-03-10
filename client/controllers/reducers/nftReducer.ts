import { Reducer } from 'redux';
import nft from '../actions/nft';
import { IAction, DMuri, TSMintPayload, TSmetadataCarry, TSnft, TSmetadataBucket } from '../types';

const initialState: TSnft = {};

const reducer: Reducer<TSnft, IAction> = (state = initialState, action) => {
  switch (action.type) {
    case nft.const.setUri:
      const uri: DMuri = action.payload;
      state[uri.id] = { ...state[uri.id], uri: uri.url } as TSmetadataBucket;
      return {
        ...state,
      };
    case nft.const.setMetadata:
      const metadata: TSmetadataCarry = action.payload;
      state[metadata.id] = { ...state[metadata.id], meta: metadata.meta } as TSmetadataBucket;
      return {
        ...state,
      };
    case nft.const.setMintStatus:
      const { id, status }: TSMintPayload = action.payload;
      state[id] = { ...state[id], mintStatus: status } as TSmetadataBucket;
      return {
        ...state,
      };
    case nft.const.reqUri:
    case nft.const.resUri:
    case nft.const.reqMetadata:
    case nft.const.resMetadata:
    case nft.const.loadMinted:
    case nft.const.saveMinted:
    default:
      return state;
  }
};

export default reducer;
