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
