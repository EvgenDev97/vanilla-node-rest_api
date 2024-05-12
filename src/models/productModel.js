import fs from "fs";
import db from '../db.js'

let products = fs.readFileSync("db.json", "utf8")



export async function findAll(){
    const res = await db.query ("SELECT * FROM PRODUCTS")
    return res.rows;
}

export async function findOne(id){
    return JSON.parse(products).find(item => item.id === id);
}


export async function addProduct({name, price, description}) {
    const text = 'INSERT INTO PRODUCTS (name,price, description) VALUES($1, $2, $3) RETURNING *'
    const values = [name, price, description];
    const res = await db.query(text, values)
    return res.rows[0]
}



