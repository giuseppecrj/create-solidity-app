//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;

    constructor(address marketplaceAddress)
        ERC721("G's Digital Marketplace", "GDM")
    {
        contractAddress = marketplaceAddress;
    }

    function createToken(string memory tokenURI) public returns (uint256) {
        // create an nft id
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        // create instance of token with given id
        _mint(msg.sender, newItemId);

        // set the uri of the token
        _setTokenURI(newItemId, tokenURI);

        // allows us to have access to this func from another contract
        setApprovalForAll(contractAddress, true);

        // return token id
        return newItemId;
    }
}
