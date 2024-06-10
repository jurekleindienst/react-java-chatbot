import React, {useState} from "react";

const EmailForm = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email:', email, 'Message:', message);
        // Add logic here to handle the sending of the email
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
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default EmailForm;