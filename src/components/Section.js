import { ethers } from 'ethers'

// Components
import Rating from './Rating'

const Section = ({ title, items, togglePop }) => {
    console.log(items)
    return (
        <div className='cards__section'>
            <h3 id={title}>{title}</h3>
             <hr />
             {items[0]? <><div className="cards">
                {items.map((item, i)=>{
                    return(
                        <div className="card" key={i} onClick={()=>{togglePop(item)}}>
                            <div className="card__image">
                                <img src={item.image} alt="Item" />
                            </div>
                            <div className="card__info">
                                <h4>{item.name}</h4>
                                <Rating value={item.rating}/>
                                <p>{ethers.utils.formatUnits(item.cost.toString(), "ether")} ETH</p>
                            </div>
                        </div>
                    )
                })}
             </div></>:<div style={{display:"flex", justifyContent:"center" , marginTop:'2em'}}>
             <p>Loading data...</p>
             </div>}


        </div>
    );
}

export default Section;