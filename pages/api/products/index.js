import dbConnect from "../../../util/mongo";
import Product from "../../../models/Product";
import {verifyTokenAndAdmin} from "../verifyTokenproducts";

// async function handler(req, res) {
const handler = async (req, res) => {
  // const { method, cookies } = req;
  // const token = cookies.token
  const { method } = req;
  dbConnect();

  if (method === "GET") {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    // if(!token || token !== process.env.token){
    //   return res.status(401).json("Not authenticated!")
    // }
    console.log("uptil here");
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

export default verifyTokenAndAdmin(handler);