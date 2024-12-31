import { useEffect, useState } from 'react'
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

// Components
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'

// ABIs
import Dappazon from './abis/dapp.json';

// Config
import config from './config.json'

function App() {
       
  //useStates
  const [account , setAccount]=useState(null);
  const [provider , setProvider]=useState(null);
  const [dappazoN , setDappazon]=useState(null);
  const [productData , setProductData]=useState([]);
  const [electronics , setElectronics]=useState([]);
  const [clothing , setClothing]=useState([]);
  const [toys , setToys]=useState([]);
  const [item , setItem]=useState([]);
  const [toggle , setToggle]=useState(false);

    //connecting to metamask
    const loadBlockChain=async()=>{
    
      //connecting to blockchain
      // const Provider=new ethers.providers.Web3Provider(window.ethereum)
      // setProvider(Provider);

      // const network=await Provider.getNetwork();

      const web3Modal = new Web3Modal(); //creating the instance of web3 modal
      const connection = await web3Modal.connect(); //connecting the user wallet
      const provider = new ethers.providers.Web3Provider(connection) //wrapping connection obj with the web3 provider
      const signer =await provider.getSigner(); //getting the account which is used to communicate with the contract

      //connecting to the smart contract
      const dappazon=new ethers.Contract( "0x3EC12C6ea96c6e1Cc2DDF65049bE19A02583D693",Dappazon ,signer);
      setDappazon(dappazon);
      console.log(dappazon);
      //load products;
      const items=[];
      for(var i=0;i<9;i++){
        const item=await dappazon.items(i+1);
        items.push(item);
      }
      const _electronics=items.filter((item)=>item.category ==="electronics")
      const _clothing=items.filter((item)=>item.category ==="clothing")
      const _toys=items.filter((item)=>item.category ==="toys")

      setElectronics(_electronics);
      setClothing(_clothing);
      setToys(_toys);
      }

const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true); 
    useEffect(()=>{
      if (typeof window.ethereum === 'undefined') { 
        setIsMetaMaskInstalled(false); 
      }else
      loadBlockChain();
    },[])

   

    //toggle funciton
    const togglePop=(item)=>{
    setItem(item);
    toggle?setToggle(false):setToggle(true);
    }


  return (
    <div>
      {isMetaMaskInstalled ?<>
        <Navigation account={account} setAccount={setAccount}/>
      <h2>Dappazon Best Sellers</h2>
      {electronics  && clothing && toys && (
        <>
        <Section title={"Clothing & Jewelry"} items={clothing} togglePop={togglePop}/>
        <Section title={"Electronics & Gadgets"} items={electronics} togglePop={togglePop}/>
        <Section title={"Toys & Gaming"} items={toys} togglePop={togglePop}/>
</>
      )}
      {toggle && (
        <>
        <Product item={item} provider={provider} account={account} togglePop={togglePop} dappazon={dappazoN}/>
        </>
      )}



      </>:<><p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', margin: 0 }}>Install Metamask to access this site.</p></>}
    </div>
  );
}

export default App;
