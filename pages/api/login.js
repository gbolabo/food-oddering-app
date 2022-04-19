import cookie from "cookie";
import dbConnect from "../../util/mongo";
import User from "../../models/User";
import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken';


const handler = async (req, res) =>  {
  if (req.method === "POST") {
   await dbConnect();

console.log(req.body.email);
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    !user && res.status(401).json("Wrong credentials!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    OriginalPassword !== req.body.password &&
      res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {expiresIn:"3d"}
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", accessToken, {
        maxAge: 60 * 60,
        sameSite: "strict",
        path: "/",
      })
    );

    const { password, ...others } = user._doc;
console.log(user._doc);
    res.status(200).json({...others, accessToken});
  }
};


// const handler = (req, res) => {
//   if (req.method === "POST") {
//     const { username, password } = req.body;
//     if (
//       username === process.env.ADMIN_USERNAME &&
//       password === process.env.ADMIN_PASSWORD
//     ) {
//       res.setHeader(
//         "Set-Cookie",
//         cookie.serialize("token", process.env.TOKEN, {
//           maxAge: 60 * 60,
//           sameSite: "strict",
//           path: "/",
//         })
//       );
//       res.status(200).json("Succesfull");
//     } else {
//       res.status(400).json("Wrong Credentials!");
//     }
//   }
// };




export default handler;
