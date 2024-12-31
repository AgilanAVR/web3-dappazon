import { ethers } from "ethers";

const Navigation = ({ account, setAccount }) => {


  const networks = {
    sepolia: {
      chainId: `0x${Number(11155111).toString(16)}`,
      chainName: "Sepolia",
      nativeCurrency: {
        name: "SepoliaETH",
        symbol: "SepoliaETH",
        decimals: 18,
      },
      rpcUrls: ["https://sepolia.infura.io/v3/"],
      blockExplorerUrls: ["https://sepolia.etherscan.io"],
    },
    holesky: {
      chainId: `0x${Number(17000).toString(16)}`,
      chainName: "Holesky",
      nativeCurrency: {
        name: "holesky",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ankr.com/eth_holesky"],
      blockExplorerUrls: ["https://holesky.etherscan.io/"],
    },
    polygon_amoy: {
      chainId: `0x${Number(80002).toString(16)}`,
      chainName: "Polygon Amoy",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc-amoy.polygon.technology/"],
      blockExplorerUrls: ["https://www.oklink.com/amoy"],
    },
    polygon_mumbai: {
      chainId: `0x${Number(80001).toString(16)}`,
      chainName: "Polygon Mumbai",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
      blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
    },
    polygon: {
      chainId: `0x${Number(137).toString(16)}`,
      chainName: "Polygon Mainnet",
      nativeCurrency: {
        name: "MATIC",
        symbol: "MATIC",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ankr.com/polygon"],
      blockExplorerUrls: ["https://polygonscan.com/"],
    },
    bsc: {
      chainId: `0x${Number(56).toString(16)}`,
      chainName: "Binance Smart Chain Mainnet",
      nativeCurrency: {
        name: "Binance Chain Native Token",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ankr.com/bsc"],
      blockExplorerUrls: ["https://bscscan.com"],
    },
    base_mainnet: {
      chainId: `0x${Number(8453).toString(16)}`,
      chainName: "Base Mainnet",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://mainnet.base.org/"],
      blockExplorerUrls: ["https://bscscan.com"],
    },
    base_sepolia: {
      chainId: `0x${Number(84532).toString(16)}`,
      chainName: "Base Sepolia",
      nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
      },
      rpcUrls: ["https://sepolia.base.org"],
      blockExplorerUrls: ["https://bscscan.com"],
    },
    localhost: {
      chainId: `0x${Number(31337).toString(16)}`,
      chainName: "localhost",
      nativeCurrency: {
        name: "GO",
        symbol: "GO",
        decimals: 18,
      },
      rpcUrls: ["http://127.0.0.1:8545/"],
      blockExplorerUrls: ["https://bscscan.com"],
    },
  };

  //function to chmage the network
const changeNetwork = async ({ networkName }) => {  
  try {
    //we are going to check , if the crypto wallrt is present in the computer or not , if the user install any of teh wallet , the etherum onbect will be pushed in the computer
    if (!window.ethereum) throw new Error("No Crtpto Wallet is Found");
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          ...networks[networkName],
        },
      ],
    });
  } catch (error) {
    console.log(error.message);
  }
};

const handleNetworkSwitch = async () => {
  const networkName = "holesky";
  await changeNetwork({ networkName });
};



  const ConnectHandler = async () => {
    await handleNetworkSwitch();
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const _account = ethers.utils.getAddress(accounts[0]);
    setAccount(_account);
  };

  return (
    <nav>
      <div className="nav__brand">
        <h1>Dappazon</h1>
      </div>

      <input type="text" className="nav__search" />

      {account ? (
        <button type="button" className="nav__connect">
          {account.slice(0, 6) + "..." + account.slice(38, 42)}
        </button>
      ) : (
        <button className="nav__connect" onClick={ConnectHandler}>
          Connect
        </button>
      )}

      <ul className="nav__links">
        <li>
          <a href="#">Clothings & Jewelry</a>
        </li>
        <li>
          <a href="#">Electronics & Gadgets</a>
        </li>
        <li>
          <a href="#">Toys & Gaming</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
