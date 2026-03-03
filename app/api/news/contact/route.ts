import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, phone, message } = await request.json();

    // Validation
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'thegurirai77@gmail.com', // Tuhada email
      subject: '📢 New Business Listing Request - Sirsa Online',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: 'Inter', Arial, sans-serif;
              background: #f5f5f5;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: white;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 600;
            }
            .content {
              padding: 30px;
            }
            .field {
              margin-bottom: 20px;
            }
            .label {
              font-size: 14px;
              color: #666;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .value {
              font-size: 18px;
              color: #333;
              font-weight: 500;
              padding: 10px;
              background: #f8f9fa;
              border-radius: 8px;
            }
            .message-box {
              padding: 15px;
              background: #f0f7ff;
              border-left: 4px solid #667eea;
              border-radius: 8px;
              font-size: 16px;
              line-height: 1.6;
              color: #444;
            }
            .footer {
              padding: 20px;
              text-align: center;
              background: #f8f9fa;
              color: #666;
              font-size: 14px;
            }
            .badge {
              display: inline-block;
              background: #ffd700;
              color: #333;
              padding: 5px 15px;
              border-radius: 50px;
              font-size: 14px;
              font-weight: 600;
              margin-top: 10px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🚀 New Business Listing Request</h1>
              <div class="badge">First 10 Listings FREE!</div>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">👤 Name</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">📞 Phone Number</div>
                <div class="value">${phone}</div>
              </div>
              
              <div class="field">
                <div class="label">💬 Message</div>
                <div class="message-box">${message}</div>
              </div>
            </div>
            <div class="footer">
              <p>This request was sent from Sirsa Online Footer Form</p>
              <p style="margin-top: 10px; color: #999;">© ${new Date().getFullYear()} Sirsa Online</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Email sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again.' },
      { status: 500 }
    );
  }
}