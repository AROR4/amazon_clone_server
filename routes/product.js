const express = require("express");
const auth = require("../middleware/auth");
const productRouter = express.Router();
const jwt=require("jsonwebtoken");
const {Product} = require("../models/product");

// /api/products:category=essentials
//let category=req.params.category

// /api/products?category=essentials
//let category=req.query.category
productRouter.get('/api/products',auth,async (req,res)=>{
    try {
        const products=await Product.find({category :req.query.category});
        res.json(products);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})
// api/products/search/I for getting i in names


productRouter.get('/api/products/search/:name',auth, async (req,res)=>{
    try {
        
        const products=await Product.find({name :{$regex :req.params.name,$options: "i"}});
        res.json(products);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

productRouter.post('/api/rate-product',auth,async (req,res)=>{
    try {
        const {id,rating}=req.body;
        let product=await Product.findById(id);
        for(let i=0;i<product.ratings.length;i++){
            if(product.ratings[i].userId==req.user){
                product.ratings.splice(i,1);    // delete from ith index and delete 1 element from there
                break;
            }
        }

        const ratingSchema={
            userId: req.user,
            rating,
        }
        product.ratings.push(ratingSchema);
        product=await product.save();
        res.json(product);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
})

productRouter.get("/api/deal-of-day", auth, async (req, res) => {
    try {
      let products = await Product.find({});
  
      products = products.sort((a, b) => {
        let aSum = 0;
        let bSum = 0;
  
        for (let i = 0; i < a.ratings.length; i++) {
          aSum += a.ratings[i].rating;
        }
        let arate=aSum/a.ratings.length;
  
        for (let i = 0; i < b.ratings.length; i++) {
          bSum += b.ratings[i].rating;
        }
        let brate=bSum/b.ratings.length;
        return arate < brate ? 1 : -1;
      });
  
      res.json(products[0]);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

module.exports=productRouter;