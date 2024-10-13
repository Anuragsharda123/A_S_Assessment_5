import { NextFunction } from 'express';
import joi from 'joi';
import { unLink } from './unlinkfile';

const validationSchema = joi.object({

    firstname: joi.string().empty().required().messages({
        'any.required': "First name is required bhai",
        'string.empty': "First name should be empty broooo."
    }),
    lastname: joi.string().empty().required().messages({
        'any.required': "First name is required bhai",
        'string.empty': "First name should be empty broooo."
    }),
    email: joi.string().empty().email().required().messages({
        'any.required': "First name is required bhai",
        'string.empty': "First name should be empty broooo.",
        'string.email': "Email should be Valid."
    }),
    phone: joi.string().empty().required().messages({
        'any.required': "First name is required bhai",
        'string.empty': "First name should be empty broooo."
    }),
    gender: joi.number().empty().required().messages({
        'number.empty': "Gender is required",
        'any.required': "Gender can't be set Empty"
    }),
    user_type: joi.number().empty().required().messages({
        'number.empty': "User type is required",
        'any.required': "User type can't be set Empty"
    }),
})

export const Validator = (req:any, res:any, next:NextFunction) => {

    // console.log("Files------------", req.files,"\n\n")
    const {firstname, lastname, email, user_type, phone, gender} = req.body;
    const value = validationSchema.validate({firstname, lastname, email, user_type, phone, gender});

    // console.log("Error:::::", error);
    // console.log("Value:::::", value);

  if(value.error) {
    // Extract custom error messages
    const errorMessages = value.error.details.map(err => err.message);
    
    const resume = req.files['resume'][0].path
    const photo = req.files['profile_photo'][0].path;
    
    
    unLink(resume, photo);
    return res.status(400).json({ errors: errorMessages });
  }
  else{
    next();
  }
}