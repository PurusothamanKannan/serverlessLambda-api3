
import { INITIAL_STATUS , ERROR_MSGS }  from '../constants/common.constants';
import  moment from 'moment';
import { UsersModel } from '../models/user.models';
import { ExceptionError } from '../exceptions/exceptions';
import { Logging } from './logger.utils';

export class CommonUtils {

    static async validateStatus(status: string) {

        if (status.toLowerCase() === INITIAL_STATUS.initialUserStatus) {
            return status;
        }
        else {
            return INITIAL_STATUS.NA_Status;
        }

    }

    static async validateUser(data: any) {
        const userData = new UsersModel('', '', '', '', '');
        if ( data && data.id && data.userName && data.complainStatus && data.status ) {
              if ( typeof data.id === 'string') {
                if ( ! (data.id.lastIndexOf(INITIAL_STATUS.userId_template, 0) === 0) ) {
                    throw new ExceptionError(ERROR_MSGS.USERID_NOT_VALID );
                }
              }
              if ( ! (data.complainStatus == INITIAL_STATUS.initialCompliantStatus) ) {
                throw new ExceptionError(ERROR_MSGS.COMPLIANTSTATUS_INVALID);
            }
              if ( !(data.status == INITIAL_STATUS.initialUserStatus) ) {
                throw new ExceptionError(ERROR_MSGS.INITIAL_STATUS_INVALD );
              }
           userData.id = data.id;
           userData.complainStatus = data.compliantStatus;
           userData.status = data.status;
           userData.userName = data.userName;
           userData.date = (await this.dateFormatter(new Date())).toString();
         return userData;
         }
        else {
            throw new ExceptionError(ERROR_MSGS.INVALID_DATA );
        }
    }

    static async dateFormatter(date: Date) {

        return moment(date).format('DD-MM-YYYY[T]HH:mm:ss');
    }

    static async validateUpdateUser(data: any) {
        const userData = new UsersModel('', '', '', '', '');
        if ( data && data.id && data.compliantStatus) {
           userData.id = data.id;
           userData.complainStatus = data.compliantStatus;
           userData.status = data.status;
        }
        else {
            throw new ExceptionError(ERROR_MSGS.INVALID_DATA );
        }
    }

    static async validateDeleteUser(data: any) {
        const userData = new UsersModel('', '', '', '', '');
        if ( data && data.id && data.status) {
           userData.id = data.id;
           userData.status = data.status;
        }
        else {
            throw new ExceptionError(ERROR_MSGS.INVALID_DATA );
        }
    }
}
