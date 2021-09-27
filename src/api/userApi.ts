
import { UserService } from'./../services/userService';
import { CommonUtils } from '..//utils/common.utils';
class UserApi {

  static  getUserInfo(event: any, context: any) {
    const reqBody = event.body;
    return new Promise(async (resolve, reject) => {
      try {
          const result = UserService.getUser(reqBody);
          resolve(result);
      } catch (error) {
          console.log(error);
          reject(error);
      }
  });

  }
  static async deleteUserInfo(event: any, context: any) {
    const reqBody = await CommonUtils.validateDeleteUser(event.body);
    console.log(event);
    return new Promise(async (resolve, reject) => {
      try {
          const result = UserService.deleteUser(reqBody);
          resolve(result);
      } catch (error) {
          reject(error);
      }
  });

  }
  static async addUserInfo(event: any, context: any) {

    const reqBody = await CommonUtils.validateUser(event.body);
    console.log(event);
    return new Promise(async (resolve, reject) => {
      try {
          const result = UserService.addUser(reqBody);
          resolve(result);
      } catch (error) {
          reject(error);
      }
  });

  }

  static async updateUserInfo(event: any, context: any) {
    const reqBody = await CommonUtils.validateUpdateUser(event.body);
    console.log(event);
    return new Promise(async (resolve, reject) => {
      try {
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