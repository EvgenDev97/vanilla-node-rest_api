
import "dotenv/config.js";
import * as http from 'http'
import {getProducts, getProduct, createProduct} from "./controllers/productControllers.js"
import db from './db.js'
import {addProduct} from "./models/productModel.js";



const PORT = process.env.PORT


const server = http.createServer((req, res) => {
    if(req.url === "/api/products" && req.method === "GET") {
        return getProducts(req,res)
    }else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET") {
        const id =req.url.split("/")[3] //api/products/:id
        getProduct(req, res, id.toString()).then()
    }else if(req.url ="api/products" && req.method === "POST"){
        return createProduct(req,res)
    }
    else{
        res.writeHead(404, {"Content-Type": "application/json; charset=utf-8"})
        res.end(JSON.stringify({message:"Route not found"}))
    }
})



server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})