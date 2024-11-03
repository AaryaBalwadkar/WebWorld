import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from './EmailTemplates.js'
import { mailtrapClient, sender } from './MailtrapConfig.js'

export const SendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{email}]

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category: "Email Verification"
        })

        console.log("Email sent successfully", response)        
    } catch (error) {
        console.log("Error sending verification", error)
        throw new Error(`Error sending verification email: ${error}`)
    }
} 

export const sendWelcomeEmail = async (email, name) => {
	const recipient = [{ email }];

	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			template_uuid: "f58b7ec7-2785-47c7-a582-34ac1cce7034",
			template_variables: {
				name: name,
			},
		});

		console.log("Welcome email sent successfully", response);
	} catch (error) {
		console.error(`Error sending welcome email`, error);

		throw new Error(`Error sending welcome email: ${error}`);
	}
};

export const sendPasswordResetEmail = async (email, resetURL) => {
	const recipient = [{ email }]
	try {
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category: "Password Reset",
		})
	} catch (error) {
		console.log("Error sending password reset email", error)
		console.log(`Error sending password reset email: ${error}`)
	}
}

export const sendResetSuccessEmail = async (email) => {
	const recipient = [{email}]

	try{
		const response = await mailtrapClient.send({
			from: sender,
			to: recipient,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		})
		console.log("Passdword reset email send successfully", response)
	} catch(error){
		console.error("Error sending password reset success email", error)
		throw new Error(`Error sending password reset success email: ${error}`)
	}
}