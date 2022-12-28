import {
  DynamoDBClient,
  CreateTableCommand,
  KeyType,
} from '@aws-sdk/client-dynamodb'; // ES Modules import
// const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const client = new DynamoDBClient({ region: 'ap-southeast-1' });

const handler = async () => {
  const command = new CreateTableCommand({
    TableName: 'big-user-table',
    BillingMode: 'PAY_PER_REQUEST',
    KeySchema: [
      {
        KeyType: 'HASH',
        AttributeName: 'PK',
      },
      {
        KeyType: 'RANGE',
        AttributeName: 'SK',
      },
    ],
    AttributeDefinitions: [
      {
        AttributeName: 'PK',
        AttributeType: 'S',
        // KeyType: 'HASH',
      },
      {
        AttributeName: 'SK',
        AttributeType: 'S',
        // KeyType: 'RANGE',
      },
    ],
  });
  const response = await client.send(command);
  console.log('created table successfully');
};

handler();
