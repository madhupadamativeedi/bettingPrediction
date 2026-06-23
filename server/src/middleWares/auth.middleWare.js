const jwt = require("jsonwebtoken");
const authMiddleWare =async(req,res,next)=>{

   try{
     const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            msg:"Unauthorized"
        })
    };

    const decoded =  await jwt.verify(token, "madhu1234");

    req.user = decoded;
    next();
}catch(error){
    res.status(500).json({
        msg:"Something went wrong",
        err:error.message
    })

}
}

module.exports = authMiddleWare



// const authMiddleWare = async (req, res, next) => {
//   console.log("Cookies:", req.cookies);

//   try {
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({
//         msg: "Unauthorized",
//       });
//     }

//     const decoded = jwt.verify(token, "madhu1234");

//     console.log("Decoded:", decoded);

//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(500).json({
//       msg: "Something went wrong",
//       err: error.message,
//     });
//   }
// };