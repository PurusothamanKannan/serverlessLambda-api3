
import { INITIAL_STATUS , ERROR_MSGS, RESP_TEMPLATE }  from '../constants/common.constants';
import  moment from 'moment';
import { SystemExceptionError } from '../exceptions/exceptions';
import { UsersModel } from '../models/user.models';
import { BusinessExceptionError } from '../exceptions/exceptions';
import { Logging } from './logger.utils';
import { AWS_CONFIG, DDB } from '../constants/aws.constants';
import {  AttributeValue, DynamoDBClient, ScanCommand, ScanCommandInput } from '@aws-sdk/client-dynamodb';
import  { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
const client = new DynamoDBClient({ region: AWS_CONFIG.region });

const  tableName = DDB.tableName;
export class CommonUtils {

    static async validateStatus(status: string) {
        if (status.toLowerCase() === INITIAL_STATUS.INITIAL_USER_STATUS) {
            return status;
        }
        else {
            return INITIAL_STATUS.NA_STATUS;
        }

    }

    static async validateUser(data: any) {
        console.log(data);
        if ( data  && data.userName && data.compliantStatus && data.status ) {
              if ( ! (data.compliantStatus == INITIAL_STATUS.INITIAL_COMPLAINT_STATS) ) {
                throw new BusinessExceptionError(ERROR_MSGS.COMPLIANTSTATUS_INVALID);
            }
              if ( !(data.status == INITIAL_STATUS.INITIAL_USER_STATUS) ) {
                throw new BusinessExceptionError(ERROR_MSGS.INITIAL_STATUS_INVALD );
              }
           const userData = new UsersModel(data);
           userData.date = (await this.dateFormatter(new Date())).toString();
           return userData;
         }
        else {
            throw new BusinessExceptionError(ERROR_MSGS.INVALID_DATA );
        }
    }

    static async dateFormatter(date: Date) {

        return moment(date).format('DD-MM-YYYY[T]HH:mm:ss');
    }

    static async validateUpdateUser(data: any, id: string) {
        if ( data && id && data.compliantStatus) {
            const userData = new UsersModel(data);
            userData.id = id;
            return userData;
        }
        else {
            throw new BusinessExceptionError(ERROR_MSGS.INVALID_DATA );
        }
    }

    static async validateDeleteUser(data: any) {
        if ( data && data.id) {
            const userData = new UsersModel(data);
            return userData;
        }
        else {

            throw new BusinessExceptionError(ERROR_MSGS.INVALID_DATA );
        }
    }

    static async getLastUserId() {

        const params: ScanCommandInput = {
            TableName: tableName,
            Limit: 1,
            ProjectionExpression: 'info.id,info.status,info.userName,info.compliantStatus'
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

    static ddbDataUnMarshall(items: any) {
        const unmarshalledItems: any = [];
        items.forEach((element: any) => {
            const itemsU = unmarshall(element);
            unmarshalledItems.push(itemsU);
        });
        return unmarshalledItems;
    }
}
