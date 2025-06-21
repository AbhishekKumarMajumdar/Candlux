import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'; // Or your own session/token logic

export async function GET(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (token) {
    return NextResponse.json({ loggedIn: true });
  } else {
    return NextResponse.json({ loggedIn: false });
  }
}
