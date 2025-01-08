import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import * as XLSX from "xlsx";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const sheetName = formData.get("sheetName");

    if (!file || !sheetName) {
      return NextResponse.json({ error: "Missing file or sheetName" }, { status: 400 });
    }

    // Validate file type
    const fileType = file.type; // MIME type
    const validMimeTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
      "text/csv", // .csv
      "application/vnd.ms-excel", // .xls
    ];

    if (!validMimeTypes.includes(fileType)) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a valid spreadsheet file." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let workbook;

    if (fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      // File is already .xlsx
      workbook = XLSX.read(buffer, { type: "buffer" });
    } else {
      // Convert non-.xlsx file (e.g., .csv or .xls) to .xlsx
      workbook = XLSX.read(buffer, { type: "buffer" });
    }

    // Save as .xlsx format
    const xlsxBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    // Ensure the shared directory exists
    const dir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(dir, { recursive: true });

    // Write the .xlsx file to the shared directory
    const filePath = path.join(dir, `${sheetName}.xlsx`);
    await fs.writeFile(filePath, xlsxBuffer);

    return NextResponse.json({ message: "File uploaded and converted successfully", sheetName });
  } catch (error) {
    console.error("Error in file upload and conversion:", error);
    return NextResponse.json(
      { error: "File upload failed", details: error.message },
      { status: 500 }
    );
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
