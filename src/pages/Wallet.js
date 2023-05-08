//react
import { useState, useEffect } from "react";

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ConnectButton from "./components/ConnectButton";
import NFTCard from "./components/NFTCard";

//wagmi
import { useAccount} from "wagmi";
import { useProvider } from "wagmi";
import { useContract } from 'wagmi'

//Contract ABI
import Game01_ABI from "./components/Game01/abi/Game01.json";
import Game01Contract from "./components/Game01/abi/Game01Contract.json";

const Wallet = () => {

  //Wagmi
  const { address, isConnected } = useAccount();
  const provider = useProvider();
  //nft contract
  const nftContract = useContract({
    address: '0x7e471e471b829E21d106826dED63B875a0170D4E',
    abi: Game01_ABI,
    signerOrProvider: provider,
  });

  //userNFTs
  const [nfts, setNFTs] = useState([]);

  //fetch status
  const [fetchingNFTs, setFetchingNFTs] = useState(false);

  //Solution: Text content does not match server-rendered HTML.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isConnected && provider) {
      setNFTs([]);
      setFetchingNFTs(true);
      fetchUserNFTs();
    }
  }, [isConnected, provider, address]);

  async function fetchUserNFTs() {
    //balance
    const balance = await nftContract.balanceOf(address);

    //current total supply
    const totalSupply = await nftContract.totalSupply();

    //counter for counting how many owned nfts has been recorded
    let count = balance;
    
    let userNFTs = [];
    if (count!=0) {
      for (let i = 0; i < totalSupply || count > 0; i++) {
        const owner = await nftContract.ownerOf(i);
        if (owner === address) {
          count--;
          const tokenURI = await nftContract.tokenURI(i);

          //grab the time
          const timeStamp = await fetchTime(i);
          //var modifiedTimeStamp = BigInt(timeStamp).toString();

          userNFTs.push({
            tokenId: i,
            timeStamp: BigInt(timeStamp).toString(),
            tokenURI: tokenURI,
            owner: owner,
          });
        }
      }
    }

    setNFTs(userNFTs);
    setFetchingNFTs(false);
  }

  //game contract
  const gameContract = useContract({
    address: '0xD609c1E856edaB8C36C33762dD487752Ebab2c46',
    abi: Game01Contract,
    signerOrProvider: provider,
  });
  async function fetchTime(tokenId) {

    const time = await gameContract.getTimestamp(tokenId);

    console.log("TIMESTAMP: "+time);

    return time;
  }


  //
  const handleNftTransfer = (tokenId) => {
    setNFTs(nfts.filter((nft) => nft.tokenId !== tokenId));
  };
  
  return (
    <>
    <Navbar />

    <div className="flex justify-center">
      {mounted && !isConnected && <ConnectButton />}
      {mounted && isConnected && (
        <div className="w-full text-center">

          <h1 className="inline-block bg-gray-500 rounded-md text-white px-1 py-0.5 mx-auto my-4">
            {address}
          </h1>

          {/* Display messages */}
          <div className="container mx-auto px-4 h-12 text-center">
            {fetchingNFTs && (
              <p className="text-2xl font-bold text-blue-500">
                Fetching your NFTs...
              </p>
            )}
            {!fetchingNFTs && nfts.length === 0 && (
              <p className="text-2xl font-bold text-red-500">
                You don't have any NFTs.
              </p>
            )}
          </div>

          {/* Display Wallet Owned NFTs */}
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {nfts.map((nft) => (
                <NFTCard key={nft.tokenId} nft={nft} onTransfer={handleNftTransfer} />
              ))}
            </div>
          </div>

        </div>
      )}
    </div>

    <Footer />
    </>
  );
};

export default Wallet;