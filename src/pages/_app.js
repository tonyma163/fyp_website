import '@/styles/globals.css'

//WalletConnect
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { bscTestnet } from 'wagmi/chains'

//1. Get projectId from the WalletConnect Cloud
const projectId = "05be202340d5236a186aeaee64eda792";

//2. Configure wagmi client
const chains = [ bscTestnet ];

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})

//3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiClient, chains)

//4. Wrap app with WagmiProvider
export default function App({ Component, pageProps }) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Component {...pageProps} />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  )
}
