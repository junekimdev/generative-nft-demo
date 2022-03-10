// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract JKTnft is ERC721URIStorage, Ownable {
  constructor() ERC721("June Kim's Trial NFT", "JKT") Ownable() {}

  function safeMint(
    address to,
    uint256 tokenId,
    string memory tokenURI
  ) public onlyOwner returns (uint256) {
    uint256 newItemId = tokenId;
    _safeMint(to, tokenId);
    _setTokenURI(newItemId, tokenURI);
    return newItemId;
  }
}
