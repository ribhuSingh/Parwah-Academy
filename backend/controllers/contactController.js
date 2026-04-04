import nodemailer from 'nodemailer'

export const contact = async (req, res) => {
  const { firstName, lastName, email, phone, subject, message } = req.body

  console.log('Contact form submission:', { firstName, lastName, email, phone, subject, message })

  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS || !process.env.CONTACT_RECIPIENT) {
    return res.status(500).json({ error: 'Email not configured on server' })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    })

    const mailOptions = {
      from: `${firstName} ${lastName} <${email}>`,
      to: process.env.CONTACT_RECIPIENT,
      subject: `Website Contact: ${subject || 'New message'}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${firstName} ${lastName}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
             <p><strong>Subject:</strong> ${subject || 'No subject'}</p>
             <p><strong>Message:</strong><br/>${message}</p>`,
    }

    await transporter.sendMail(mailOptions)

    res.status(200).json({ message: 'Message sent successfully' })
  } catch (err) {
    console.error('Failed to send contact email:', err)
    res.status(500).json({ error: 'Failed to send email' })
  }
}
