import { useEffect } from "react";

//
import { ethers } from "ethers";

//import { useContract } from 'wagmi'
//https://wagmi.sh/react/hooks/useContractWrite
//https://wagmi.sh/examples/contract-write-dynamic
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { useAccount } from "wagmi";

//Contract ABI
import Game01_ABI from "./abi/Game01.json";

const Mint02 = () => {
    // Get the connected user's account address
    const { address } = useAccount();

    useEffect(() => {

    }, [address]);

    // Prepare the contract write configuration
    const { config } = usePrepareContractWrite({
      address: "0x431D8910C17f8F9291d0A226d771074fe4c84844",
      abi: Game01_ABI,
      functionName: "safeMint",
      args: [address, 1],
      overrides: {
        from: address,
        value: ethers.utils.parseEther("0.01"),
      },
    });
  
    // Use the contract write hook with the prepared configuration
    const { data, isLoading, isSuccess, write: mintNFT } = useContractWrite(config);

    return (
      <>
        <button
          disabled={!mintNFT}
          onClick={() => mintNFT?.()}
          type="button"
          className="font-bold py-3 px-8 rounded-2xl bg-[#112D4E] text-[#F9F7F7] hover:bg-[#FDD36A] hover:text-[#112D4E] transition-colors duration-300"
        >
          Mint
        </button>
        {isLoading && (
          <p className="text-[#112D4E] text-2xl font-bold">Loading...</p>
        )}
        {isSuccess && (
          <p className="text-[#112D4E] text-2xl font-bold">Minted!</p>
        )}
      </>
    );
  };

export default Mint02;