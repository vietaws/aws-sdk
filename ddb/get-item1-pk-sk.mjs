// Author: VietAWS
// Youtube Channel: VietAWS

//src: https://github.com/aws/aws-sdk-js-v3/tree/main/lib/lib-dynamodb
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
// import { nanoid } from 'nanoid';
const t1 = new Date();
console.log(`Start time: ${t1}`);
// Full DynamoDB Client
const client = new DynamoDB({});
const ddbDocClient = DynamoDBDocument.from(client); // client is DynamoDB client

const handler = async (event, context) => {
  // Call using full client.
  try {
    const res = await ddbDocClient.query({
      TableName: 'vietaws-pk-sk-demo',
      KeyConditionExpression: '#hkey = :hvalue AND #rkey <= :rvalue',
      ExpressionAttributeNames: {
        '#hkey': 'PK',
        '#rkey': 'SK',
      },
      ExpressionAttributeValues: {
        ':hvalue': 'viet',
        ':rvalue': '2',
      },
      // ConsistentRead: true,
      // ReturnConsumedCapacity: 'TOTAL',
    });

    console.log(`${res.Items.length} Items: ${JSON.stringify(res.Items)}`);
    // console.log(

    //   `Get item successfully! WCU: ${res.ConsumedCapacity.CapacityUnits}`
    // );
    const t2 = new Date();
    console.log(`End time: ${t2}`);

    console.log(`Total time: ${t2.getTime() - t1.getTime()}`);
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};

handler();

export { handler };
