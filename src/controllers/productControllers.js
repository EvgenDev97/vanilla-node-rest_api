import {findAll, findOne, addProduct} from "../models/productModel.js";


//@desc getAllProducts
// GET /api/products
export async function getProducts(req, res) {
    try{
        const products = await findAll()
        res.statusCode = 200
        res.setHeader("Content-Type", "application/json; charset=utf-8")
        res.end(JSON.stringify(products))
    }
    catch(err){

    }
}
//@desc get single product
// GET /api/product/:id

export async function getProduct(req,res,id){
    try{
        const product = await findOne(id)
        if(!product){
            res.writeHead(404,{"content-type":"application/json; charset=utf-8"})
            res.end(JSON.stringify({message:"PRODUCT not found"}))
        }else{
            res.writeHead(200,{"content-type":"application/json; charset=utf-8"})
            res.end(JSON.stringify(product))
        }

    }catch(err){
        console.log(err);
    }
}

export async function createProduct(req,res){

    let body = '';

    // Собираем данные из тела запроса
    req.on('data', (chunk) => {
        body += chunk;
    });

    // Обрабатываем запрос после получения всех данных
    req.on('end', async () => {
        try {
            // Парсим JSON из тела запроса
            const jsonData = JSON.parse(body);
            // Обрабатываем JSON данные
            const product = await addProduct(jsonData)

            // Отправляем ответ
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify( product));

        } catch (error) {
            // Обрабатываем ошибку парсинга
            console.error('Ошибка парсинга JSON:', error);
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Неверный JSON формат');
        }
    });
}
