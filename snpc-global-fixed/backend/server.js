const express = require('express')
const path = require('path')
const cors = require('cors')
const fs = require('fs')
const nodemailer = require('nodemailer')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Replace with your Gmail
    pass: 'your-app-password'     // Replace with your Gmail app password
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, phone, email, message } = req.body || {};
  console.log('Contact received:', name, email);

  const whatsappText = encodeURIComponent(
    `🏢 New Contact Form Submission:\n\n` +
    `👤 Name: ${name}\n` +
    `📞 Phone: ${phone}\n` +
    `📧 Email: ${email || 'Not provided'}\n` +
    `💬 Message: ${message || 'Not provided'}\n\n` +  
    `Please contact ${name} at ${phone} to discuss their inquiry.`
  );
  
  const whatsappNumber = '918826423668';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

  try {
    // Send email
    await transporter.sendMail({
      from: 'your-email@gmail.com',          // Replace with your Gmail
      to: 'recipient-email@example.com',      // Replace with recipient email
      subject: '🏢 New Contact Form Submission - SnPC Global',
      text: `New contact form submission received:

👤 Name: ${name}
📞 Phone: ${phone}
📧 Email: ${email || 'Not provided'}
💬 Message: ${message || 'Not provided'}

Please contact ${name} at ${phone} to discuss their inquiry.`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email || 'Not provided'}</p>
        <p><strong>Message:</strong> ${message || 'Not provided'}</p>
        <br>
        <p>Please contact ${name} at ${phone} to discuss their inquiry.</p>
      `
    });

    const response = {
      ok: true,
      whatsappUrl,
      message: 'Contact form submitted successfully'
    };

    // Respond with success and WhatsApp URL
    res.json(response);
  } catch (error) {
    console.error('Email error:', error);
    // Still return WhatsApp URL even if email fails
    res.json({
      ok: true,
      whatsappUrl,
      message: 'Form submitted but email notification failed'
    });
  }
})

// Serve frontend build if present
const clientBuildPath = path.join(__dirname, '..', 'frontend', 'dist')
app.use(express.static(clientBuildPath))

app.get('*', (req, res) => {
  const indexPath = path.join(clientBuildPath, 'index.html')
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath)
  } else {
    res.send({ ok: true, message: 'SnPC Global backend running. Build frontend to serve static files.' })
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
