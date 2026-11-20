
const jwt = require('jsonwebtoken');
const {getRefreshToken} = require('../repositories/auth.repository');
const {getUserDetail} = require("../repositories/user.repository")

const generateAccessToken = (user) => {

    if (!user || !user.id || !user.email) {
        throw new Error('Valid user information is required to generate access token')
    }

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
        throw new Error('secret key is not configured')
    }

    const payload = {
        email: user?.email
    }

    const options = {
        algorithm: 'HS256',
        subject: String(user.id),
        expiresIn: process.env.JWT_EXPIRES_IN || '15m',
        issuer: process.env.JWT_ISSUER || 'inventory-api',
    };

    return jwt.sign(payload, secretKey, options);

}

const generateRefreshToken = (user) => {

    if (!user || !user.id || !user.email) {
        throw new Error('Valid user information is required to generate access token')
    }

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
        throw new Error('secret key is not configured')
    }

    const payload = {
        email: user?.email
    }

    const options = {
        algorithm: 'HS256',
        subject: String(user.id),
        expiresIn: '15d',
        issuer: process.env.JWT_ISSUER || 'inventory-api',
    };

    return jwt.sign(payload, secretKey, options);

}

const verifyAccessToken = (token) => {
    try {
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        return decode;

    } catch (error) {
        throw new Error('Invalid or expired refresh token');
    }


}

const verifyRefreshToken = (token) => {
    try {
        const decode = jwt.verify(
            token,
            process.env.JWT_SECRET
        )
        return decode;

    } catch (error) {
        throw new Error('Invalid or expired refresh token');
    }
}

const fetchNewAccessToken = async(req) => {
    try {

        const token = req.token.split(' ')[1];

        if (!token) {
            throw new Error('Refresh token is required')
        }
        verifyRefreshToken(token);
        const refreshToken = await getRefreshToken(token);
        if(refreshToken.revoked_at !== null){
           throw new Error('Refresh token is not valid')
        }
        const userDetail = await getUserDetail(refreshToken.user_id);

        const newAccessToken = generateAccessToken(userDetail)

        return newAccessToken;

    } catch (error) {
        throw new Error('unable to generate new access token');

    }

}


module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    fetchNewAccessToken
};