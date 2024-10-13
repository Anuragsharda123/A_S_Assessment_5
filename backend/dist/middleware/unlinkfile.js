"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unLink = void 0;
const fs_1 = __importDefault(require("fs"));
const unLink = (resume, photo) => {
    console.log("Unlinking........");
    fs_1.default.unlink(resume, (error) => { console.log("Error in deleting PDF:::  ", error); });
    fs_1.default.unlink(photo, (error) => { console.log("Error in deleting PDF:::  ", error); });
};
exports.unLink = unLink;
