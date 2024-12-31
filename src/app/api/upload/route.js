import { NextResponse } from "next/server";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://webdev:uSTh4pobvDBPLGr5@sociapadash.baycv.mongodb.net/?retryWrites=true&w=majority&appName=sociapaDash";
const client = new MongoClient(uri);
const dbName = "sheetName";
const collectionName = "sheetName01";

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const bucketName = process.env.AWS_BUCKET_NAME;

/**
 * Connect to MongoDB and return the specified collection.
 */
async function connectToDb() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client.db(dbName).collection(collectionName);
}

/**
 * Handle POST request for uploading a file to AWS S3 and saving metadata in MongoDB.
 */
export async function POST(request) {
  try {
    const formData = await request.formData();
    const sheetName = formData.get("sheetName");

    if (!sheetName) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await sheetName.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uniqueFileName = `${uuidv4()}_${sheetName.name}`;

    // Upload file to S3
    const uploadResult = await s3.upload({
      Bucket: bucketName,
      Key: `sheets/${uniqueFileName}`,
      Body: buffer,
      ContentType: sheetName.type,
    }).promise();

    // Save metadata in MongoDB
    const collection = await connectToDb();
    const updateResult = await collection.updateOne(
      {},
      { $set: { sheetName: uniqueFileName } },
      { upsert: true } // Creates a new document if none exists
    );

    return NextResponse.json({
      message: "File uploaded successfully",
      location: uploadResult.Location,
      updateResult,
    });
  } catch (error) {
    console.error("Error in file upload:", error);
    return NextResponse.json(
      { error: "File upload failed", details: error.message },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
