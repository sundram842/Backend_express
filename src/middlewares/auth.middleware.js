const {verifyAccessToken} = require('../services/jwt.service')

const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access token is required'
            })
        }

        const token = authHeader.split(' ')[1];

        const decode = verifyAccessToken(token);

        req.user = {
            id:decode.user_id
        }

         next();

    } catch (error) {

        return res.status(400).json({
            success: false,
            message: 'Invalid or expired access token'
        })

    }

}

module.exports = authenticate 