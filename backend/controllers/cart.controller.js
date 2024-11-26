
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
    
   }
};

export const getCartProducts = async (req,res)=>{
    
}
export const RemoveAllFromCart = async (req,res)=>{

}
export const updateQuantity = async (req,res)=>{

}
