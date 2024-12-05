import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import xlsx from "xlsx";

const filePath = path.join(process.cwd(), "data", "AmericanaAgencyData.xlsx");

export async function GET() {
    try {
        // Read the Excel file
        const fileBuffer = fs.readFileSync(filePath);
        const workbook = xlsx.read(fileBuffer, { type: "buffer" });

        // Assuming the first sheet contains the data
        const sheetName = workbook.SheetNames[0];
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[AmericanaAgencyData]);
        console.log("AmericanaAgencyData",AmericanaAgencyData);
        

        if (sheetData.length === 0) {
            return NextResponse.json({ message: "No data found in Excel sheet" }, { status: 404 });
        }

        return NextResponse.json(sheetData);
    } catch (error) {
        console.error("Error reading Excel data:", error);
        return NextResponse.json({ message: "An error occurred while reading the Excel file" }, { status: 500 });
    }
}
