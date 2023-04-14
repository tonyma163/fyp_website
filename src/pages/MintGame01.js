import Image from "next/image";

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const MintGame01 = () => {
    return(
        <>
            <div className="flex flex-col h-screen justify-between">
            <Navbar />

            <p className="py-3 px-10 text-center font-bold italic">INSTRUCTION: Each account only could own ONE type of NFTs</p>

            <div className="lg:flex lg:justify-evenly">
            <div className="py-10 flex justify-center">
                <div className="bg-[#DBE2EF] max-w-sm shadow-lg rounded-3xl overflow-hidden">
                    <Image
                      src="/images/oldbro.jpg"
                      width={960}
                      height={540}

                      priority
                      />
                    <div className="py-3 text-center">
                        <h1 className="text-[#112D4E] text-3xl font-bold">Type1</h1>
                        
                        <div className="pt-3 flex justify-around">
                        <button type="button" className="font-bold py-3 px-8 rounded-2xl bg-[#112D4E] text-[#F9F7F7] hover:bg-[#FDD36A] hover:text-[#112D4E] transition-colors duration-300">
                                Mint
                        </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-10 flex justify-center">
                <div className="bg-[#DBE2EF] max-w-sm shadow-lg rounded-3xl overflow-hidden">
                    <Image
                      src="/images/oldbro.jpg"
                      width={960}
                      height={540}

                      priority
                      />
                    <div className="py-3 text-center">
                        <h1 className="text-[#112D4E] text-3xl font-bold">Type2</h1>
                        
                        <div className="pt-3 flex justify-around">
                        <button type="button" className="font-bold py-3 px-8 rounded-2xl bg-[#112D4E] text-[#F9F7F7] hover:bg-[#FDD36A] hover:text-[#112D4E] transition-colors duration-300">
                                Mint
                        </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            <Footer />
            </div>
        </>
    )
}

export default MintGame01;