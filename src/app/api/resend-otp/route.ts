// Prevent Next.js from statically analyzing or pre-rendering this API route
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/User";
import crypto from "crypto";
import { sendEmail } from "@/utils/sendEmail";

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP
}

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ message: "User already verified" }, { status: 200 });
    }

    const now = new Date();
    if (user.otpExpiry && user.otpExpiry > now) {
      const secondsLeft = Math.floor((user.otpExpiry.getTime() - now.getTime()) / 1000);
      return NextResponse.json(
        { error: `Wait ${secondsLeft}s before resending OTP` },
        { status: 429 }
      );
    }

    const otp = generateOtp();
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    const expiry = new Date(Date.now() + 60 * 1000); // 1 minute expiry

    user.otp = hashedOtp;
    user.otpExpiry = expiry;
    await user.save();

    // Send OTP Email
    await sendEmail({
      to: user.email,
      subject: "Resend OTP - Verify Your Email",
      html: `<h3>Hello ${user.fullName},</h3>
             <p>Your OTP is:</p>
             <h2>${otp}</h2>
             <p>This OTP is valid for 1 minute.</p>`,
    });

    return NextResponse.json({ message: "OTP resent successfully" }, { status: 200 });

  } catch (error) {
    console.error("Resend OTP error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
