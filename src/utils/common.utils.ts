
import { INITIAL_STATUS , ERROR_MSGS, RESP_TEMPLATE }  from '../constants/common.constants';
import  moment from 'moment';
import { UsersModel } from '../models/user.models';
import { BusinessExceptionError } from '../exceptions/exceptions';
import  { unmarshall } from '@aws-sdk/util-dynamodb';
import KSUID from 'ksuid';

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


    static dataUnMarshall(items: any) {
        const unmarshalledItems: any = [];
        items.forEach((element: any) => {
            const itemsU = unmarshall(element);
            unmarshalledItems.push(itemsU);
        });
        return unmarshalledItems;
    }

    static  async generateUserId() {
        const userId = await KSUID.random();
        return userId;
    }
}
