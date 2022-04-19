import jwt from "jsonwebtoken";


const verifyToken = (req, res, next) => {
  console.log("it works");
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      console.log(user);
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

export const verifyTokenAndAdmin = (handler) => {
  return (req,res) => {

    const { method } = req;

    if (method === "GET") {
      return handler(req,res);
    }
    
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      // next();
      return handler(req,res);
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
}
};

// module.exports = {
//   verifyToken,
//   verifyTokenAndAuthorization,
//   verifyTokenAndAdmin,
// };
