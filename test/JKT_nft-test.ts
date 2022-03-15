import { waffle, ethers } from 'hardhat';
import { BigNumber } from 'ethers';
import { expect, use } from 'chai';
import JKTnftABI from '../artifacts/contracts/JKTnft.sol/JKTnft.json';
import { JKTnft } from '../typechain-types';

const { deployContract, provider, solidity } = waffle;
const TOKEN_URI = 'https://test.io/uri';
const ARRD_0 = ethers.constants.AddressZero;

use(solidity);

const bigNum = (n: number) => BigNumber.from(n);

describe('Testing JKT NFT Contract', () => {
  const [owner, ...wallets] = provider.getWallets();
  let contract: JKTnft;
  let tokenId = 0;
  // Given: JKTnft contract deployed by the deployer
  before(async () => {
    contract = (await deployContract(owner, JKTnftABI)) as JKTnft;
  });

  // When
  describe('Owner mints NFT', async () => {
    // Then
    it('Should emit "Transfer" event', async () => {
      await expect(contract.safeMint(owner.address, tokenId, TOKEN_URI)).to.emit(
        contract,
        'Transfer',
      );
    });

    // Then
    it('Should emit "Transfer" event with [address(0), address(owner), tokenId]', async () => {
      await expect(contract.safeMint(owner.address, ++tokenId, TOKEN_URI))
        .to.emit(contract, 'Transfer')
        .withArgs(ARRD_0, owner.address, bigNum(tokenId));
    });

    // Then
    it('Should mint to the deployer', async () => {
      await contract.safeMint(owner.address, ++tokenId, TOKEN_URI);
      expect(await contract.balanceOf(owner.address)).to.eq(bigNum(tokenId + 1));
    });
  });

  // When
  describe('Owner requests to mint which is already minted', async () => {
    let balance: BigNumber;
    before(async () => {
      balance = await contract.balanceOf(owner.address);
    });

    // Then
    it('Should revert', async () => {
      await expect(contract.safeMint(owner.address, 0, TOKEN_URI)).to.be.reverted;
    });

    // Then
    it('Should not change balance', async () => {
      expect(await contract.balanceOf(owner.address)).to.eq(balance);
    });
  });

  // When
  describe('Non-owner requests to mint', async () => {
    // Then
    it('Should revert', async () => {
      await expect(
        contract.safeMint(wallets[0].address, ++tokenId, TOKEN_URI, { from: wallets[0].address }),
      ).to.be.reverted;
    });

    // Then
    it('Should have no nfts in his wallet', async () => {
      expect(await contract.balanceOf(wallets[0].address)).to.eq(bigNum(0));
    });
  });
});
