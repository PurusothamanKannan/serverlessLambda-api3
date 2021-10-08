import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import {  ScanCommand, ScanCommandInput } from '@aws-sdk/client-dynamodb';
import { DeleteItemCommand, DeleteItemCommandInput , UpdateItemCommand, UpdateItemCommandInput } from '@aws-sdk/client-dynamodb';
import { AWS_CONFIG, DDB } from '../constants/aws.constants';
import { RESP_TEMPLATE , ERROR_MSGS, INITIAL_STATUS } from '../constants/common.constants';
import { Logger } from '../utils/logger.utils';
import { SystemExceptionError } from '../exceptions/exceptions';
import { UsersModel } from '../models/user.models';
import { CommonUtils } from '../utils/common.utils';
const client = new DynamoDBClient({ region: AWS_CONFIG.region });

const  tableName = DDB.tableName;
let userData: UsersModel;
export  class UserService {
    public static async addUser(reqBody: UsersModel) {

        try {
            userData = reqBody;
            // const reqBody = JSON.parse(req);
            const userId = await CommonUtils.generateUserId();
            Logger.info(userData);
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
            Logger.info(results);
            return {
                statusCode: RESP_TEMPLATE.SUCCESS_RESPONSE_CODE,
                body: JSON.stringify(results),
                'isBase64Encoded': false,
                headers: RESP_TEMPLATE.HEADERS
            };
        } catch (err: any) {
            Logger.error(err);
            throw new SystemExceptionError(err.message);
        }
    }
    static async getUser(reqBody: any) {
        try {
            Logger.info(reqBody);
            const params: ScanCommandInput = {
                TableName: tableName,
                ProjectionExpression: 'id,#s,userName,compliantStatus',
                ExpressionAttributeNames : {'#s': 'status'}
            };
            const results = await client.send(new ScanCommand(params));
            Logger.info(results);
            const items = await CommonUtils.dataUnMarshall(results.Items);
            return {
                statusCode: RESP_TEMPLATE.SUCCESS_RESPONSE_CODE,
                body: JSON.stringify(items),
                'isBase64Encoded': false,
                headers: RESP_TEMPLATE.HEADERS
            };
          } catch (err: any) {
           Logger.error(err);
            throw new SystemExceptionError(err.message);
          }
    }

    static async deleteUser(reqBody: UsersModel) {
            try {
                userData = reqBody;
                Logger.info(reqBody);
                const params: DeleteItemCommandInput = {
                TableName: tableName,
                Key: {
                  'id': {S: userData.id},
                  'status': {S: INITIAL_STATUS.INITIAL_USER_STATUS}
                }
              };
                const results = await client.send(new DeleteItemCommand(params));
                Logger.info(results);
                return {
                    statusCode: RESP_TEMPLATE.SUCCESS_RESPONSE_CODE,
                    body: JSON.stringify(results),
                    'isBase64Encoded': false,
                    headers: RESP_TEMPLATE.HEADERS
                };
            } catch (err: any) {
                Logger.error(err);
                throw new SystemExceptionError(err.message);
            }
        }

    static async updateUser(reqBody: UsersModel) {

            try {
                userData = reqBody;
                 Logger.info(userData);
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
                Logger.info(results);
                return {
                    statusCode: RESP_TEMPLATE.SUCCESS_RESPONSE_CODE,
                    body: JSON.stringify(results),
                    'isBase64Encoded': false,
                    headers: RESP_TEMPLATE.HEADERS
                };
            } catch (err: any) {
                Logger.error(err);
                throw new SystemExceptionError(err.message);
            }
        }

}