const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token contract", function () {
    //contract
    let nft;
    let nftContractAddress;

    //deploy contract before each test
    beforeEach("Setup", async () => {
        //accounts
        [owner, addr1, addr2] = await ethers.getSigners();

        //contract deployment
        const Game01 = await ethers.getContractFactory("Game01");
        nft = await Game01.deploy();
        await nft.deployed();
    })

    //test contract address, name, symbol, and owner
    it("Contract Address, Name, Symbol, Owner Test", async () => {
        //address
        const nftContractAddress = nft.address;
        expect(nftContractAddress).to.not.be.empty;
        expect(nftContractAddress).to.not.equal("0x0");

        //name
        expect(await nft.name()).to.equal("Game01");

        //symbol
        expect(await nft.symbol()).to.equal("G01");

        //owner
        expect(await nft.owner()).to.equal(owner.address);
    })

    //test mint, tokenURI type 0
    it("Mint, tokenURI Type 0 Test", async () => {
        //default tokenURI type = 0
        const tokenURIType = 0;
        const tx = await nft.connect(owner).safeMint(owner.address, tokenURIType, { value: ethers.utils.parseEther("0.01") });
        
        //get the event
        const receipt = await tx.wait();
        const tokenId = receipt.events[0].args.tokenId;

        const tokenURI = await nft.tokenURI(tokenId);
        expect(tokenURI).to.equal("https://cloudflare-ipfs.com/ipfs/QmeA9xHhanwo5xBv72XczoxaCfjN4ZqqCabFm4ayHNfjVN");
    });

    //tokenURI type 1
    it("TokenURI Type 1 Test", async () => {
        //default tokenURI type = 1
        const tokenURIType = 1;
        const tx = await nft.connect(owner).safeMint(owner.address, tokenURIType, { value: ethers.utils.parseEther("0.01") });

        //get the event
        const receipt = await tx.wait();
        const tokenId = receipt.events[0].args.tokenId;

        const tokenURI = await nft.tokenURI(tokenId);
        expect(tokenURI).to.equal("https://cloudflare-ipfs.com/ipfs/QmcM3VfQfBSNmUZrvMNTbMtFzpwY44tb7xy58t3z3YeCHu");
    });

    //test minting price
    it("Mint Price Test", async () => {
        // < insufficient payment
        await expect(nft.connect(owner).safeMint(owner.address, 0, { value: ethers.utils.parseEther("0.005") })).to.be.revertedWith("Incorrect Ether value sent");

        // > excessive payment
        await expect(nft.connect(owner).safeMint(owner.address, 0, { value: ethers.utils.parseEther("0.02") })).to.be.revertedWith("Incorrect Ether value sent");

        // = correct payment
        await expect(nft.connect(owner).safeMint(owner.address, 0, { value: ethers.utils.parseEther("0.01") })).to.not.be.reverted;
    });
    
    //test max supply
    it("Max Supply Test", async () => {
        for (let i = 0; i < 20; i++) {
          await nft.connect(owner).safeMint(owner.address, i%2, { value: ethers.utils.parseEther("0.01") });
        }
        await expect(nft.connect(owner).safeMint(owner.address, 0, { value: ethers.utils.parseEther("0.01") })).to.be.revertedWith("Maximum supply reached");
    });
    
    //test withdraw
    it("Normal-Withdraw Test", async () => {
        //minting
        await nft.connect(owner).safeMint(owner.address, 0, { value: ethers.utils.parseEther("0.01") });
        
        //contract balance
        const initialBalance = await owner.getBalance();
        const contractBalance = await ethers.provider.getBalance(nft.address);
        expect(contractBalance).to.equal(ethers.utils.parseEther("0.01"));
        
        //owner balance after withdraw
        await nft.connect(owner).withdraw();
        const finalBalance = await owner.getBalance();
        expect(finalBalance).to.be.gt(initialBalance);
    });

    //test non-owner withraw
    it("Abnormal-Withdraw Test", async () => {
        //minting
        await nft.connect(owner).safeMint(owner.address, 0, { value: ethers.utils.parseEther("0.01") });

        //contract balance
        const contractBalance = await ethers.provider.getBalance(nft.address);
        expect(contractBalance).to.equal(ethers.utils.parseEther("0.01"));

        //abnormal withdraw
        await expect(nft.connect(addr1).withdraw()).to.be.revertedWith("Ownable: caller is not the owner");
    });
    
    //test transfer
    it("Transfer Test", async () => {
        //minting
        await nft.connect(owner).safeMint(owner.address, 0, { value: ethers.utils.parseEther("0.01") });

        //owner balance
        const ownerBalance = await nft.balanceOf(owner.address);
        expect(ownerBalance).to.equal(1);

        //transfer from owner to addr1
        await nft.connect(owner).transferFrom(owner.address, addr1.address, 0);

        //check updated balanceOf
        const newOwnerBalance = await nft.balanceOf(owner.address);
        expect(newOwnerBalance).to.equal(0);
        const addr1Balance = await nft.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(1);
    });

    //non-owner transfer 
    it("Non-owner Transfer Test", async () => {
        //minting
        await nft.connect(owner).safeMint(owner.address, 0, { value: ethers.utils.parseEther("0.01") });
        
        //non-owner transfer
        await expect(nft.connect(addr1).transferFrom(owner.address, addr1.address, 0)).to.be.reverted;
    });
    
    /* END */
    
})