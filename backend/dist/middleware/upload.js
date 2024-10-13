"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configure storage for uploaded files
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'resume/'); // Specify the directory for storing uploaded files
    },
    filename: (req, file, cb) => {
        // Create a unique filename for each file
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path_1.default.extname(file.originalname)); // Preserve original file extension
    }
});
// Create an upload instance with file size limit and allowed file types
exports.upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|png|jpg|pdf|docx/; // Allowed file types
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Error: File type not allowed!'));
    }
});
