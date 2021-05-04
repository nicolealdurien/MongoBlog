const jwt = require('jsonwebtoken')
require('dotenv').config()

function authenticate(req, res, next) {
    let headers = req.headers['authorization']
    if(headers) {
        const token = headers.split('')[1]
        console.log(token)
        const admin = jwt.verify(token, process.env.JWT_SECRET)
        if(admin) {
            const username = admin.username
            const authAdmin = Admin.findOne({username}).lean()
            if(authAdmin) {
                next()
            } else {
                res.json({error: 'Unable to authenticate.'})
            }
        } else {
            res.json({error: 'Unable to authenticate.'})
        }
    } else {
        res.json({error: 'Required headers are missing.'})
    }
}

module.exports = authenticate