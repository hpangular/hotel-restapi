const jwt = require('jsonwebtoken');

module.exports =  function(req, res, next) {
    const token = req.header('auth_token');
    if (!token) return res.status(401).send('Unauthorised  please loginn agailn ');

    try {
       const verified =  jwt.verify(token,process.env.JWT_Token);
       req.user = verified;
       next();
    } catch (error) {
        res.send({
            message: error
        })
    }
}