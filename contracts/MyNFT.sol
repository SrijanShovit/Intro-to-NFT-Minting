//SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MyNFT is ERC721URIStorage,Ownable{

    //Counters is a library
    //below is syntax to use a library
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    //beside ctor,we give name and symbol of our NFT
    constructor() ERC721("Srijuu","SRJ"){}

    //mint or create NFT
    //recipient is to whom we will transfer NFT
    //tokenURI is the link where NFT is stored on IPFS

    //onlyOwner modifier comes from Ownable.sol
    function mintNFT(address recipient,string memory tokenURI) public onlyOwner returns(uint){

        //increment token Id everytime during creation
        _tokenIds.increment();

        //get current id
        uint newItemId = _tokenIds.current();

        //mint nft
        _mint(recipient, newItemId);

        //relate the nft with uri
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}