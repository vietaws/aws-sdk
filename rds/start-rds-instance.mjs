// Author: VietAWS
// Youtube Channel: VietAWS

import { RDSClient, StartDBInstanceCommand } from '@aws-sdk/client-rds'; // ES Modules import

const client = new RDSClient({
  region: 'ap-southeast-1',
});

const dbList = ['pddb-rds-instance'];

export const startRdsInstance = async (dbName) => {
  // TODO implement
  // const dbName = 'pddb-aurora';
  const inputDB = {
    DBInstanceIdentifier: dbName,
  };

  try {
    const command = new StartDBInstanceCommand(inputDB);
    const response = await client.send(command);

    console.log('Started DB Instance Successfully: ' + dbName);

    const result = {
      statusCode: 200,
      body: JSON.stringify('Started RDS Instance!' + dbName),
    };
    return result;
  } catch (error) {
    if (error instanceof Error) console.log('Error Message: ' + error.message);
  }
};

const handler = async (event) => {
  dbList.forEach((dbName, index) => {
    const result = startRdsInstance(dbName);
  });
};

handler();

export { handler };
