import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import {  ScanCommand, ScanCommandInput } from '@aws-sdk/client-dynamodb';
import { DeleteItemCommand, DeleteItemCommandInput , UpdateItemCommand, UpdateItemCommandInput } from '@aws-sdk/client-dynamodb';
import { AWS_CONFIG, DDB } from '../constants/aws.constants';
import { RESP_TEMPLATE , ERROR_MSGS, INITIAL_STATUS } from '../constants/common.constants';
import { Logging } from '../utils/logger.utils';
import { SystemExceptionError } from '../exceptions/exceptions';
import { UsersModel } from '../models/user.models';
import { CommonUtils } from '../utils/common.utils';
import { UserIdGenerator } from '../utils/userId';
const client = new DynamoDBClient({ region: AWS_CONFIG.region });

const  tableName = DDB.tableName;
let userData: UsersModel;
export  class UserService {
    public static async addUser(reqBody: UsersModel) {

        try {
            userData = reqBody;
            // const reqBody = JSON.parse(req);
            Logging.logs(reqBody, 'info');
            const userId = await UserIdGenerator.generateId(userData);
            console.log(userId);
            const params: PutItemCommandInput = {
            TableName: tableName,
            Item:  {
                'id': {S: userId.toString() },
                'status': {S: userData.status},
                'compliantStatus': {S: userData.compliantStatus},
                'date': {S: userData.date},
                'userName': {S: userData.userName}

                }
            };
            const results = await client.send(new PutItemCommand(params));
            Logging.logs(results, 'info');
            return {
                statusCode: RESP_TEMPLATE.SUCCESS_RESPONSE_CODE,
                body: JSON.stringify(results),
                'isBase64Encoded': false,
                headers: RESP_TEMPLATE.HEADERS
            };
        } catch (err: any) {
            Logging.logs(err, 'error');
            throw new SystemExceptionError(err.message);
        }
    }
    static async getUser(reqBody: any) {
        Logging.logs(reqBody, 'info');
        try {
            const params: ScanCommandInput = {
                TableName: tableName,
                ProjectionExpression: 'id,#s,userName,compliantStatus',
                ExpressionAttributeNames : {'#s': 'status'}
            };
            const results = await client.send(new ScanCommand(params));
            Logging.logs(results, 'info');
            const items = await CommonUtils.ddbDataUnMarshall(results.Items);
            return {
                statusCode: RESP_TEMPLATE.SUCCESS_RESPONSE_CODE,
                body: JSON.stringify(items),
                'isBase64Encoded': false,
                headers: RESP_TEMPLATE.HEADERS
            };
          } catch (err: any) {
            Logging.logs(JSON.stringify(err), 'error');
            throw new SystemExceptionError(err.message);
          }
    }

    static async deleteUser(reqBody: UsersModel) {
            try {
                userData = reqBody;
                Logging.logs(JSON.stringify(reqBody), 'info');
                const params: DeleteItemCommandInput = {
                TableName: tableName,
                Key: {
                  'id': {S: userData.id},
                  'status': {S: INITIAL_STATUS.INITIAL_USER_STATUS}
                }
              };
                const results = await client.send(new DeleteItemCommand(params));
                Logging.logs(results, 'info');
                return {
                    statusCode: RESP_TEMPLATE.SUCCESS_RESPONSE_CODE,
                    body: JSON.stringify(results),
                    'isBase64Encoded': false,
                    headers: RESP_TEMPLATE.HEADERS
                };
            } catch (err: any) {
                Logging.logs(err, 'error');
                throw new SystemExceptionError(err.message);
            }
        }

    static async updateUser(reqBody: UsersModel) {

            try {
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
                const results = await client.send(new UpdateItemCommand(params));
                Logging.logs(results, 'info');
                return {
                    statusCode: RESP_TEMPLATE.SUCCESS_RESPONSE_CODE,
                    body: JSON.stringify(results),
                    'isBase64Encoded': false,
                    headers: RESP_TEMPLATE.HEADERS
                };
            } catch (err: any) {
                Logging.logs(err, 'error');
                throw new SystemExceptionError(err.message);
            }
        }

}