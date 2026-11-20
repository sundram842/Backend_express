const userRepository = require('../repositories/user.repository');

// req.body is undefined in Express 5 when no JSON body is sent
const registerUser = async ({ email, password } = {}) => {

    if(email === ''){
         const error = new Error('Email is required');
         error.status = 400;
         throw error;
    }

    if(password === ''){
         const error = new Error('password is required');
         error.status = 400;
         throw error;
    }

  const normalizeEmail = email.trim().toLowerCase();

  const existingUser = await userRepository.findByEmail(normalizeEmail);

  if (existingUser) {
    const error = new Error('User already registered');
    error.status = 409;
    throw error;
  }

  const user = await userRepository.createUser({
    email: normalizeEmail,
    passwordHash: password,
  });

  return user;
};

const getUser = async (limit, email)=>{
    const normalizeEmail = email.trim().toLowerCase();
    const user = await userRepository.getUser(limit,normalizeEmail);
    return user;
}

const userDetail = async (uuid)=>{
    const user = await userRepository.getUserDetail(uuid);
    return user;
}


module.exports = { registerUser, getUser, userDetail };
