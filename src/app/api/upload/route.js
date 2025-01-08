import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const sheetName = formData.get("sheetName");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure the shared directory exists
    const dir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(dir, { recursive: true });

    // Write the file to the shared directory
    const filePath = path.join(dir, `${sheetName}.xlsx`);
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ message: "File uploaded successfully", sheetName });
  } catch (error) {
    console.error("Error in file upload:", error);
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