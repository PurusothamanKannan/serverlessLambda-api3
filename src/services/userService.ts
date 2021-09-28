import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import {  ScanCommand, ScanCommandInput } from '@aws-sdk/client-dynamodb';
import { DeleteItemCommand, DeleteItemCommandInput , UpdateItemCommand, UpdateItemCommandInput } from '@aws-sdk/client-dynamodb';
import { AWS_CONFIG, DDB } from '../constants/aws.constants';
import { RESP_TEMPLATE , ERROR_MSGS } from '../constants/common.constants';
import { Logging } from '../utils/logger.utils';
import { SystemExceptionError } from '../exceptions/exceptions';
import { UsersModel } from 'src/models/user.models';
const client = new DynamoDBClient({ region: AWS_CONFIG.region });

const  tableName = DDB.tableName;
let userData: UsersModel;
export  class UserService {
    public static async addUser(reqBody: UsersModel) {
    userData = reqBody;
      // const reqBody = JSON.parse(req);
       Logging.logs(reqBody, 'info');
        const params: PutItemCommandInput = {
            TableName: tableName,
            Item:  {
                'id': {S: userData.id} ,
                'status': {S: userData.status},
                'compliantStatus': {S: userData.compliantStatus},
                'date': {S: userData.date},
                'userName': {S: userData.userName}

        }
    };
        try {
            const results = await client.send(new PutItemCommand(params));
            Logging.logs(results, 'info');
            return {
                statusCode: RESP_TEMPLATE.SUCCESS_RESPONSE_CODE,
                body: JSON.stringify(results),
                'isBase64Encoded': false,
                headers: RESP_TEMPLATE.HEADERS
            };
        } catch (err) {
            Logging.logs(err, 'error');
            throw new SystemExceptionError(JSON.stringify(err));
        }
    }
    static async getUser(reqBody: any) {
        Logging.logs(reqBody, 'info');
        const params: ScanCommandInput = {
            TableName: tableName
        };
        try {
            const results = await client.send(new ScanCommand(params));
            Logging.logs(results, 'info');
            return {
                statusCode: RESP_TEMPLATE.SUCCESS_RESPONSE_CODE,
                body: JSON.stringify(results),
                'isBase64Encoded': false,
                headers: RESP_TEMPLATE.HEADERS
            };
          } catch (err) {
            Logging.logs(JSON.stringify(err), 'error');
            throw new SystemExceptionError(JSON.stringify(err));
          }
    }

    static async deleteUser(reqBody: UsersModel) {
           userData = reqBody;
            Logging.logs(JSON.stringify(reqBody), 'info');
            const params: DeleteItemCommandInput = {
            TableName: tableName,
            Key: {
              'id': {S: userData.id},
              'status': {S: userData.status}
            }
          };
            try {
                const results = await client.send(new DeleteItemCommand(params));
                Logging.logs(results, 'info');
                return {
                    statusCode: RESP_TEMPLATE.SUCCESS_RESPONSE_CODE,
                    body: JSON.stringify(results),
                    'isBase64Encoded': false,
                    headers: RESP_TEMPLATE.HEADERS
                };
            } catch (err) {
                Logging.logs(err, 'error');
                throw new SystemExceptionError(JSON.stringify(err));
            }
        }

        static async updateUser(reqBody: UsersModel) {
        userData = reqBody;
           Logging.logs(JSON.stringify(reqBody), '');
            const params: UpdateItemCommandInput = {
            TableName: tableName,
            Key: {
                'id': {S: userData.id},
                'status': { S: userData.status}
              },
            UpdateExpression: 'set compliantStatus = :r',
            ExpressionAttributeValues: {
              ':r': {
                  S: reqBody.compliantStatus
            }
            }
          };
            try {
                const results = await client.send(new UpdateItemCommand(params));
                Logging.logs(results, 'info');
                return {
                    statusCode: RESP_TEMPLATE.SUCCESS_RESPONSE_CODE,
                    body: JSON.stringify(results),
                    'isBase64Encoded': false,
                    headers: RESP_TEMPLATE.HEADERS
                };
            } catch (err) {
                Logging.logs(err, 'error');
                throw new SystemExceptionError(JSON.stringify(err));
            }
        }

}