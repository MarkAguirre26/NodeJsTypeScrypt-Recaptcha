"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRecaptcha = void 0;
const axios_1 = __importDefault(require("axios"));
const RECAPTCHA_VERIFICATION_URL = 'https://www.google.com/recaptcha/api/siteverify';
async function verifyRecaptcha(token, secretKey) {
    try {
        const { data } = await axios_1.default.post(RECAPTCHA_VERIFICATION_URL, null, {
            params: {
                secret: secretKey,
                response: token
            }
        });
        const { success, score } = data;
        console.log('Verify Recaptcha Response:', data);
        // return (success && score >= 0.5) ? true: false;
        return success;
    }
    catch (error) {
        console.error('Error verifying reCAPTCHA:', error);
        return false;
    }
}
exports.verifyRecaptcha = verifyRecaptcha;
//# sourceMappingURL=recaptcha.js.map