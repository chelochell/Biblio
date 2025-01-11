import { mailtrapClient, sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify Your Email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        })
        console.log("Email sent successfully", response);
    } catch (error) {
        console.error(`Error sending verification`, error);

		throw new Error(`Error sending verification email: ${error}`);
    }
};

export const sendWelcomeEmail = async (email, username) => {
    const recipient = [{email}];

    try {
     const response = await mailtrapClient.send({
            from:sender,
            to:recipient,
            template_uuid:"537f0ecf-de0d-4992-9776-e5e3f0ca5942",
            template_variables: {
				company_info_name: "Biblio",
				name: username,
			}, 
        })

        console.log("Welcome email sent successfully", response);
    } catch (error) {
        console.error(`Error sending welcome email`, error);

		throw new Error(`Error sending welcome email: ${error}`);
    }
}