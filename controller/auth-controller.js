const prisma = require("../configs/prisma");
const createError = require("../utils/createError");
const bcrypt = require("bcryptjs")

exports.register = async (req, res, next) => {
  try {
    //Step 1 req.body
    const { email, firstname, lastname, password, confirmPassword } = req.body;
    //Step 2 validate
    //----------------------------------------------------
    //Step 3 Check already
    const checkEmail = await prisma.profile.findFirst({
        where:{
            email: email,
        }
    })
    if(checkEmail){
        return createError(400, "Email is already exits")
    }    
    //----------------------------------------------------
    //Step 4 Encrypt bcrypt
    const hashedPassword = bcrypt.hashSync(password, 10)
    console.log(hashedPassword);
    //----------------------------------------------------
    //Step 5 Insert to DB
    const profile =await prisma.profile.create({
        data:{
            email: email,
            firstname: firstname,
            lastname: lastname,
            password: hashedPassword
        },
    })

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
