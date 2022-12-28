// Author: VietAWS
// Youtube Channel: VietAWS

import { RDSClient, StartDBClusterCommand } from '@aws-sdk/client-rds'; // ES Modules import

const client = new RDSClient({
  region: 'ap-southeast-1',
});

const dbList = ['pddb-aurora', 'pddb-aurora-backtrack'];

export const startCluster = async (dbName) => {
  // TODO implement
  // const dbName = 'pddb-aurora';
  const inputDB = {
    DBClusterIdentifier: dbName,
  };

  try {
    const command = new StartDBClusterCommand(inputDB);
    const response = await client.send(command);

    console.log('Started DB Cluster Successfully: ' + dbName);

    const result = {
      statusCode: 200,
      body: JSON.stringify('Started RDS Cluster!' + dbName),
    };
    return result;
  } catch (error) {
    if (error instanceof Error) console.log('Error Message: ' + error.message);
  }
};

const handler = async (event) => {
  dbList.forEach((dbName, index) => {
    const result = startCluster(dbName);
  });
};

handler();

export { handler };
