//src: https://github.com/aws/aws-sdk-js-v3/tree/main/lib/lib-dynamodb
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, PutCommand } from '@aws-sdk/lib-dynamodb';
import movies from './movies.json' assert { type: 'json' };
import { CONFIG } from './0-config.mjs';
const t1 = new Date();
// Full DynamoDB Client
const client = new DynamoDB({});
const ddbDocClient = DynamoDBDocument.from(client); // client is DynamoDB client

const singlePut = async (movie, index) => {
  try {
    const year = JSON.stringify(movie.year);
    const title = JSON.stringify(movie.title);
    const info = JSON.stringify(movie.info);
    const res = await ddbDocClient.put({
      TableName: CONFIG.DB_NAME,
      Item: {
        PK: year,
        SK: title,
        info: info,
      },
      // ConditionExpression: `attribute_not_exists(PK) AND attribute_not_exists(SK)`,
      ReturnConsumedCapacity: 'TOTAL',
    });
    console.log(
      `${index}. Added movie: ${year} ${title} successfully! WCU: ${res.ConsumedCapacity.CapacityUnits}`
    );
  } catch (err) {
    if (err instanceof Error) {
      console.log('Duplidated!');
    }
  }
};

// Call using full client.
const handler = async (event, context) => {
  try {
    console.log('Movies: ' + JSON.stringify(movies[100].year));
    movies.forEach((movie, index) => {
      singlePut(movie, index);
    });
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};

handler();

export { handler };
