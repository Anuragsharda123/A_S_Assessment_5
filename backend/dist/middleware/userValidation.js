"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const joi_1 = __importDefault(require("joi"));
const unlinkfile_1 = require("./unlinkfile");
const validationSchema = joi_1.default.object({
    firstname: joi_1.default.string().empty().required().messages({
        'any.required': "First name is required bhai",
        'string.empty': "First name should be empty broooo."
    }),
    lastname: joi_1.default.string().empty().required().messages({
        'any.required': "First name is required bhai",
        'string.empty': "First name should be empty broooo."
    }),
    email: joi_1.default.string().empty().email().required().messages({
        'any.required': "First name is required bhai",
        'string.empty': "First name should be empty broooo.",
        'string.email': "Email should be Valid."
    }),
    phone: joi_1.default.string().empty().required().messages({
        'any.required': "First name is required bhai",
        'string.empty': "First name should be empty broooo."
    }),
    gender: joi_1.default.number().empty().required().messages({
        'number.empty': "Gender is required",
        'any.required': "Gender can't be set Empty"
    }),
    user_type: joi_1.default.number().empty().required().messages({
        'number.empty': "User type is required",
        'any.required': "User type can't be set Empty"
    }),
});
const Validator = (req, res, next) => {
    // console.log("Files------------", req.files,"\n\n")
    const { firstname, lastname, email, user_type, phone, gender } = req.body;
    const value = validationSchema.validate({ firstname, lastname, email, user_type, phone, gender });
    // console.log("Error:::::", error);
    // console.log("Value:::::", value);
    if (value.error) {
        // Extract custom error messages
        const errorMessages = value.error.details.map(err => err.message);
        const resume = req.files['resume'][0].path;
        const photo = req.files['profile_photo'][0].path;
        (0, unlinkfile_1.unLink)(resume, photo);
        return res.status(400).json({ errors: errorMessages });
    }
    else {
        next();
    }
};
exports.Validator = Validator;
