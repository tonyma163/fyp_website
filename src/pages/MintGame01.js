//react
import * as React from "react";
import { useState, useEffect } from "react";

//next
import Image from "next/image";

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ConnectButton from "./components/ConnectButton";

//mint buttons
import CharacterMint from "./components/Game01/CharacterMint";

//wagmi
//import { useSignMessage } from "wagmi";
import { useAccount } from "wagmi";
import { useNetwork, useSwitchNetwork } from 'wagmi'

const MintGame01 = () => {
    //Wagmi
    //Sign message
    //https://wagmi.sh/react/hooks/useSignMessage
    /*
    const [message, setMessage] = React.useState("")

    const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
        message,

        onSuccess(data) {
            console.log('Success', data)
            // Alert
            alert("[Success] "+data);
        },
        onError(error) {
            console.log('Error', error)
            // Alert
            alert("[Error] "+error);
        },
        onMutate(args) {
            console.log('Mutate', args)
        },
        onSettled(data, error) {
            console.log('Settled', { data, error })
        },
        
    })

    function ConfirmMintMessage() {
        setMessage("Are you sure to purchase [NFT-NAME] NFT-TYPE ?");
        signMessage()
    }
    */

    //Wagmi
    //Check Connected?
    const { address, isConnected } = useAccount();
    const { chain } = useNetwork();
    const { chains } = useSwitchNetwork();


    //parameters
    const [images, setImages] = useState([]);

    //ipfs images
    //const imageType1CID = "QmeA9xHhanwo5xBv72XczoxaCfjN4ZqqCabFm4ayHNfjVN";
    //const imageType2CID = "QmcM3VfQfBSNmUZrvMNTbMtFzpwY44tb7xy58t3z3YeCHu";
    const imageType1CID = "QmXuAZZaNRegt94raZGLfvjt1hQH5D68EMn2n2rRKSpzmT";
    const imageType2CID = "QmWUSiZPZa9oAVw9U4ke6xcw2msCiCMYGxb766u6hu3Fhr";

    const imageCIDs = [
        imageType1CID,
        imageType2CID,
    ];

    //
    useEffect(() => {

        const fetchImages = async () => {
            try {
                const res = await Promise.all(imageCIDs.map((CID)=> fetch("https://cloudflare-ipfs.com/ipfs/"+CID)));
                const imageBlobs = await Promise.all(res.map((res) => res.blob()));
                const imageObjectURLs = imageBlobs.map((blob) => URL.createObjectURL(blob));
                setImages(imageObjectURLs);
            } catch (err) {
                console.log("ERROR: ",err);
            }
        };

        //
        fetchImages();
    }, []);
    
    return( 
        <>
            <div className="flex flex-col h-screen justify-between">
            <Navbar />

            <p className="py-3 px-10 text-center font-bold italic">INSTRUCTION: Each account only could own ONE type of NFTs</p>

            <div className="lg:flex lg:justify-evenly">
                {images.map((imageSrc, index) => (
                    <div key={index} className="py-10 flex justify-center">
                        <div className="bg-[#DBE2EF] max-w-sm shadow-lg rounded-3xl overflow-hidden">
                            <Image
                                src={imageSrc}
                                alt=""
                                width={960}
                                height={540}
                                priority
                            />

                            <div className="py-3 text-center">
                                    <div className="pt-3 flex justify-around">

                                        {!isConnected && <ConnectButton />}
                                        {isConnected && chains.map((x) => (
                                            <div key={x.id}>
                                                {x.id !== chain?.id && <ConnectButton />}

                                                {x.id === chain?.id && index===0 && (
                                                    <>
                                                    <h1 className="text-[#112D4E] text-3xl font-bold pb-5">Type1</h1>
                                                    <CharacterMint tokenType = "0" />
                                                    </>
                                                )
                                                }

                                                {x.id === chain?.id && index===1 && (
                                                    <>
                                                    <h1 className="text-[#112D4E] text-3xl font-bold pb-5">Type2</h1>
                                                    <CharacterMint tokenType = "1" />
                                                    </>
                                                )}
                                            </div>
                                        ))}

                                    </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
            </div>
        </>
    )
}



export default MintGame01;