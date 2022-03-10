import { waffle, ethers } from 'hardhat';
import { expect, assert } from 'chai';
import jktnft from '../artifacts/contracts/JKT_nft.sol/JKTnft.json';
const { deployContract, provider } = waffle;

describe('JKT_nft Test', () => {
  let contract;
  before(async () => {
    const signer = provider.getSigner();
    contract = await deployContract(signer, jktnft);
  });

  it('', () => {});
});
