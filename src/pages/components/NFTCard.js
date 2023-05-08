//react
import React, { useState } from "react";

//etherjs
import { ethers } from "ethers";

//wagmi
//https://wagmi.sh/react/hooks/useContractWrite
//https://wagmi.sh/examples/contract-write-dynamic
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { useAccount } from "wagmi";

//Contract ABI
import Game01_ABI from "./Game01/abi/Game01.json";

const NFTCard = ({ nft }) => {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferAddress, setTransferAddress] = useState("");

  function openTransfer() {
    console.log("Open");
    setShowTransferModal(true);
  }

  function closeTransfer() {
    console.log("Close");
    setShowTransferModal(false);
  }

  /*
  function handleTransfer() {
    console.log("Transfer to:", transferAddress);
    // Implement your transfer logic here
    closeTransfer();
  }
  */

  // Prepare the contract write configuration
  const { config } = usePrepareContractWrite({
    address: "0x7e471e471b829E21d106826dED63B875a0170D4E",
    abi: Game01_ABI,
    functionName: "safeTransferFrom",
    args: [nft.owner, transferAddress, nft.tokenId],
    overrides: {
    },
  });
  // Use the contract write hook with the prepared configuration
  const { data, isLoading, isSuccess, write: transferNFT } = useContractWrite(config);

  return (
    <>
      <div className="nft-card">
        <img src={nft.tokenURI} alt={nft.tokenId} />
        <div className="p-4">
          <p className="text-sm text-gray-500">Token ID: {nft.tokenId}</p>
          <p className="text-sm text-gray-500">Pass Record: {nft.timeStamp} secs</p>
          <button
            onClick={openTransfer}
            type="button"
            className="font-bold py-3 px-8 rounded-2xl bg-[#112D4E] text-[#F9F7F7] hover:bg-[#FDD36A] hover:text-[#112D4E] transition-colors duration-300"
          >
            Transfer
          </button>
        </div>
      </div>

      {showTransferModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl mb-4">Enter the transfer address:</h2>
            <input
              type="text"
              value={transferAddress}
              onChange={(e) => setTransferAddress(e.target.value)}
              className="transfer-input w-full border border-gray-300 rounded p-2 mb-4"
            />
            <div className="flex justify-end space-x-4">
              {(!isLoading && !isSuccess) &&
              <button
                onClick={() => transferNFT?.()}
                className="transfer-button bg-blue-500 text-white rounded px-4 py-2"
              >
                Transfer
              </button>
              }

              {isLoading && 
                <button
                className="close-button bg-gray-300 text-black rounded px-4 py-2"
              >
                Loading...
              </button>
              }
              {isSuccess &&
                <button
                  onClick={closeTransfer}
                  className="close-button bg-gray-300 text-black rounded px-4 py-2"
                >
                  Success!
                </button>
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NFTCard;
