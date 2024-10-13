"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgencyList = exports.getUser = exports.updatePass = exports.userLogin = exports.addUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userHobby_1 = __importDefault(require("../model/userHobby"));
const secret = "Anurag123#@!";
// post request
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, email, user_type, phone, gender, agency, hobbies } = req.body;
        const sysGenPass = String(Math.round(Math.random() * 100000000));
        const password = yield bcrypt_1.default.hash(sysGenPass, 10);
        var user = false;
        if (user_type == 1) {
            user = yield userModel_1.default.create({ firstname, lastname, email, password, user_type, phone, gender, profile_photo: req.files['profile_photo'][0].path });
        }
        else {
            user = yield userModel_1.default.create({ firstname, lastname, email, password, user_type, phone, gender, profile_photo: req.files['profile_photo'][0].path, resume: req.files['resume'][0].path, AgencyId: agency });
        }
        hobbies.map((hobby) => __awaiter(void 0, void 0, void 0, function* () {
            yield userHobby_1.default.create({ hobby });
        }));
        if (user) {
            sendMailToUser(user.email, sysGenPass);
            res.status(200).json({ "message": "Data Saved Sucessfully........." });
        }
        else {
            res.status(401).json({ "error": "Saving data failed......." });
        }
    }
    catch (err) {
        res.status(500).json({ "error": `Something Went Wrong......   ${err}` });
    }
});
exports.addUser = addUser;
// post request
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, user_type } = req.body;
        const user = yield userModel_1.default.findOne({ where: { email: email, user_type: user_type } });
        if (user) {
            const isPassValid = yield bcrypt_1.default.compare(password, user.password);
            if (isPassValid) {
                const token = jsonwebtoken_1.default.sign({ user }, secret);
                res.status(200).json({ user: user, token: token });
                console.log("User login successful");
            }
            else {
                res.status(401).json({ "error": "Invalid Credentials" });
            }
        }
        else {
            res.status(401).json({ "error": "User doesn't exist" });
        }
    }
    catch (err) {
        res.status(500).json({ "error": `Error logging in: ${err}` });
    }
});
exports.userLogin = userLogin;
// post request
const updatePass = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.user.id;
        console.log("Helllllllllll-----------", id);
        var user = yield userModel_1.default.findByPk(id);
        req.body.password = yield bcrypt_1.default.hash(req.body.password, 10);
        const password = req.body.password;
        if (user) {
            if (user.is_active) {
                user = yield user.update({ password: password });
            }
            else {
                user = yield user.update({ password: password, is_active: true });
            }
            console.log("Updated Data----------", user);
            if (user) {
                res.status(200).json({ "message": "User Status Active Successfully" });
            }
            else {
                res.status(400).json({ "error": "Updating User Failed........." });
            }
        }
        else {
            res.status(401).json({ "error": "User not Found......." });
        }
    }
    catch (_a) {
        res.status(500).json({ "error": "Something Went Wrong......." });
    }
});
exports.updatePass = updatePass;
// get request
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.user.user.id;
        const user = yield userModel_1.default.findByPk(id);
        var getagency = false;
        var jobseekerlist = false;
        const user_type = user === null || user === void 0 ? void 0 : user.user_type;
        if (user_type == 1) {
            jobseekerlist = yield userModel_1.default.findAll({ where: { AgencyId: user === null || user === void 0 ? void 0 : user.id } });
        }
        else {
            const agencyid = user === null || user === void 0 ? void 0 : user.AgencyId;
            getagency = yield userModel_1.default.findByPk(agencyid);
        }
        if (user) {
            if (getagency) {
                res.status(200).json({ user: user, agency: getagency });
            }
            else {
                res.status(200).json({ user: user, jobseekers: jobseekerlist });
            }
        }
        else {
            res.status(401).json({ "error": "User not Found....." });
        }
    }
    catch (err) {
        res.status(500).json({ "message": `Something went wrong......   ${err}` });
    }
});
exports.getUser = getUser;
//get request
const getAgencyList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const agencyList = yield userModel_1.default.findAll({ where: { user_type: 1 } });
        res.status(200).json(agencyList);
    }
    catch (_a) {
        res.status(500).json({ "error": "Something Went Wrong" });
    }
});
exports.getAgencyList = getAgencyList;
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
        user: 'anuragsharda131@gmail.com',
        pass: "ousbpkkzrkospnso"
    }
});
function sendMailToUser(email, password) {
    const mailOptions = {
        from: 'anuragsharda131@gmail.com', // sender address
        to: email, // list of receivers
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
exports.default = sendMailToUser;
