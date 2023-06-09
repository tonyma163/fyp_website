//react
import { useEffect } from "react";

//etherjs
import { ethers } from "ethers";

//wagmi
//https://wagmi.sh/react/hooks/useContractWrite
//https://wagmi.sh/examples/contract-write-dynamic
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import { useAccount } from "wagmi";

//Contract ABI
import Game01_ABI from "./abi/Game01.json";

const CharacterMint = (props) => {

    // Get the connected user's account address
    const { address } = useAccount();

    useEffect(() => {
        
    }, [address]);

    // Prepare the contract write configuration
    const { config } = usePrepareContractWrite({
      address: "0x1f164f925B49C866087090Bd288757E0fb19EB42",
      abi: Game01_ABI,
      functionName: "safeMint",
      args: [address, props.tokenType],
      overrides: {
        from: address,
        value: ethers.utils.parseEther("0.01"),
      },
    });

    //ownsNFTType
  
    // Use the contract write hook with the prepared configuration
    const { data, isLoading, isSuccess, write: mintNFT } = useContractWrite(config);

    return(
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
    )
}

export default CharacterMint;