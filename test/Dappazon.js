const { expect } = require("chai");
const { ethers } = require('hardhat');

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}


describe("Dappazon", () => {

  let dappazon;
  let deployer , buyer;

  beforeEach(async()=>{
    //setting up accounts from the ether
    [deployer,buyer]=await ethers.getSigners();

    //deploying the samrt contracts
    const Dappazon=await ethers.getContractFactory("Dappazon");
    dappazon=await Dappazon.deploy();
  })


  describe('Deployment',async()=>{
    it('returning owner address',async()=>{
      const owner =await dappazon.owner();
      expect(owner).to.equal(deployer.address);
    })
  })

  describe('Listing Products',async()=>{

  //assigning the data of the products

     beforeEach(async()=>{    
    const transaction = await dappazon.list(1 , "shoes" , "Clothing" , "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HubNgNfSZBx5Msztg/shoes.jpg" , tokens(1) , 4 , 5);
    await transaction.wait();

     })

     it("Returing products", async()=>{
      const item=await dappazon.connect(deployer).items(1);
      expect(item.id).to.equal(1);
      expect(item.name).to.equal("shoes");
      expect(item.category).to.equal("Clothing");
      expect(item.image).to.equal("https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HubNgNfSZBx5Msztg/shoes.jpg");
      expect(item.cost).to.equal(tokens(1));
      expect(item.rating).to.equal(4);
      expect(item.stock).to.equal(5);

     })
  })


    describe("Buying",async()=>{
      beforeEach(async()=>{    
        let transaction = await dappazon.connect(deployer).list(1 , "shoes" , "Clothing" , "https://ipfs.io/ipfs/QmTYEboq8raiBs7GTUg2yLXB3PMz6HubNgNfSZBx5Msztg/shoes.jpg" , tokens(1) , 4 , 5);
        await transaction.wait();

        transaction =await dappazon.connect(buyer).buy(1 , {value:tokens(1)});
        await transaction.wait();
    
         })

         it('updates the contract balance',async()=>{
          const balance=await ethers.provider.getBalance(dappazon.address);
          expect(balance).to.equal(tokens(1));
         })

         it('order count updated',async()=>{
          const order_count=await dappazon.orderCount(buyer.address);
          expect(order_count).to.equal(1);
         })

         it('stock updated',async()=>{
          const item=await dappazon.items(1);
          expect(item.stock).to.equal(4);
         })

         it('retriving order',async()=>{
          const  order=await dappazon.orders(buyer.address,1);
          expect(order.item.name).to.equal("shoes");
         })



    })

})