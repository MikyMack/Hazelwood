
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hazelwood@gmail.com', 
    pass: 'YOUR_GMAIL_APP_PASSWORD' 
  }
});

app.post('/api/contact', async (req, res) => {
  const { fname, lname, email, phone, message } = req.body;
  const mailOptions = {
    from: 'hazelwood@gmail.com',
    to: 'hazelwood@gmail.com', 
    subject: `Hazelwood Contact: ${fname} ${lname}`,
    text: `You received a new contact form submission.\n\nName: ${fname} ${lname}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error sending message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
