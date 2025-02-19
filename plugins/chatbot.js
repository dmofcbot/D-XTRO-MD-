require('dotenv').config();
const express = require('express');
const twilio = require('twilio');

const app = express();
const port = process.env.PORT || 3000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/whatsapp', (req, res) => {
    const message = req.body.Body.toLowerCase();
    const sender = req.body.From;

    let reply;

    if (message.includes('hi')) {
        reply = 'Hello! How can I assist you today? 😊';
    } else if (message.includes('help')) {
        reply = 'You can ask me about our services, working hours, or anything else!';
    } else {
        reply = "Sorry, I didn't understand that. Type 'help' for options.";
    }

    client.messages
        .create({
            body: reply,
            from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
            to: sender
        })
        .then(() => console.log(`Replied to ${sender}`))
        .catch(error => console.error(error));

    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Chatbot Plugin is running on port ${port}`);
});
