import { Router } from "express";
import { addUser, getAgencyList, getUser, updatePass, userLogin, listUser } from "../controller/userController";
import { upload } from "../middleware/upload";
import { Validator } from "../middleware/userValidation";
import { authenticateJWT } from "../middleware/userAuth";

const router = Router();

router.post('/signup', upload.fields([{ name: 'profile_photo' }, { name: 'resume' }]), Validator, addUser);            // add User
router.post("/login", userLogin)            // Login User
router.post("/reset-password", authenticateJWT, updatePass);            // Update Password
router.get("/get-user", authenticateJWT, getUser);          // Get Specific User after Login
router.get("/get-all-agencies", getAgencyList);            // Get agencies list for the Signup of Job-seeker
router.get("/users", listUser);

export default router;