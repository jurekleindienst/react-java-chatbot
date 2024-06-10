import React, {useState} from "react";
import emailjs from 'emailjs-com';

const EmailForm = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const serviceId = 'service_pl1ayvc';
    const templateId = 'template_l8wpo7q';
    const publicKey = 'XN8SdwL_FNEcRtUew'

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the form from reloading the page

        // Define the template parameters based on the form data
        const templateParams = {
            user_email: email,
            message: message
        };

        // Send the email using EmailJS
        emailjs.send(serviceId, templateId, templateParams, publicKey)
            .then(response => {
                console.log('Email successfully sent!', response);
            })
            .catch(error => console.error('Failed to send email. Error: ', error))
    };

    return (
        <div className="email-form">
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Write your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
                <button type="submit">
                    Send
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" fill="none" viewBox="0 0 17 16" color="linkColor">
                        <path fill="#0077BD" fill-rule="evenodd" d="m4.563 14.605 9.356-5.402c1-.577 1-2.02 0-2.598L4.563 1.203a1.5 1.5 0 0 0-2.25 1.3v10.803a1.5 1.5 0 0 0 2.25 1.3M6.51 8.387 2.313 9.512V6.297L6.51 7.42c.494.133.494.834 0 .966" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default EmailForm;