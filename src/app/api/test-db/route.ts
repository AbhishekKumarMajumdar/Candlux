import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET(req: NextRequest) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Candlux Support" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send a test mail to yourself
      subject: '✅ Nodemailer Test - OTP Email',
      html: `<p>This is a test email sent from your Next.js app using Nodemailer ✅</p>`,
    });

    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
