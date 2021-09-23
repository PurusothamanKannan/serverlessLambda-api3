
import { IErrorModel } from '../models/error.models';
export class ExceptionError extends Error {

    constructor(err: string) {
        const error: IErrorModel = {
            message: err,
            code: 500,
            errorType: 'exceptionalError'
        };
        super( error.toString()) ;
    }

}