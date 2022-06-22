const jwt = require('jsonwebtoken')
const config = require('../config')

module.exports = (req, res, next) => {
    try {
        let token = req.cookies.token
        jwt.verify(token, config.jwtSecretKey, (err, payload) => {
            if(err) return res.json({code: -1, msg: err})
            console.log('=================token验证成功===================')
            req.user = payload
            next()
        })
    } catch (error) {
        res.clearCookie("token")
    }
}

    // const token = req.cookies.token
    // try {
    //     const user = jwt.verify(token,config.jwtSecretKey,(err,data) =>{
    //         if(err){
    //             res.send({
    //                 status:'0',
    //                 msg:'token 无效',
    //             })
    //         }else{
    //             req.user = user
    //             res.send({
    //                 status:'1',
    //                 msg:'验证成功',
    //                 token:token
    //             })
    //         }
    //     });
    //     next()
    // } catch (error) {
    //     // res.clearCookie("token");
    //     return res.redirect('/')
    // }