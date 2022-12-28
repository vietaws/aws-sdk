import {
  DynamoDBClient,
  CreateTableCommand,
  KeyType,
} from '@aws-sdk/client-dynamodb'; // ES Modules import
import { CONFIG } from './0-config.mjs';
// const { DynamoDBClient, CreateTableCommand } = require("@aws-sdk/client-dynamodb"); // CommonJS import
const client = new DynamoDBClient({ region: 'ap-southeast-1' });

const handler = async () => {
  const command = new CreateTableCommand({
    TableName: CONFIG.DB_NAME,
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
        AttributeType: 'N',
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
