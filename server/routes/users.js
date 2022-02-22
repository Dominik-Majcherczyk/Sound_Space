import express from "express";
import { signin, signup, getUser } from "./../controllers/user.js";
import { body, validationResult } from "express-validator";
const router = express.Router();

router.post("/signin", signin);
router.post(
  "/signup",
  body("email").isEmail().withMessage('must be a valid email format'),
  body("firstName").isLength({ min: 1 }).withMessage('Name must be at least 1 chars long'),
  body("lastName").isLength({ min: 1 }).withMessage('Last name must be at least 1 chars long'),
  body("password").isLength({ min: 5 }).withMessage('Password must be at least 5 chars long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
  signup
);
router.get("/:id", getUser);
export default router;
