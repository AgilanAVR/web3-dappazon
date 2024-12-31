// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Dappazon {
    //state variables
    address public owner;

    //to store the data of the produncts
    struct Item{
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    //struct for holding the order
    struct Order{
        uint256 time;
        Item item;
    }

     //mapping for the strruct
     mapping(uint256 => Item) public items;
     mapping(address => uint256) public orderCount; //to hold the number of ordersby the single user
     mapping(address=>mapping(uint256=>Order)) public orders ;//single buyer can buy multiple products 

     //event
     event List(string name , uint256 cost , uint256 quantity);
     event Buy(address buyer , uint256 orderId , uint256 itemId);
    //modifiers

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }




    
    constructor(){
    owner=msg.sender;
    }



    //----------------------------listing the produncts
    function list(uint256 _id , string memory _name , string memory _category , string memory _image , uint256 _cost , uint256 _rating , uint256 _stock) public  onlyOwner{
    //create item struct
    Item memory item = Item(_id, _name , _category , _image , _cost , _rating , _stock );
    //adding the ietm to the mapping 
    items[_id]=item;
    //emit an event 
    emit List(_name , _cost , _stock);
    }




    //-------------------------buy products (the event is for one product)
    function buy(uint256 _id)public payable{
    //getting the product by using the id
    Item memory item =items[_id];
    //some requirements
    require(msg.value >= item.cost , "transaction failed");
    require(item.stock > 0,"out of stock");
    //assiging the order
    Order memory order = Order(block.timestamp , item);
    //add order for user
    orderCount[msg.sender]++;  //<-- order ID
    orders[msg.sender][orderCount[msg.sender]]=order;
    //reduce the stock
    items[_id].stock--;
    //emit event 
    emit Buy(msg.sender , orderCount[msg.sender], item.id);

    }

    //-----------------------withdraw funds
    function withdraw() public onlyOwner{
        (bool success,) = owner.call{value:address(this).balance}("");
        require(success);
    }

}
