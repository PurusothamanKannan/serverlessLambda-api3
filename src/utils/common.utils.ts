
import { INITIAL_STATUS } from '../constants/common.constants';
import  moment from 'moment';

export class CommonUtils {

    static async validatestatus(status: string) {

        if (status.toLowerCase() === INITIAL_STATUS.initialUserStatus) {
            return status;
        }
        else {
            return INITIAL_STATUS.NA_Status;
        }

    }

    static async dateFormatter(date: Date) {

        return moment(date).format('DD-MM-YYYY[T]HH:mm:ss');
    }

}