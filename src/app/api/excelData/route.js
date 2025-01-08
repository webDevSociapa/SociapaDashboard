import { NextResponse } from "next/server";
import fs from "fs";
import * as xlsx from "xlsx";
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

    const filePath = path.join(process.cwd(), "public", "uploads", `${sheetName}.xlsx`);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `File not found: ${sheetName}.xlsx` },
        { status: 404 }
      );
    }

    // Read and parse the file
    const fileBuffer = fs.readFileSync(filePath);
    const workbook = xlsx.read(fileBuffer, { type: "buffer" });

    // Get data from the first sheet
    const firstSheetName = workbook.SheetNames[0];
    if (!firstSheetName) {
      return NextResponse.json(
        { error: "No sheets found in the Excel file" },
        { status: 404 }
      );
    }

    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[firstSheetName]);

    if (sheetData.length === 0) {
      return NextResponse.json(
        { message: "No data found in the Excel sheet" },
        { status: 404 }
      );
    }

    
    return NextResponse.json(sheetData);
  } catch (error) {
    console.error("Error reading Excel file:", error);
    return NextResponse.json(
      { error: "Failed to read the Excel file", details: error.message },
      { status: 500 }
    );
  }
}
