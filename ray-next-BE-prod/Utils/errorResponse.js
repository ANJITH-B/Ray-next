const errorResponse =(res,statuscode,message,data)=>{
    return res.status(statuscode).json({message,data})
}

module.exports = errorResponse;