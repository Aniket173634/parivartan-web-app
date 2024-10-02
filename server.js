const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const {accountSid, authToken, messagingServiceSid} = require("./variables");

// const accountSid = accountSid; // Twilio Account SID
// const authToken = authToken; // Twilio Auth Token
const client = new twilio(accountSid, authToken);
// const messagingServiceSid = messagingServiceSid;

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/send-sms', (req, res) => {
    const { name, phone, totalAmount } = req.body;

    client.messages.create({
        body: `Hello ${name}, your order has been placed successfully. Total amount: $${totalAmount}. Thank you for shopping with us!`,
        messagingServiceSid: messagingServiceSid, // Use your Messaging Service SID here
        to:phone
    })
    .then(message => res.status(200).json({ success: true, messageSid: message.sid }))
    .catch(error => res.status(500).json({ success: false, error: error.message }));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});