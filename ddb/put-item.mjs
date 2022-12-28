//src: https://github.com/aws/aws-sdk-js-v3/tree/main/lib/lib-dynamodb
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, PutCommand } from '@aws-sdk/lib-dynamodb';
// import { nanoid } from 'nanoid';
const t1 = new Date();
console.log(`Start time: ${t1}`);
// Full DynamoDB Client
const client = new DynamoDB({});
const ddbDocClient = DynamoDBDocument.from(client); // client is DynamoDB client

// Call using full client.
const handler = async (event, context) => {
  try {
    const res = await ddbDocClient.put({
      TableName: 'vietaws-pk-sk-demo',
      Item: {
        PK: 'Test',
        // SK: new Date().toISOString(),
        SK: t1.getTime().toString(),
      },
      ConditionExpression: `attribute_not_exists(PK) AND attribute_not_exists(SK)`,
      ReturnConsumedCapacity: 'TOTAL',
    });
    console.log(
      // `Created item successfully!`
      `Created item successfully! WCU: ${res.ConsumedCapacity.CapacityUnits}`
    );
    const t2 = new Date();
    console.log(`End time: ${t2}`);
    console.log(`Total time: ${t2.getTime() - t1.getTime()}`);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};

handler();
export { handler };
