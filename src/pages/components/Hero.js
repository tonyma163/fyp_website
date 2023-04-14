import Link from "next/link";

const Hero = () => {
    return(
        <>
            <div className="py-32 bg-[#DBE2EF] text-[#112D4E]">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-4">The Next Generation Gaming Platform</h1>
                <p className="pb-8 text-xl mb-8">Play, win, and own with web3 gaming</p>
                <button className="font-bold py-3 px-8 rounded-md bg-[#112D4E] text-[#F9F7F7] hover:bg-[#FDD36A] hover:text-[#112D4E] transition-colors duration-300">
                    <Link href="/Games">
                        Our Games
                    </Link>
                </button>
            </div>
            </div>
        </>
    )
}

export default Hero;