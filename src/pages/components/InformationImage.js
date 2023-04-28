//next
import Image from "next/image";

const InformationImage = () => {
    return(
        <>
        <div className="py-8 px-4 bg-[#F9F7F7]">
        <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
                <h2 className="text-[#112D4E] text-4xl font-bold mb-6">Why Choose Web3 Gaming</h2>
                <p className="text-[#112D4E] mb-4">Web3 gaming platforms offer superior advantages over traditional gaming platforms thanks to their utilization of blockchain technology, which guarantees fairness and security.</p>
                <p className="text-[#112D4E] mb-4">Moreover, players have ownership of in-game assets that can be traded, as well as access to a decentralized infrastructure that provides global competition opportunities.</p>
                <p className="text-[#112D4E]">Overall, web3 gaming platforms offer innovative and rewarding gaming experiences that traditional gaming platforms cannot provide.</p>
            </div>
            <div>
                <Image
                  src="/images/oldbro.jpg"
                  width={600}
                  height={600}
                />
            </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default InformationImage