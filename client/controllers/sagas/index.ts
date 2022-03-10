import { all, spawn, call } from 'redux-saga/effects';
import request from './requestSaga';
import nft from './nftSaga';

const rootSaga = function* () {
  const sagas: any[] = [request, nft];

  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error(e);
          }
        }
      }),
    ),
  );
};

export default rootSaga;
