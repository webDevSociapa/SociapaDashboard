import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://webdev:uSTh4pobvDBPLGr5@sociapadash.baycv.mongodb.net/?retryWrites=true&w=majority&appName=sociapaDash";
const client = new MongoClient(uri);
const dbName = "sheetName";
const collectionName = "sheetName01";

// Function to connect to the MongoDB database
async function connectToDb() {
  if (!client.topology || !client.topology.isConnected()) {
    await client.connect();
  }
  return client.db(dbName).collection(collectionName);
}

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

    // Connect to MongoDB and fetch data based on the sheetName
    const collection = await connectToDb();
    const data = await collection.find({ sheetName }).toArray();

    if (data.length === 0) {
      return NextResponse.json(
        { message: `No data found for sheetName: ${sheetName}` },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from the database", details: error.message },
      { status: 500 }
    );
  }
}
