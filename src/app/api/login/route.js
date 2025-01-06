import { NextResponse } from "next/server";



// Mock user data for email-password validation
const users = {
  "aalishan@gmail.com": {
    brandName:"aalishaan",
    password: "12345",
    fileName1: "AdName2",
    fileName2: "campName",
    fileName3: "dwise",
    fileName4: "fbP",
    fileName5: "instaP",
  },
  "admin@nutrela.com": {
    brandName:"nutrela",
    password: "123456",
    fileName1: "AdName2",
    fileName2: "campName",
    fileName3: "dwise",
    fileName4: "fbP",
    fileName5: "instaP",
  },
  "9ads@gmail.com": {
    brandName:"9ads",
    password: "1234567",
    fileName1: "9adsAdName",
    fileName2: "9adsCampName",
    fileName3: "9adsDwise",
    fileName4: "9adsFbP",
    fileName5: "9adsInstaP",
  },
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
    const { password: _, ...fileNames } = user;
    

    return NextResponse.json({
      message: "Login successful",
      usersData: fileNames,
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
