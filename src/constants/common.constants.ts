export const INITIAL_STATUS =  {

    initialCompliantStatus : '    Non-Compliant',
    initialUserStatus: 'pending',
    NA_Status: 'NA'

};
export const RESP_TEMPLATE = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
    badRequestError: 400,
    successRequestCode: 200
};

export const ERROR_MSGS = {
    USERID_NOT_FOUND : 'User Id is not found or invalid in the request',
    INITIAL_STATUS_NOT_FOUND: 'User status required to query the user details'


};