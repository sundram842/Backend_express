const authRepository = require('../repositories/auth.repository');
const { generateAccessToken, generateRefreshToken, verifyAccessToken, } = require('../services/jwt.service');
const {setRefreshToken,logout} = require('../repositories/auth.repository')

const loggedIn = async ({ email, password }) => {
    if (email === '') {
        const error = new Error('Email is required');
        error.status = 400;
        throw error;
    }

    if (password === '') {
        const error = new Error('Password is required');
        error.status = 400;
        throw error;
    }

    const isEmailValid = await authRepository.findEmail(email, password);


    if (!isEmailValid) {
        const error = new Error('Invalid credanctional');
        error.status = 400;
        throw error;
    }

    const jwtToken = await generateAccessToken(isEmailValid);
    const jwtRToken = await generateRefreshToken(isEmailValid);

    if(jwtRToken){
        const refersToken = await setRefreshToken(isEmailValid.id,jwtRToken)
    }




    return {
        id: isEmailValid.id,
        email: isEmailValid.email,
        accessToken: jwtToken,
        refreshToken: jwtRToken
    }




}

const logoutApplication = async(token)=>{

    const t = token.token.split(' ')[1];
    const result = logout(t);
    return {
        message: "logout successfully",
        data: result
    }

}

module.exports = { loggedIn,logoutApplication };
