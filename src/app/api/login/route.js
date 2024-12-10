import { NextResponse } from "next/server";

// Mock user data for email-password validation
const users = {
  "robin@gmail.com": { password: "12345", fileName: "s", },
  "robin1@gmail.com": { password: "123456", fileName: "e",brand:"Nutrela" },
};

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = users[email];
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      message: "Login successful",
      fileName: user.fileName,
      brandName: user.brand,

      status: 200
    });
  } catch (error) {
    console.error("Error in login API:", error);
    return NextResponse.json(
      { error: "An error occurred during login", details: error.message },
      { status: 500 }
    );
  }
}
