import { AWS_CONFIG, DDB } from '../constants/aws.constants';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { Logging } from '../utils/logger.utils';
import { SystemExceptionError } from '../exceptions/exceptions';
import { UpdateItemCommand , UpdateItemCommandInput } from '@aws-sdk/client-dynamodb';
import { CommonUtils } from './common.utils';
const tableName = DDB.userIdTable;
const client = new DynamoDBClient({ region: AWS_CONFIG.region });
export class UserIdGenerator {


    static async generateId(userData: any) {
        try {
            console.log('entered userid generation' );
            const params: UpdateItemCommandInput = {
                TableName: tableName,
                Key: {
                    'id': { S: '100' }
                  },
                UpdateExpression: 'SET sequence_number = sequence_number + :val',
                ExpressionAttributeValues: {
                  ':val': {
                      N: '1'
                }
                },
                ReturnValues: 'UPDATED_NEW'
              };
            const results = await client.send(new UpdateItemCommand(params));
            const userAttributes = [];
            userAttributes.push(results.Attributes);
            const userId = CommonUtils.ddbDataUnMarshall(userAttributes)[0].sequence_number;
            console.log('this.generateId');
            Logging.logs(results, 'info');
            return userId;
        } catch (err) {
            Logging.logs(err, 'error');
            throw new SystemExceptionError(JSON.stringify(err));
        }
    }
}