import { NextResponse } from "next/server";

// Mock user data for email-password validation
const users = [
  {
    email: "aalishan@gmail.com",
    brandName: "aalishaan",
    password: "12345",
    fileName1: "AdName2",
    fileName2: "campName",
    fileName3: "dwise",
    fileName4: "fbP",
    fileName5: "instaP",
  },

  {
    email: "admin@nutrela.com",
    brandName: "nutrela",
    password: "123456",
    fileName1: "AdName2",
    fileName2: "campName",
    fileName3: "dwise",
    fileName4: "fbP",
    fileName5: "instaP",
  },
  {
    email: "9am@gmail.com",
    brandName: "9am",
    password: "1234567",
    fileName1: "9amAdName",
    fileName2: "9amCampName",
    fileName3: "9amDwise",
    fileName4: "9amFbP",
    fileName5: "9amInstaP",
  },

  {
    email: "Madhusudan@gmail.com",
    brandName: "Madhusudan",
    password: "Madhusudan",
    fileName1: "MadhusudanAdName",
    fileName2: "MadhusudanCampName",
    fileName3: "MadhusudanDwise",
    fileName4: "MadhusudanFbP",
    fileName5: "MadhusudanInstaP",
  },

  {
    email: "ProQuest@gmail.com",
    brandName: "ProQuest",
    password: "1234567",
    fileName1: "ProQuestAdName",
    fileName2: "ProQuestCampName",
    fileName3: "ProQuestDwise",
    fileName4: "ProQuestFbP",
    fileName5: "ProQuestInstaP",
  },

  {
    email: "Sunride@gmail.com",
    brandName: "Sunride",
    password: "1234567",
    fileName1: "SunrideAdName",
    fileName2: "SunrideCampName",
    fileName3: "SunrideDwise",
    fileName4: "SunrideFbP",
    fileName5: "SunrideInstaP",
  },

  {
    email: "Coatee@gmail.com",
    brandName: "Coatee",
    password: "1234567",
    fileName1: "CoateeAdName",
    fileName2: "CoateeCampName",
    fileName3: "CoateeDwise",
    fileName4: "CoateeFbP",
    fileName5: "CoateeInstaP",
  },


  {
    email: "nutrelaSports@gmail.com",
    brandName: "Nutrela Sports",
    password: "1234567",
    fileName1: "nutrelaSportsAdName",
    fileName2: "nutrelaSportsCampName",
    fileName3: "nutrelaSportsDwise",
    fileName4: "nutrelaSportsFbP",
    fileName5: "nutrelaSportsInstaP",
  },

  {
    email: "nutrelaNutrition@gmail.com",
    brandName: "Nutrela Nutrition",
    password: "1234567",
    fileName1: "nutrelaSportsAdName",
    fileName2: "nutrelaSportsCampName",
    fileName3: "nutrelaSportsDwise",
    fileName4: "nutrelaSportsFbP",
    fileName5: "nutrelaSportsInstaP",
  },


  {
    email: "myNutrela@gmail.com",
    brandName: "My Nutrela",
    password: "1234567",
    fileName1: "myNutrelaAdName",
    fileName2: "myNutrelaCampName",
    fileName3: "myNutrelaDwise",
    fileName4: "myNutrelaFbP",
    fileName5: "myNutrelaInstaP",
  }

];

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = users.find((itm) => itm.email === email);

    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid Email or Password" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login Successful", user,status:"200" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in login API:", error);
    return NextResponse.json(
      { error: "An error occurred during login", details: error.message },
      { status: 500 }
    );
  }
}
