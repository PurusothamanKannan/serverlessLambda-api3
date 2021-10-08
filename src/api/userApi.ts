
import { UserService } from'./../services/userService';
import { CommonUtils } from '..//utils/common.utils';
import { ERROR_CODE, RESP_TEMPLATE } from '../constants/common.constants';
class UserApi {

  static async getUserInfo(event: any, context: any) {

      try {
          const reqBody = event.body;
          const result = await UserService.getUser(reqBody);
          return result;
      } catch (error: any) {
          console.log(error);
          return  {
            statusCode: error.statusCode || ERROR_CODE.SYSTEM_EXCEPTION_CODE ,
            body: error.body ? error.body : JSON.stringify(error),
            'isBase64Encoded': false,
            headers: RESP_TEMPLATE.HEADERS
        };
      }


  }
  static async deleteUserInfo(event: any, context: any) {
      try {
          const reqBody = await CommonUtils.validateDeleteUser(JSON.parse(event.body));
          const result = UserService.deleteUser(reqBody);
         return result;
      } catch (error: any) {
          return  {
            statusCode: error.statusCode || ERROR_CODE.SYSTEM_EXCEPTION_CODE ,
            body: error.body ? error.body : JSON.stringify(error),
            'isBase64Encoded': false,
            headers: RESP_TEMPLATE.HEADERS
        };
      }

  }
  static async addUserInfo(event: any, context: any) {

      try {
          const reqBody = await CommonUtils.validateUser(JSON.parse(event.body));
          const result = UserService.addUser(reqBody);
          return result;
      } catch (error: any) {
        console.log('add user catch block', error);
         return  {
            statusCode: error.statusCode || ERROR_CODE.SYSTEM_EXCEPTION_CODE ,
            body: error.body ? error.body : JSON.stringify(error),
            'isBase64Encoded': false,
            headers: RESP_TEMPLATE.HEADERS
        };
      }


  }

  static async updateUserInfo(event: any, context: any) {
      try {
          const reqBody = await CommonUtils.validateUpdateUser(JSON.parse(event.body), event.pathParameters.id);
          const result = UserService.updateUser(reqBody);
          return result;
      } catch (error: any) {
        return  {
            statusCode: error.statusCode || ERROR_CODE.SYSTEM_EXCEPTION_CODE ,
            body: error.body ? error.body : JSON.stringify(error),
            'isBase64Encoded': false,
            headers: RESP_TEMPLATE.HEADERS
        };
      }
  }
}

export const getUser = UserApi.getUserInfo;
export const addUser = UserApi.addUserInfo;
export const deleteUser = UserApi.deleteUserInfo;
export const updateUser = UserApi.updateUserInfo;