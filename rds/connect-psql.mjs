// const { Client } = require('pg');
import pg from 'pg';
import { SSMClient, GetParameterCommand } from '@aws-sdk/client-ssm';
//import { config } from './db-config.js';
const ssmClient = new SSMClient({ region: 'ap-southeast-1' });
const { Client } = pg;

const handler = async () => {
  const ssmPassword = await ssmClient.send(
    new GetParameterCommand({
      Name: '/pddb/rds/password',
      WithDecryption: true,
    })
  );
  const ssmDbName = await ssmClient.send(
    new GetParameterCommand({
      Name: '/pddb/rds/dbname',
      WithDecryption: true,
    })
  );

  const ssmUsername = await ssmClient.send(
    new GetParameterCommand({
      Name: '/pddb/rds/username',
      WithDecryption: true,
    })
  );
  const ssmAuroraEndpoint = await ssmClient.send(
    new GetParameterCommand({
      Name: '/pddb/rds/' + process.argv[2],
      //   Name: '/pddb/rds/aurora-endpoint',
      WithDecryption: true,
    })
  );

  //   console.log(JSON.stringify(ssmPassword.Parameter.Value));

  const rdsClient = new Client({
    user: ssmUsername.Parameter.Value,
    host: ssmAuroraEndpoint.Parameter.Value,
    database: ssmDbName.Parameter.Value,
    password: ssmPassword.Parameter.Value,
    port: 5432,
  });
  console.log(`Connecting to ${ssmAuroraEndpoint.Parameter.Value}`);
  rdsClient.connect();
  console.log(`Connected to: ${JSON.stringify(rdsClient)}`);

  try {
    const res = await rdsClient.query('SELECT * FROM students');
    res.rows.forEach((element, index) => {
      console.log('Row: ' + JSON.stringify(element));
    });
    rdsClient.end();
  } catch (error) {
    console.log(`Error: ${error.stack}`);
  }
};

handler();
