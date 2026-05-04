const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();

// UUID generator (no external dependency)
const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

exports.handler = async (event) => {
  try {
    console.log("Incoming event:", JSON.stringify(event));

    // Safe parsing (prevents crashes)
    let body;
    try {
      body = typeof event.body === "string"
        ? JSON.parse(event.body)
        : event.body;
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid JSON format" }),
        headers: { "Content-Type": "application/json" }
      };
    }

    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Name, email, and message are required" }),
        headers: { "Content-Type": "application/json" }
      };
    }

    const id = uuidv4();

    const item = {
      id,
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    };

    // 🔥 DynamoDB write
    await dynamo.put({
      TableName: "ContactFormSubmissions",
      Item: item
    }).promise();

    console.log("Saved to DynamoDB:", item);

    // 🔥 ENV VARIABLE CHECK (IMPORTANT FIX)
    if (!process.env.SNS_TOPIC_ARN) {
      throw new Error("SNS_TOPIC_ARN environment variable is missing");
    }

    // 🔥 SNS publish
    await sns.publish({
      TopicArn: process.env.SNS_TOPIC_ARN,
      Subject: `New Contact Form Submission from ${name}`,
      Message: JSON.stringify(item, null, 2)
    }).promise();

    console.log("SNS notification sent successfully");

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Form submitted successfully",
        id
      }),
      headers: { "Content-Type": "application/json" }
    };

  } catch (error) {
    // 🚨 CRITICAL FIX: show real error
    console.error("FULL ERROR:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal server error",
        error: error.message
      }),
      headers: { "Content-Type": "application/json" }
    };
  }
};
