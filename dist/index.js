"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const recaptcha_1 = require("./recaptcha");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.app = app;
const PORT = process.env.PORT || '';
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use(express_1.default.urlencoded({ extended: true }));
// Routes
app.post('/verify', async (req, res) => {
    try {
        const recaptchaToken = req.body['recaptchaToken'];
        // console.log("recaptchaToken:",recaptchaToken);
        if (!recaptchaToken)
            return res.status(400).json({ success: false, message: `No reCAPTCHA token found in the request` });
        const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
        if (!RECAPTCHA_SECRET_KEY)
            return res.status(500).json({ success: false, message: 'reCAPTCHA secret key not found' });
        const isVerified = await (0, recaptcha_1.verifyRecaptcha)(recaptchaToken, RECAPTCHA_SECRET_KEY);
        const message = isVerified ? 'succeeded' : 'failed';
        console.log(`Recaptcha verification ${message}`);
        res.status(isVerified ? 200 : 400).json({ success: isVerified, statusText: `Recaptcha verification ${message}` });
    }
    catch (error) {
        console.error('Error verifying reCAPTCHA:', error);
        res.status(500).json({ success: false, message: 'An error occurred while verifying reCAPTCHA', error: error.message });
    }
});
// Server start
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
//# sourceMappingURL=index.js.map