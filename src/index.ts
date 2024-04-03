import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { verifyRecaptcha } from './recaptcha';
import { Console } from 'console';

dotenv.config();

const app = express();
const PORT = process.env.PORT || '';


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Routes
app.post('/verify', async (req: Request, res: Response) => {
    try {
        const recaptchaToken: string = req.body['recaptchaToken'];

        // console.log("recaptchaToken:",recaptchaToken);
        

if (!recaptchaToken)
            return res.status(400).json({ success: false, message: `No reCAPTCHA token found in the request` });

        const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
        if (!RECAPTCHA_SECRET_KEY)
            return res.status(500).json({ success: false, message: 'reCAPTCHA secret key not found' });

        const isVerified = await verifyRecaptcha(recaptchaToken, RECAPTCHA_SECRET_KEY);
        const message = isVerified ? 'succeeded' : 'failed';

        console.log(`Recaptcha verification ${message}`);
        res.status(isVerified ? 200 : 400).json({ success: isVerified, statusText: `Recaptcha verification ${message}` });
    } catch (error) {
        console.error('Error verifying reCAPTCHA:', error);
        res.status(500).json({ success: false, message: 'An error occurred while verifying reCAPTCHA', error: error.message });
    }
});

// Server start
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

export { app };
