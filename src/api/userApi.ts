
import { UserService } from'./../services/userService';
import { CommonUtils } from '..//utils/common.utils';
class UserApi {

  static  getUserInfo(event: any, context: any) {

      try {
          const reqBody = event.body;
          const result = UserService.getUser(reqBody);
          return result;
      } catch (error) {
          console.log(error);
         return error;
      }


  }
  static async deleteUserInfo(event: any, context: any) {
      try {
          const reqBody = await CommonUtils.validateDeleteUser(JSON.parse(event.body));
          const result = UserService.deleteUser(reqBody);
         return result;
      } catch (error) {
          return error;
      }

  }
  static async addUserInfo(event: any, context: any) {

      try {
          const reqBody = await CommonUtils.validateUser(JSON.parse(event.body));
          const result = UserService.addUser(reqBody);
          return result;
      } catch (error) {
        console.log('add user catch block', error);
         return error;
      }


  }

  static async updateUserInfo(event: any, context: any) {
      try {
          const reqBody = await CommonUtils.validateUpdateUser(JSON.parse(event.body), event.pathParameters.id);
          const result = UserService.updateUser(reqBody);
          return result;
      } catch (error) {
         return error;
      }
  }
}

export const getUser = UserApi.getUserInfo;
export const addUser = UserApi.addUserInfo;
export const deleteUser = UserApi.deleteUserInfo;
export const updateUser = UserApi.updateUserInfo;