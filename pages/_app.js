import "../styles/app.sass";

import { CreateLendProvider } from "../context/LendContext";

import { publicProvider } from "wagmi/providers/public";
import { WagmiConfig, createConfig, configureChains } from "wagmi";

// import { filecoinHyperspace, mainnet } from "@wagmi/core/chains";
// import { polygonMumbai, sepolia } from "wagmi/chains";
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

const okeChain = {
  id: 65,
  name: "OKExChain Testnet",
  network: "OKExChain Testnet",
  iconUrl: "https://example.com/icon.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "OKT",
    symbol: "OKT",
  },
  rpcUrls: {
    default: {
      http: ["https://exchaintestrpc.okex.org"],
    },
  },
  blockExplorers: {
    default: {
      name: "OKExChain Testnet",
      url: "https://www.oklink.com/oktc-test",
    },
    etherscan: {
      name: "OKExChain Testnet",
      url: "https://www.oklink.com/oktc-test",
    },
  },
  testnet: true,
};

const { chains, provider, publicClient, webSocketPublicClient } =
  configureChains(
    [okeChain],
    [
      jsonRpcProvider({
        rpc: (chain) => ({
          http: `https://exchaintestrpc.okex.org`,
        }),
      }),
    ]
  );

const config = createConfig({
  autoConnect: true,
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
