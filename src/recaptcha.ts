import axios from 'axios';

const RECAPTCHA_VERIFICATION_URL = 'https://www.google.com/recaptcha/api/siteverify';

async function verifyRecaptcha(token: string, secretKey: string): Promise<boolean> {
    try {
        const { data } = await axios.post(RECAPTCHA_VERIFICATION_URL, null, {
            params: {
                secret: secretKey,
                response: token
            }
        });
        const { success, score } = data;
        console.log('Verify Recaptcha Response:',data);
        // return (success && score >= 0.5) ? true: false;
        return success;
    } catch (error) {
        console.error('Error verifying reCAPTCHA:', error);
        return false;
    }
}

export { verifyRecaptcha };

