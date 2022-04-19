import dbConnect from "../../../util/mongo";
import User from "../../../models/User";
import CryptoJS from "crypto-js";
import { Jwt } from "jsonwebtoken";
export default async function handler(req, res) {
  const { method, cookies } = req;

  const token = cookies.token

  dbConnect();

  if (method === "GET") {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  if (method === "POST") {
    // if(!token || token !== process.env.token){
    //   return res.status(401).json("Not authenticated!")
    // }
    
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        isAdmin: req.body.isAdmin,
        Address: req.body.Address,
        password: CryptoJS.AES.encrypt(
          req.body.password,
          process.env.PASS_SEC
        ).toString(),
      });
      
      try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      } catch (err) {
        res.status(500).json(err);
      }

  }
}
