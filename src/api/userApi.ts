
import { UserService } from'./../services/userService';
import { CommonUtils } from '..//utils/common.utils';
class UserApi {

  static  getUserInfo(event: any, context: any) {

    return new Promise(async (resolve, reject) => {
      try {
          const reqBody = event.body;
          const result = UserService.getUser(reqBody);
          resolve(result);
      } catch (error) {
          console.log(error);
          reject(error);
      }
  });

  }
  static async deleteUserInfo(event: any, context: any) {
    console.log(event);
    return new Promise(async (resolve, reject) => {
      try {
          const reqBody = await CommonUtils.validateDeleteUser(JSON.parse(event.body));
          const result = UserService.deleteUser(reqBody);
          resolve(result);
      } catch (error) {
          reject(error);
      }
  });

  }
  static async addUserInfo(event: any, context: any) {

    console.log(event);
    return new Promise(async (resolve, reject) => {
      try {
          const reqBody = await CommonUtils.validateUser(JSON.parse(event.body));
          const result = UserService.addUser(reqBody);
          resolve(result);
      } catch (error) {
        console.log(error);
          reject(error);
      }
  });

  }

  static async updateUserInfo(event: any, context: any) {
    console.log(event);
    return new Promise(async (resolve, reject) => {
      try {
          const reqBody = await CommonUtils.validateUpdateUser(JSON.parse(event.body), event.pathParameters.id);
          const result = UserService.updateUser(reqBody);
          resolve(result);
      } catch (error) {
          reject(error);
      }
  });

  }
}

export const getUser = UserApi.getUserInfo;
export const addUser = UserApi.addUserInfo;
export const deleteUser = UserApi.deleteUserInfo;
export const updateUser = UserApi.updateUserInfo;