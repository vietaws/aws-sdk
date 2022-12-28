// Author: VietAWS
// Youtube Channel: VietAWS

import { RDSClient, StopDBInstanceCommand } from '@aws-sdk/client-rds'; // ES Modules import

const client = new RDSClient({
  region: 'ap-southeast-1',
});

const dbList = ['pddb-rds-instance', 'pddb-rds-multi-az'];

export const stopRdsInstance = async (dbName) => {
  // TODO implement
  // const dbName = 'pddb-aurora';
  // const inputDBCluster = {
  //   DBClusterIdentifier: dbName,
  // };
  const inputDBInstance = {
    DBInstanceIdentifier: dbName,
  };

  try {
    // const command = new StopDBClusterCommand(inputDBCluster);
    const command = new StopDBInstanceCommand(inputDBInstance);
    const response = await client.send(command);

    console.log('Stop DB Successfully: ' + dbName);

    const result = {
      statusCode: 200,
      body: JSON.stringify('Stop RDS Instance!'),
    };
    return result;
  } catch (error) {
    if (error instanceof Error) console.log('Error Message: ' + error.message);
  }
};

const handler = async (event) => {
  dbList.forEach((dbName, index) => {
    const result = stopRdsInstance(dbName);
  });
};

handler();
