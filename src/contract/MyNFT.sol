// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721 {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  mapping (uint256 => string) private _tokenURIs;
  mapping (string => bool) public hashExists;

  constructor() ERC721("My NFT", "NFT") {}

  function mint(address to, string memory hash) public {
    require(!hashExists[hash], "ERC721: hash already minted");
    hashExists[hash] = true;
    _tokenIds.increment();
    uint256 tokenId = _tokenIds.current();
    _mint(to, tokenId);
    _tokenURIs[tokenId] = hash;
  }

  function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    require(_exists(tokenId), "ERC721: URI query for nonexistent token");
    return _tokenURIs[tokenId];
  }
}