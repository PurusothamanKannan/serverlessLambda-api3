
import { UserService } from'./../services/userService';
class UserApi {

  static getUserInfo(event: any, context: any) {
    const reqBody = event.body;
    console.log(event);
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
  static deleteUserInfo(event: any, context: any) {
    const reqBody = event;
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
  static addUserInfo(event: any, context: any) {
    const reqBody = event.body;
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

  static updateUserInfo(event: any, context: any) {
    const reqBody = event.body;
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