import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from '@aws-sdk/client-dynamodb';
import {  ScanCommand, ScanCommandInput } from '@aws-sdk/client-dynamodb';
import { DeleteItemCommand, DeleteItemCommandInput , UpdateItemCommand, UpdateItemCommandInput } from '@aws-sdk/client-dynamodb';
import { AWS_CONFIG, DDB } from '../constants/aws.constants';
import { RESP_TEMPLATE , ERROR_MSGS } from '../constants/common.constants';
import { Logging } from '../utils/logger.utils';
import { ExceptionError } from '../exceptions/exceptions';
const client = new DynamoDBClient({ region: AWS_CONFIG.region });

const  tableName = DDB.tableName;

export  class UserService {

    public static async addUser(req: any) {
        Logging.logs(req, 'trace');
       const reqBody = JSON.parse(req);
       Logging.logs(reqBody, 'trace');
        const params: PutItemCommandInput = {
            TableName: tableName,
            Item:  {
                'id': {S: reqBody.id} ,
                'status': {S: reqBody.status},
                'compliantStatus': {S: reqBody.compliantStatus},
                'Date': {S: reqBody.date}

        }
    };
        Logging.logs(params, 'trace');
        try {
            if ( !reqBody.id ) {
                Logging.logs('invalid user id', 'error');
                throw new ExceptionError(ERROR_MSGS.USERID_NOT_FOUND);
            }
            const results = await client.send(new PutItemCommand(params));
            Logging.logs(results, 'info');
            return {
                statusCode: RESP_TEMPLATE.successRequestCode,
                body: JSON.stringify(results),
                'isBase64Encoded': false,
                headers: RESP_TEMPLATE.headers
            };
        } catch (err) {
            Logging.logs(err, 'error');
            return {
                statusCode: RESP_TEMPLATE.badRequestError,
                body: JSON.stringify(err),
                'isBase64Encoded': false,
                headers: RESP_TEMPLATE.headers
            };
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
                statusCode: RESP_TEMPLATE.successRequestCode,
                body: JSON.stringify(results),
                'isBase64Encoded': false,
                headers: RESP_TEMPLATE.headers
            };
          } catch (err) {
            Logging.logs(JSON.stringify(err), 'error');
            return {
                statusCode: RESP_TEMPLATE.badRequestError,
                body: JSON.stringify(err),
                'isBase64Encoded': false,
                headers: RESP_TEMPLATE.headers
            };
          }
    }

    static async deleteUser(reqBody: any) {
            Logging.logs(JSON.stringify(reqBody), 'trace');
            const params: DeleteItemCommandInput = {
            TableName: tableName,
            Key: {
              'id': {S: reqBody.pathParameters.id},
              'status': {S: reqBody.body.status}
            }
          };
            try {
                if ( !reqBody.id ) {
                    Logging.logs('invalid user id', 'error');
                    throw new ExceptionError(ERROR_MSGS.USERID_NOT_FOUND);
                }
                if ( !reqBody.status ) {
                    Logging.logs('invalid user id', 'error');
                    throw new ExceptionError(ERROR_MSGS.INITIAL_STATUS_NOT_FOUND);
                }
                const results = await client.send(new DeleteItemCommand(params));
                Logging.logs(results, 'info');
                return {
                    statusCode: RESP_TEMPLATE.successRequestCode,
                    body: JSON.stringify(results),
                    'isBase64Encoded': false,
                    headers: RESP_TEMPLATE.headers
                };
            } catch (err) {
                Logging.logs(err, 'error');
                return {
                    statusCode: RESP_TEMPLATE.badRequestError,
                    body: JSON.stringify(err),
                    'isBase64Encoded': false,
                    headers: RESP_TEMPLATE.headers
                };
            }
        }

        static async updateUser(reqBody: any) {
           Logging.logs(JSON.stringify(reqBody), 'trace');
            const params: UpdateItemCommandInput = {
            TableName: tableName,
            Key: {
                'id': {S: reqBody.id},
                'status': { S: reqBody.status}
              },
            UpdateExpression: 'set compliantStatus = :r',
            ExpressionAttributeValues: {
              ':r': {
                  S: reqBody.compliantStatus
            }
            }
          };
            try {
                if ( !reqBody.id ) {
                    Logging.logs('invalid user id', 'error');
                    throw new ExceptionError(ERROR_MSGS.USERID_NOT_FOUND);
                }
                if ( !reqBody.status ) {
                    Logging.logs('invalid user id', 'error');
                    throw new ExceptionError(ERROR_MSGS.INITIAL_STATUS_NOT_FOUND);
                }
                const results = await client.send(new UpdateItemCommand(params));
                Logging.logs(results, 'info');
                return {
                    statusCode: RESP_TEMPLATE.successRequestCode,
                    body: JSON.stringify(results),
                    'isBase64Encoded': false,
                    headers: RESP_TEMPLATE.headers
                };
            } catch (err) {
                Logging.logs(err, 'error');
                return {
                    statusCode: RESP_TEMPLATE.badRequestError,
                    body: JSON.stringify(err),
                    'isBase64Encoded': false,
                    headers: RESP_TEMPLATE.headers
                };
            }
        }

}