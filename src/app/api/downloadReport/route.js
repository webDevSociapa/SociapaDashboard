import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sheetName = searchParams.get("sheetName");

    if (!sheetName) {
      return NextResponse.json(
        { error: "sheetName query parameter is required" },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "public", "sheets", `${sheetName}.xlsx`);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `File not found: ${sheetName}.xlsx` },
        { status: 404 }
      );
    }

    // Read the file buffer
    const fileBuffer = fs.readFileSync(filePath);

    // Create a response with the file buffer
    const response = new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${sheetName}.xlsx"`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return NextResponse.json(
      { error: "Failed to read the Excel file", details: error.message },
      { status: 500 }
    );
  }
}
