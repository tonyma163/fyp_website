//react
import { useState, useEffect } from "react";

//next
import Link from "next/link";

//web3modal
import { useWeb3Modal } from "@web3modal/react";

//wagmi
import { useAccount, useDisconnect } from "wagmi";
import { useNetwork, useSwitchNetwork } from 'wagmi'

const ConnectButton = () => {

    //Solution: Text content does not match server-rendered HTML.
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true); // Set the mounted state to true after the component has been mounted
        return () => setMounted(false); // Clean up when the component is unmounted
      }, []);

    const [loading, setLoading] = useState(false);
    const { open } = useWeb3Modal();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    //Solution: Text content does not match server-rendered HTML.
    //use the mounted state with the isConnected state.
    const label = mounted && isConnected
    ? address.substring(0, 3) + "..." + address.substring(address.length - 3)
    : "Connect";

    async function onOpen() {
        setLoading(true);
        await open();
        setLoading(false);
      }

    function onClick() {
        if (isConnected) {
            CopyAddress();
        } else {
            onOpen();
        }
    }

    function Disconnect() {
        if (isConnected)
            disconnect();
    }

    function CopyAddress() {
        if (typeof navigator !== 'undefined') {
          // Copying...
          navigator.clipboard.writeText(address);
      
          // Alert
          alert("Address Copied!");
        }
    }

    //Wagmi
    //SwitchNetwork
    //https://wagmi.sh/react/hooks/useSwitchNetwork
    const { chain } = useNetwork();
    const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();
    
    return(
        <>
          <div className="group flex flex-row sm:flex-col sm:justify-end gap-3 sm:gap-0 pl-5 sm:pl-0">
            {mounted && !isConnected &&
              <button
                onClick={onClick}
                className="py-1 px-5 bg-[#FDD36A] rounded-md text-[#112D4E] font-bold hover:bg-[#112D4E] hover:text-white transition duration-600 ease-in-out"
                disabled={loading}>
                  {label}
              </button>
            }
            
            
            {mounted && isConnected && (
            <>
              
              {chains.map((x) => (
                <div key={x.id}>
                  {/*Connect && WrongChain*/}
                  <button
                    onClick={() => switchNetwork?.(x.id)}
                    className="py-1 px-5 bg-[#FDD36A] rounded-md text-[#112D4E] font-bold hover:bg-[#112D4E] hover:text-white transition duration-600 ease-in-out"
                    disabled={loading}
                    hidden={x.id === chain?.id}>
                      {x.id !== chain?.id && !isLoading && "Wrong Network"}
                      {isLoading && pendingChainId === x.id && 'Switching'}
                      {x.id === chain?.id && !isLoading && label}
                  </button>
                  
                  {/*Connect && CorrectChain*/}
                  {x.id === chain?.id &&
                  <>
                  <div className="group flex flex-row sm:flex-col sm:justify-end gap-3 sm:gap-0 pl-5 sm:pl-0">
                    <button
                      onClick={onClick}
                      className="py-1 px-5 bg-[#FDD36A] rounded-md text-[#112D4E] font-bold hover:bg-[#112D4E] hover:text-white transition duration-600 ease-in-out"
                    >
                      {loading ? "Loading..." : label}
                    </button>
                    
                    {/*Desktop*/}
                    <div className="hidden sm:block">
                      <div className="hidden group-hover:block absolute h-auto">
                        <ul className="py-1">
                          <li className="py-1">
                            <Link
                              href="/Wallet"
                              className="py-1.5 px-5 bg-[#112D4E] rounded-md text-white font-bold hover:bg-[#FDD36A] hover:text-[#112D4E] transition duration-600 ease-in-out">
                                Wallet
                            </Link>
                          </li>
                          
                          <li className="py-1">
                            <button
                              onClick={Disconnect}
                              className="py-1 px-3 bg-[#112D4E] rounded-md text-white font-bold hover:bg-[#FDD36A] hover:text-[#112D4E] transition duration-600 ease-in-out">
                                Disconnect
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    {/*Mobile*/}
                    <div className="sm:hidden pt-1">
                      <Link
                        href="/Wallet"
                        className="py-1.5 px-5 bg-[#112D4E] rounded-md text-white font-bold hover:bg-[#FDD36A] hover:text-[#112D4E] transition duration-600 ease-in-out">
                          Wallet
                      </Link>
                    </div>
                    
                    <div className="sm:hidden">
                      <button
                        onClick={Disconnect}
                        className="py-1 px-5 bg-[#112D4E] rounded-md text-white font-bold hover:bg-[#FDD36A] hover:text-[#112D4E] transition duration-600 ease-in-out">
                          Disconnect
                      </button>
                    </div>
                  </div>
                  </>}
                </div>
              ))}
            </>
            )}
          </div>
        </>
    )
}

export default ConnectButton;