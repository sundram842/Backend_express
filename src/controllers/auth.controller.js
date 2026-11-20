const { loggedIn, logoutApplication } = require('../services/auth.service');
const { fetchNewAccessToken } = require('../services/jwt.service')

const loggedInUser = async (req, res) => {
    const result = await loggedIn(req.body);
    return res.status(200).json({
        success: true,
        message: 'logged in successfully',
        data: result
    })
};

const newAccessToke = async (req, res) => {
    const result = await fetchNewAccessToken(req.body);
    return res.status(200).json({
        success: true,
        data: result
    })
}

const logout = async (req, res) => {
    const result = await logoutApplication(req.body);
    return res.status(200).json({
        success: true,
        data: result
    })
}



module.exports = { loggedInUser, newAccessToke,logout }