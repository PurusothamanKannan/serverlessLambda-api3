
import { IErrorModel } from '../models/error.models';
import { Logging } from '../utils/logger.utils';
export class ExceptionError extends Error {

    constructor(err: string) {
        const error: IErrorModel = {
            message: err,
            code: 500,
            errorType: 'exceptionalError'
        };
        Logging.logs(err, 'error' );
        super( `[${error.code}] ${error.errorType} - ${error.message}`) ;
    }

}

export class BusinessExceptionError extends Error {

    constructor(err: string) {
        const error: IErrorModel = {
            message: err,
            code: 404,
            errorType: 'Business Exception'
        };
        Logging.logs(err, 'error' );
        super( `[${error.code}] ${error.errorType} - ${error.message}`) ;
    }

}