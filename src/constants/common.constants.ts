export const INITIAL_STATUS =  {

    INITIAL_COMPLAINT_STATS : 'Non-Compliant',
    INITIAL_USER_STATUS: 'pending',
    NA_STATUS: 'NA',
    USERID_TEMPLATE: 'USER_'

};
export const RESP_TEMPLATE = {
    HEADERS: {
        'Access-Control-Allow-Origin': '*',
    },
    BAD_REQUEST_ERROR: 400,
    SUCCESS_RESPONSE_CODE: 200
};

export const ERROR_MSGS = {
    USERID_NOT_FOUND : 'User Id is not found or invalid in the request',
    INITIAL_STATUS_NOT_FOUND: 'User status required to query the user details',
    USERID_NOT_VALID: 'User not strats with desired format(USER_)',
    COMPLIANTSTATUS_INVALID: 'Initial Complaint status is invalid',
    INITIAL_STATUS_INVALD: 'Initial user status is invalid',
    INVALID_DATA: 'one or more User data is invalid '
};
