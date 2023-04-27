// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Game01 is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 public constant PRICE = 0.01 ether;
    uint256 public constant MAX_SUPPLY = 20;

    string private constant BASE_URI_0 = "https://cloudflare-ipfs.com/ipfs/QmeA9xHhanwo5xBv72XczoxaCfjN4ZqqCabFm4ayHNfjVN";
    string private constant BASE_URI_1 = "https://cloudflare-ipfs.com/ipfs/QmcM3VfQfBSNmUZrvMNTbMtFzpwY44tb7xy58t3z3YeCHu";

    constructor() ERC721("Game01", "G01") {}

    event TokenMinted(uint256 tokenId);

    function safeMint(address to, uint256 tokenURIType) public payable onlyOwner {
        require(msg.value == PRICE, "Incorrect Ether value sent");
        require(tokenURIType == 0 || tokenURIType == 1, "Invalid tokenURI type");
        require(_tokenIdCounter.current() < MAX_SUPPLY, "Maximum supply reached");

        uint256 tokenId = _tokenIdCounter.current();
        emit TokenMinted(tokenId);
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);

        _setTokenURI(tokenId, _tokenURIForType(tokenURIType));
    }

    function _tokenURIForType(uint256 tokenURIType) internal pure returns (string memory) {
        return (tokenURIType == 0) ? BASE_URI_0 : BASE_URI_1;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function uintToString(uint256 value) private pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + value % 10));
            value /= 10;
        }
        return string(buffer);
    }

    // Add totalSupply function to track minted NFTs
    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }
}