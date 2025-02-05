const createError = require("../utils/createError");

exports.register = (req, res, next) => {
  try {
    //code
    //Step 1 req.body
    const { email, firstname, lastname, password, confirmPassword } = req.body;
    //Step 2 validate
    if(!email){
        return createError(400, "Email is required")
    }
    if(!firstname){
        return createError(400, "Firstname is required")
    }
    //Step 3 Check already
    //Step 4 Encrypt bcrypt
    //Step 5 Insert to DB
    //Step 6 Response

    res.json({ message: "Hello, Register" });
  } catch (error) {
    console.log(error);
    next(error)
  }
};

exports.login = (req, res, next) => {
  try {
    res.json({ message: "Hello, Login" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
