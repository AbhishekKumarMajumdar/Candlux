import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { connectDB } from "@/lib/dbConnect";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and OTP are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.otp || !user.otpExpiry) {
      return NextResponse.json({ error: "OTP has not been generated. Please request a new OTP." }, { status: 400 });
    }

    if (user.isVerified) {
      return NextResponse.json({ message: "User already verified" }, { status: 200 });
    }

    if (new Date() > user.otpExpiry) {
      return NextResponse.json({ error: "OTP has expired. Please request a new one." }, { status: 400 });
    }

    const hashedInputOTP = crypto.createHash("sha256").update(otp.toString()).digest("hex");

    if (hashedInputOTP !== user.otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("OTP verification error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
