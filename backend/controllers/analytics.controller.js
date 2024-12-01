import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js"

export const getAnalyticsData = async() =>{

    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const salesData = await Order.aggregate([       //aggregate can able to filter and on the confusing datas processing in here we just use for GROUPING
        {
            $group:{
                _id:null,   //all documents together
                totalSales: {$sum:1},
                totalRevenue:{$sum:"$totalAmount"}  

            }   
        }
    ]);

    const {totalSales, totalRevenue} = salesData[0] || {totalSales:0, totalRevenue:0 };
    
    return {
        users:totalUsers,
        products:totalProducts,
        totalSales,
        totalRevenue,

    }

};


export const getDailySalesData =async(startDate, endDate)=>{
   try {
     const dailySalesData = await Order.aggregate([
        {
            $match:{
                createdAt: {
                    $gte:startDate,
                    lte: endDate,

                },
            },
        },
        {
            $group:{
                _id: {$dateToString: {format: "%Y-%m-%d", date:"$createdAt"}},
                sales: {$sum:1},
                revenue: {$sum : "$totalAmount"},
            },
        },
        {
            $sort:{_id:1}
        },
    ]);
   } catch (error) {
       console.log("Error in Analytic controller");
       resizeBy.status(500).json({
           message: "Server Error",
           error:error.message
       })
   }

    // [        examples of dailySalesData  
    //     {
    //         _id:"2024-08-18",
    //         sales:12,
    //         revenue:1450.75
    //     },
    //     {
    //         _id:"2024-08-19",
    //         sales:2,
    //         revenue:145.50
    //     }
    // ]

    const dateArray = getDatesInRange(startDate, endDate);
    // console.log(dateArray)

    return dateArray.map(date=>{
        const foundData = dailySalesData.find(item => item._id ===date);


        return {
            date,
            sales:foundData?.sales || 0,
            revenue : foundData?.revenue || 0,
        }
    })

};


function getDatesInRange(startDate, endDate){
    const dates = [];
    let currentDate = new Date(startDate);

    while(currentDate <= endDate){
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate() +1);

    }
}