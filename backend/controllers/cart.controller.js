import Product from "../models/product.model.js";

export const addToCart = async (req,res)=>{
   try {
    const {productId} = req.body;
    const user = req.user;      //it is come from 

    const existingItem = user.cartItems.find(item => item.id === productId); 

    //if we have already products add quantity
    if(existingItem){
        existingItem.quantity += 1;
    
    //if we dont have product add first time
    }else{
        user.cartItems.push(productId);
    }

    await user.save();
    res.json(user.cartItems);
   } catch (error) {
    console.log("Error in Cart Controller addToCart",error.message);
    res.status(500).json({message:"Internal server error", error:error.message})
   }
};

export const RemoveAllFromCart = async (req,res)=>{
    try {
        const {productId} = req.body;
        const user = req.user;
        if(!productId){
            user.cartItems = [];
        }else{
            user.cartItems = user.cartItems.filter((item) => item.id !==productId); //we dont have anymore
        }
        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        console.log("Error in Cart Controller RemoveAllFromCart",error.message);
        res.status(500).json({message:"Internal server error", error:error.message})
    }
};
export const updateQuantity = async (req,res)=>{
    try {
        const {id: productId} = req.params;
        const {quantity} = req.body;
        const user = req.user;

        const existingItem = await user.cartItems.find((item)=> item.id === productId);

        if(existingItem){
            if(quantity ===0){
                user.cartItems = user.cartItems.filter((item) => item.id !== productId); //we dont have anymore
                await user.save();
                return res.json(user.cartItems);
            }
            existingItem.quantity = quantity;   //save current quantity;
            await user.save();
            res.json(user.cartItems);
        }
    } catch (error) {
        console.log("Error in Cart Controller updateQuantity",error.message);
        res.status(500).json({message:"Internal server error", error:error.message})
    }
}
export const getCartProducts = async (req,res)=>{
   try {
        const products = await Product.find({_id:{$in: req.user.cartItems}})    //just get user has cart items

        //add quantity for each product 
        const cartItems = products.map(product => {
            const item = req.user.cartItems.find(cartItem => cartItem.id === product.id);
            return {...product.toJSON(), quantity : item.quantity}      // convert to json format like copy original format without mongo documnet knowledge(CREATE NEW OBJECT)
        });

        res.json(cartItems);
   } catch (error) {
        console.log("Error in Cart Controller GetCardProducts",error.message);
        res.status(500).json({message:"Internal server error", error:error.message})
   }
}
