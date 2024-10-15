import User from "../model/userModel";
import { Response } from "express";
import bcrypy from 'bcrypt';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken'
import Hobby from "../model/userHobby";
import { Local } from "../environment/config";

const secret = Local.Secret_Key;


// post request
export const addUser = async(req:any, res:Response) => {
    try{
        console.log("Helllo.....")
        const {firstname, lastname, email, user_type, phone, gender, agency, hobbies} = req.body;
        const hobby = hobbies.split(",");
        const sysGenPass = String(Math.round(Math.random()*100000000));
        const password = await bcrypy.hash(sysGenPass, 10)
        var user:boolean|any = false
        
        if(user_type==1)
        {
            user = await User.create({ firstname, lastname, email, password, user_type, phone, gender, profile_photo: req.files['profile_photo'][0].path });
        } else {
            user = await User.create({firstname, lastname, email, password, user_type, phone, gender, profile_photo: req.files['profile_photo'][0].path, resume: req.files['resume'][0].path, AgencyId:agency});
        }

        hobby.map( async(hobby:any)=>{
            await Hobby.create({hobby, UserId:user.id})
        })

        if (user){
            sendMailToUser(user.email, sysGenPass);
            res.status(200).json({"message":"Data Saved Sucessfully........."});
        }
        else{
            res.status(401).json({"error":"Saving data failed......."})
        }
    }
    catch(err){
        res.status(500).json({"error": `Something Went Wrong......   ${err}`});
    }
}

// post request
export const userLogin = async(req:any, res:Response) => {
    try{
        const {email, password, user_type} = req.body;

        const user = await User.findOne({where:{email: email, user_type: user_type}});

        if(user){
            const isPassValid = await bcrypy.compare(password, user.password);
            
            if(isPassValid){
                const token = jwt.sign({user}, secret);
                res.status(200).json({user:user, token:token});
                console.log("User login successful");
            } else {
                res.status(401).json({"error": "Invalid Credentials"});
            }
        } else {
            res.status(401).json({"error":"User doesn't exist"});
        }
    }
    catch(err){
        res.status(500).json({"error":`Error logging in: ${err}`});
    }
}

// post request
export const updatePass = async(req:any, res:Response) => {
    try{
        const id = req.user.user.id;
        console.log("Helllllllllll-----------", id)
        var user = await User.findByPk(id);
        const password = await bcrypy.hash(req.body.password, 10);
        // const password = req.body.password;

        if(user){
            if(user.is_active)
            {
                user = await user.update({ password:password });
            }
            else{
                user = await user.update( { password:password, is_active:true } );
            }
            
            console.log("Updated Data----------", user)
            if(user){
                res.status(200).json({message:"User Status Active Successfully", user: user});                
            }
            else{
                res.status(400).json({error:"Updating User Failed........."});
            }
        } else{
            res.status(401).json({error:"User not Found......."});
        }
    }
    catch {
        res.status(500).json({error: "Something Went Wrong......."});
    }
}

// get request
export const getUser = async(req:any, res:Response) => {
    try{
        // console.log("11111111111111111111111111111111111111111111111111")
        const id = req.user.user.id;
        const user = await User.findOne({where:{id:id}, include:Hobby});
        // console.log("222222222222222222222222222222222222222222222222")
        
        var getagency: any|boolean = false;
        var jobseekerlist: any|boolean = false;
        const user_type = user?.user_type;
        // console.log("333333333333333333333333333333333333333333333333")
        // const hobbies = await Hobby.findAll({where:{UserId: id}})
        // console.log("Hobbies:----->",  hobbies);
        if(user_type == 1){
            jobseekerlist = await User.findAll({where:{ AgencyId: user?.id }});
            // console.log("4444444444444444444444444444444444444444444")
        }else{
            const agencyid = user?.AgencyId;
            getagency = await User.findByPk(agencyid);
            // console.log("555555555555555555555555555555555555555")
        }
        
        if(user){
            if(getagency){
                // console.log("66666666666666666666666666666666666666666")
                res.status(200).json({user: user, agency: getagency})
            } else {
                // console.log("777777777777777777777777777777")
                res.status(200).json({user: user, jobseekers: jobseekerlist});
            }
        } else {
            res.status(401).json({"error":"User not Found....."});
        }
    }
    catch(err){
        res.status(500).json({"message":`Something went wrong......   ${err}` })
    }
}

//get request
export const getAgencyList = async(req:any, res:Response) => {
    try{
        const agencyList = await User.findAll({where:{ user_type: 1 }});
        res.status(200).json(agencyList);
    } catch{
        res.status(500).json({"error":"Something Went Wrong"});
    }
}








const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: 'anuragsharda131@gmail.com',
        pass: "ousbpkkzrkospnso"
    }
});

function sendMailToUser(email:string, password:string){

    const mailOptions = {
        from: 'anuragsharda131@gmail.com', // sender address
        to: email,   // list of receivers
        subject: 'Account Created', // Subject line
        html: `<h2><b>Your System Generated password is ${password} </b></h2> `, // plain text body
        // html: '<b>This is a test email sent using Nodemailer!</b>' // html body (optional)
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        return console.log('Error occurred: ' + error.message);
    }
    console.log('Message sent: %s', info.messageId);
});
}

export default sendMailToUser;