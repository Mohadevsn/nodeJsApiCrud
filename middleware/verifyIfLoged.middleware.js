

const verifyLogin = (req, res, next)=>{
    const token = req.cookies.token ;

    if(token){
        return res.status(401).json({message: "you already connected"});
    }

    next();
}


module.exports = verifyLogin