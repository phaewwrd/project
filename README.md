# Server
## step1 
bash 
npm init -y 
## step 2 install nodemon 
bash
npm install express nodemon cors morgan bcryptjs jsonwebtoken zod prisma

## Step 3 Git 
bash
git init 
git add . 
git commit - m "your_message"
next step 
coy code from your repo
bash
git remote add origin https://github.com/Ratanon-Thongseekaew/CC19_front_to_back_api.git
git branch -M main
git push -u origin main


## Step 4 updates package.json 
```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start" : "nodemon index.js"
  },
```
and code index.js
```js
const express = require("express")
const app =express()

//start server
const PORT = 8000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
```

## Step 5 use middlewares
```js
const express = require("express")
const cors = require('cors')
const morgan = require('morgan')
const app =express()


//middlewares
app.use(cors()); // Allow cross Domain
app.use(morgan("dev")) //show log in Terminal
app.use(express.json()) // Read JSON

//Routing


const PORT = 8000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
```

## Step 6 
create Routes
```js

const express = require("express")
const router = express.Router()
const authController = require("../controller/auth-controller")

//@ENDPOINT http://localhoat:8000/api/register
router.post('/register', authController.register)
router.post('/login', authController.login)


module.exports = router

//create controller
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

```

## Step 7
create error.js

```js
const handleError = (err, req, res, next) => {
  res
  .status(err.status || 500)
  .json({ message: err.message || "Server Error!" });
};

module.exports = handleError;

```


WHen update code in Github
```bash
git add . 
git commit -m "message"
git push
```
## Step 8
/middlewares/validators.js
```js
const { z } = require("zod");

exports.registerScheme = z
  .object({
    email: z.string().email(),
    firstname: z
      .string()
      .min(3, "****Firstname must have at least 3 characters"),
    lastname: z.string().min(3, "****Lastname must have at least 3 characters"),
    password: z.string().min(6, "****Password must have at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, " Confirm Password have to be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Password not Match",
    path: ["confirmPassword"],
  });

exports.loginScheme = z.object({
  email: z.string().email(),
  password: z.string().min(6, "****Password must have at least 6 characters"),
});

//TEST Validator
exports.validateWithZod = (schema) => (req, res, next) => {
  try {
    console.log("hello, middlewares");
    schema.parse(req.body);
    next();
  } catch (error) {
    const errMsg = error.errors.map((el) => el.message);
    const errText = errMsg.join(",");
    const mergeError = new Error(errText);
    next(mergeError);
  }
};

```
and then update code 
/routes/auth-route.js
```js
router.post("/register", validateWithZod(registerScheme), authController.register
);
router.post("/login", validateWithZod(loginScheme), authController.login);
```