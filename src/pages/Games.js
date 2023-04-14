import Image from "next/image";
import Link from "next/link";

//components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


const Games = () => {
    return(
        <>
            <div className="flex flex-col h-screen justify-between">
            <Navbar />

            <div className="pt-10 flex justify-center">
                <div className="bg-[#DBE2EF] max-w-sm shadow-lg rounded-3xl overflow-hidden">
                    <Image
                      src="/images/Cave_preview.png"
                      width={960}
                      height={540}

                      priority
                      />
                    <div className="py-3 text-center">
                        <h1 className="text-[#112D4E] text-3xl font-bold">Game Name</h1>
                        
                        <div className="pt-3 flex justify-around">
                        <button type="button" className="font-bold py-3 px-2 rounded-2xl bg-[#112D4E] text-[#F9F7F7] hover:bg-[#FDD36A] hover:text-[#112D4E] transition-colors duration-300">
                            Download
                        </button>
                        
                        <button type="button" className="font-bold py-3 px-8 rounded-2xl bg-[#112D4E] text-[#F9F7F7] hover:bg-[#FDD36A] hover:text-[#112D4E] transition-colors duration-300">
                            <Link href="/MintGame01">
                                Mint
                            </Link>
                        </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            </div>
        </>
    )
}

export default Games;