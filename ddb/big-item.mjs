//src: https://github.com/aws/aws-sdk-js-v3/tree/main/lib/lib-dynamodb
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, PutCommand } from '@aws-sdk/lib-dynamodb';
import bigitem from './big-item.json' assert { type: 'json' };

// Full DynamoDB Client
const client = new DynamoDB({});
const ddbDocClient = DynamoDBDocument.from(client); // client is DynamoDB client

// Call using full client.
const handler = async (event, context) => {
  try {
    const res = await ddbDocClient.put({
      //will not overwrite attributes that not included in Item object
      TableName: 'vietaws-pk-sk-demo',
      Item: {
        PK: 'Test',
        SK: 'Test',
        item: JSON.stringify(bigitem.item),
      },
      ReturnConsumedCapacity: 'TOTAL',
    });
    console.log(
      // `Created item successfully!`
      `Created BIG item successfully! WCU: ${res.ConsumedCapacity.CapacityUnits}`
    );
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};

handler();
export { handler };
