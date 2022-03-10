import { takeEvery, call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { nft, request } from '../actions';
//import { TSRoot } from '../reducers';
import {
  IAction,
  tokenIdString,
  txtString,
  DMuri,
  DMmetadata,
  TStraits,
  TSmetadata,
} from '../types';
import { META_URI } from '../utils/apiURLs';

const EOL = '\r\n';
const STORAGE_NAME = 'JKT.minted';

const parseMetaUri = (data: txtString) => {
  const listOfUri = data.split(EOL);
  {
    let i = 0;
    while ((i = listOfUri.indexOf('')) > -1) listOfUri.splice(i, 1); // remove empty element
  }
  const r: DMuri[] = [];
  for (let i = 0; i < listOfUri.length; i++) {
    const [k, v] = listOfUri[i].split('=');
    r.push({ id: k, url: v });
  }
  return r;
};

const convertMetadata = (data: DMmetadata) => {
  const { name, image, attributes } = data;
  const imageSrc = image.replace('ipfs://', 'https://dweb.link/ipfs/');
  const traitsRaw: any = {};
  for (let i = 0; i < attributes.length; i++) {
    const { trait_type, value } = attributes[i];
    switch (trait_type) {
      case 'Color':
        traitsRaw['color'] = value;
        break;
      case 'Shape':
        traitsRaw['shape'] = value;
        break;
      case 'Text':
        traitsRaw['text'] = value;
        break;
      case 'HP':
        traitsRaw['hp'] = value;
        break;
      case 'DSP':
        traitsRaw['dsp'] = value;
        break;
      case 'Consumption':
        traitsRaw['consumption'] = value;
        break;
      case 'Recovery Rate':
        traitsRaw['recovery'] = value;
        break;
      case 'Created':
        traitsRaw['created'] = value;
        break;
      default:
    }
  }
  const traits: TStraits = { ...traitsRaw };
  return { name, imageSrc, traits } as TSmetadata;
};

function* reqUriWorker(_: IAction) {
  const url = META_URI;
  const subscriber = nft.const.resUri;
  yield put(request.action.get({ url, subscriber }));
}
function* resUriWorker(action: IAction<AxiosResponse<txtString>>) {
  if (action.payload.status >= 400) return console.error(action.payload.statusText);
  const { data } = action.payload;
  const uriList: DMuri[] = yield call(parseMetaUri, data);
  for (let i = 0; i < uriList.length; i++) yield put(nft.action.reqMetadata(uriList[i]));
}
function* reqMetadataWorker(action: IAction<DMuri>) {
  const { url } = action.payload;
  const subscriber = nft.const.resMetadata;
  yield put(nft.action.setUri(action.payload));
  yield put(request.action.get({ url, subscriber }));
}
function* resMetadataWorker(action: IAction<AxiosResponse<DMmetadata>>) {
  if (action.payload.status >= 400) return console.error(action.payload.statusText);
  const { data } = action.payload;
  const id = data.name.slice(4);
  const meta = convertMetadata(data);
  yield put(nft.action.setMetadata({ id, meta }));
}
function* loadMintedWorker(_: IAction) {
  // const minted = localStorage.getItem(STORAGE_NAME);
  const minted: string | null = yield call([localStorage, localStorage.getItem], STORAGE_NAME);
  if (!minted) return;
  const mintedList = minted.split(',');
  for (let i = 0; i < mintedList.length; i++)
    yield put(nft.action.setMintStatus({ id: mintedList[i], status: 'minted' }));
}
function* saveMintedWorker(action: IAction<tokenIdString>) {
  const tokenId = action.payload;
  // const minted = localStorage.getItem(STORAGE_NAME);
  const minted: string | null = yield call([localStorage, localStorage.getItem], STORAGE_NAME);
  let updated = '';
  if (!minted) {
    updated = tokenId;
  } else {
    const mintedList = minted.split(',');
    if (mintedList.indexOf(tokenId) > -1) return;
    updated = `${minted},${tokenId}`;
  }
  // localStorage.setItem(STORAGE_NAME, updated);
  yield call([localStorage, localStorage.setItem], STORAGE_NAME, updated);
  yield put(nft.action.setMintStatus({ id: tokenId, status: 'minted' }));
}
// function* setMintStatusWorker(action: IAction) {
//   const {} = action.payload;
// }
// function* setUriWorker(action: IAction) {
//   const {} = action.payload;
// }
// function* setMetadataWorker(action: IAction) {
//   const {} = action.payload;
// }

export default function* watcher() {
  yield takeEvery(nft.const.reqUri, reqUriWorker);
  yield takeEvery(nft.const.resUri, resUriWorker);
  yield takeEvery(nft.const.reqMetadata, reqMetadataWorker);
  yield takeEvery(nft.const.resMetadata, resMetadataWorker);
  yield takeEvery(nft.const.loadMinted, loadMintedWorker);
  yield takeEvery(nft.const.saveMinted, saveMintedWorker);
  // yield takeEvery(nft.const.setMintStatus, setMintStatusWorker);
  // yield takeEvery(nft.const.setUri, setUriWorker);
  // yield takeEvery(nft.const.setMetadata, setMetadataWorker);
}
