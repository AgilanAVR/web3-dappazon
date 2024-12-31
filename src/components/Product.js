import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Rating from './Rating'

import close from '../assets/close.svg'

const Product = ({ item, provider, account, togglePop,dappazon }) => {
   
   const [order , setOrder]=useState(null);
   const [hasBought , sethasBought]=useState(false);




    const fetchDetails=async()=>{
      const events=await dappazon.queryFilter("Buy");
      const orders=events.filter(
        (event)=>event.args.buyer===account && event.args.itemId.toString()===item.id.toString()
      )

      if(orders.length===0) return
      const order=await dappazon.orders(account , orders[0].args.orderId);
      setOrder(order);


    }


   const buyHandler=async()=>{  
    let transaction=await dappazon.buy(item.id , {value:item.cost})
    await transaction.wait();
    sethasBought(true);
   }


  useEffect(()=>{
    fetchDetails();
  },[hasBought])
   
  return (
    <div className="product">
         <div className="product__details">
          <div className="product__image">
            <img src={item.image} alt="Product" />
          </div>
          <div className="product__overview">
           <h1>{item.name}</h1>
           <Rating value={item.rating}/>
           <hr />
           <p>{item.address}</p>
           <h2>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h2>
           <hr />
           <h2>Overview</h2>
           <p>{item.description}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque qui dolor rem, iusto corporis tempore repellendus inventore maiores voluptatem culpa?
           </p>

          </div>
          <div className="product__order">
          <h1>{ethers.utils.formatUnits(item.cost.toString(), 'ether')} ETH</h1>
          <p>
            FREE delivery <br />
            <strong>
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})}
            </strong>
          </p>
          {item.stock > 0?(
            <><p style={{color:"green"}}>In Stock &gt;&gt; {`${item.stock}`}</p></>
          ):(
            <><p style={{color:"red"}}>Out of Stock.</p></>
          )}
          {
            item.stock >0?(
              <button type="button" className="product__buy" onClick={()=>{buyHandler()}}>Buy Now</button>
            ):(
              <button type="button" className="product__buy" >Notify Stock</button>
            )
          }

          <p><small>Ships from</small> Dapazon</p>
          <p><small>Sold by</small> Dapazon</p>

          {
            order && (
              <div className="product__bought">
                Item bought on <br />
                <strong>
                  {new Date(Number(order.time.toString()+ "000")).toLocaleDateString(
                    undefined,{
                      weekday:"long",
                      hour:"numeric",
                      minute:'numeric',
                      second:'numeric'
                    }
                  )}
                </strong>
              </div>
            )
          }
          </div>

          <button onClick={togglePop} className="product__close">
            <img src={close} alt="" />
          </button>
         </div>
    </div >
  );
}

export default Product;