const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const twilio = require('twilio');

const accountSid = 'acc-sid'; // Twilio Account SID
const authToken = 'acc-auth-token'; // Twilio Auth Token
const client = new twilio(accountSid, authToken);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/send-sms', (req, res) => {
    const { name, phone, totalAmount } = req.body;

    client.messages.create({
        body: `Hello ${name}, your order has been placed successfully. Total amount: $${totalAmount}. Thank you for shopping with us!`,
        messagingServiceSid: 'msg-sid', // Use your Messaging Service SID here
        to:phone
    })
    .then(message => res.status(200).json({ success: true, messageSid: message.sid }))
    .catch(error => res.status(500).json({ success: false, error: error.message }));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});