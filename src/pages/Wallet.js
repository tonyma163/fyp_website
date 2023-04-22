import { useState, useEffect } from "react";

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

//Wagmi
import { useAccount, useDisconnect } from "wagmi";
import ConnectButton from "./components/ConnectButton";

const Wallet = () => {

    //Wagmi
    const { address, isConnected } = useAccount();

    //Solution: Text content does not match server-rendered HTML.
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true); // Set the mounted state to true after the component has been mounted
        return () => setMounted(false); // Clean up when the component is unmounted
      }, []);

    return(
        <>
            <Navbar />

                <div className="flex justify-center">
                    {mounted && !isConnected && <ConnectButton />}
                    {mounted && isConnected && 
                        (
                        <div>

                            <h1 className="block bg-gray-500 rounded-md text-white px-5 py-2">{address}</h1>

                            {/* Display Wallet Owned NFTs */}
                            
                        </div>
                        )
                    }
                </div>

            <Footer />
        </>
    )
}

export default Wallet;