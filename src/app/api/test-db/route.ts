import { connectDB } from '@/lib/dbConnect';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ message: '✅ MongoDB connected successfully!' });
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    return NextResponse.json({ message: '❌ Failed to connect to MongoDB' }, { status: 500 });
  }
}
