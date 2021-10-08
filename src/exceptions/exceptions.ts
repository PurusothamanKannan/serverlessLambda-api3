
import { IErrorModel } from '../models/error.models';
import { RESP_TEMPLATE , ERROR_CODE } from '../constants/common.constants';

export class BaseError extends Error {

    constructor(error: IErrorModel) {
        console.log(error);
        super(`[${error.code}] ${error.errorType} - ${error.message}`);
    }

}
export class SystemExceptionError {

    constructor(err: string) {
        return {
            statusCode: ERROR_CODE.SYSTEM_EXCEPTION_CODE ,
            body: JSON.stringify({erroMessage: err, errorType: 'System Exception'}),
            'isBase64Encoded': false,
            headers: RESP_TEMPLATE.HEADERS
        };
    }

}

export class BusinessExceptionError  {
    constructor(err: string) {
        return {
            statusCode: ERROR_CODE.BUSINESS_EXCEPTION_CODE,
            body: JSON.stringify({erroMessage: err, errorType: 'Business Exception'}),
            'isBase64Encoded': false,
            headers: RESP_TEMPLATE.HEADERS
        };
    }
}

