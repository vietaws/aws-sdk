import { DynamoDBClient, DeleteTableCommand } from '@aws-sdk/client-dynamodb';
import { CONFIG } from './0-config.mjs';

const client = new DynamoDBClient({ region: 'ap-southeast-1' });
const handler = async () => {
  try {
    const command = new DeleteTableCommand({
      TableName: CONFIG.DB_NAME,
    });
    const response = await client.send(command);
    console.log('Deleted Table successfully: ' + CONFIG.DB_NAME);
  } catch (error) {
    if (error instanceof Error) console.log('Error: ' + error.message);
  }
};

handler();
