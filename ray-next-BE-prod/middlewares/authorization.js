const errorResponse = require("../Utils/errorResponse.js");
var jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      throw Error("token not found")
    }
    token = token.split(" ")[1];
    
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) {
          console.log(err)
          return res
            .status(403)
            .json({ message: err });
        }
        if(decoded){
          req.decoded = decoded;
        }
        
        if(!err){
          next()
        }
      });

    
      
  } catch (error) {
    return errorResponse(res,401,error.message)
  }
};

module.exports = authorization;