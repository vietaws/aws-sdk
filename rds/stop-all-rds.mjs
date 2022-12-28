import { handler as clusterHandler } from './stop-rds-cluster.mjs';
import { handler as instanceHandler } from './stop-rds-instance.mjs';

await clusterHandler();
await instanceHandler();
