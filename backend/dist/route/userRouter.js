"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const upload_1 = require("../middleware/upload");
const userValidation_1 = require("../middleware/userValidation");
const userAuth_1 = require("../middleware/userAuth");
const router = (0, express_1.Router)();
router.post('/signup', upload_1.upload.fields([{ name: 'profile_photo' }, { name: 'resume' }]), userValidation_1.Validator, userController_1.addUser);
router.post("/login", userController_1.userLogin); // Login User
router.post("/reset-password", userAuth_1.authenticateJWT, userController_1.updatePass); // Update Password
router.get("/get-user", userAuth_1.authenticateJWT, userController_1.getUser);
router.get("/get-all-agencies", userController_1.getAgencyList);
exports.default = router;
