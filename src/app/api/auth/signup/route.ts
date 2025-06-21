import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '@/models/User';
import { connectDB } from '@/lib/dbConnect';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { fullName, email, phone, password, confirmPassword } = await req.json();

    // Validate fields
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      const error =
        existingUser.email === email
          ? 'Email already exists.'
          : 'Phone number already in use.';

      // If user exists but is not verified and OTP expired more than 1 min ago, allow resending OTP
      const now = new Date();
      const oneMinuteAgo = new Date(now.getTime() - 60 * 1000);

      if (!existingUser.isVerified && existingUser.otpExpiry < oneMinuteAgo) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        existingUser.otp = hashedOTP;
        existingUser.otpExpiry = otpExpiry;
        await existingUser.save();

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: `Your App <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Resent OTP for Email Verification',
          html: `<h3>Hi again, ${existingUser.fullName}!</h3>
                 <p>Your new OTP is:</p>
                 <h2>${otp}</h2>
                 <p>This OTP is valid for 10 minutes.</p>`
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'OTP re-sent to your email. Please verify.' });
      }

      return NextResponse.json({ error }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
      otp: hashedOTP,
      otpExpiry,
      isVerified: false,
      role: 'user',
    });

    await newUser.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `Your App <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Email Verification OTP',
      html: `<h3>Welcome, ${fullName}!</h3>
             <p>Your OTP for email verification is:</p>
             <h2>${otp}</h2>
             <p>This OTP will expire in 10 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Signup successful. OTP sent to email.' }, { status: 201 });
  } catch (error) {
    console.error('Signup Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
