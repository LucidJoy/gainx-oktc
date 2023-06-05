import "../styles/app.sass";

import { CreateLendProvider } from "../context/LendContext";

import { publicProvider } from "wagmi/providers/public";
import { WagmiConfig, createConfig, configureChains } from "wagmi";

// import { filecoinHyperspace, mainnet } from "@wagmi/core/chains";
import { polygonMumbai, sepolia } from "wagmi/chains";
import { alchemyProvider } from "@wagmi/core/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
// import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
// import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import {
  ConnectKitProvider,
  ConnectKitButton,
  getDefaultClient,
} from "connectkit";
// import { filecoinHyperspace, polygonMumbai } from "wagmi/chains";

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [filecoinHyperspace],
//   [
//     alchemyProvider({ apiKey: "9QZyJkzDMZ95NefvJWxJHgFB2ohU6ka9" }),
//     publicProvider,
//   ]
// );

// const connector = new MetaMaskConnector({
//   chains: [filecoinHyperspace],
// });

const theta = {
  id: 365,
  name: "Theta",
  network: "theta",
  iconUrl: "https://example.com/icon.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Theta",
    symbol: "TFUEL",
  },
  rpcUrls: {
    default: {
      http: ["https://eth-rpc-api-testnet.thetatoken.org/rpc"],
    },
  },
  blockExplorers: {
    default: {
      name: "Theta MetaChain",
      url: "https://explorer.thetatoken.org/",
    },
    etherscan: {
      name: "Theta MetaChain",
      url: "https://explorer.thetatoken.org/",
    },
  },
  testnet: false,
};

const { chains, provider, publicClient, webSocketPublicClient } =
  configureChains(
    [polygonMumbai, sepolia],
    [
      jsonRpcProvider({
        rpc: (chain) => ({
          http: `https://eth-rpc-api-testnet.thetatoken.org/rpc`,
        }),
      }),
    ]
  );

const config = createConfig({
  autoConnect: false,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});

// const client = createClient({
//   autoConnect: true,
//   connectors: [
//     new MetaMaskConnector({ chains }),
//     new CoinbaseWalletConnector({
//       chains,
//       options: {
//         appName: "NftLend",
//       },
//     }),
//     new WalletConnectConnector({
//       chains,
//       options: {
//         qrcode: true,
//       },
//     }),
//   ],
//   provider,
// });

export default function App({ Component, pageProps }) {
  return (
    <CreateLendProvider>
      <WagmiConfig config={config}>
        <ConnectKitProvider>
          <Component {...pageProps} />
        </ConnectKitProvider>
      </WagmiConfig>
    </CreateLendProvider>
  );
}
