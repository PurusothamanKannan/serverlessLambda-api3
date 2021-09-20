"use strict";
import {userService} from'./../services/userService'
class userApi {

  static getUserInfo(event:any,context:any){
    const reqBody = event.body
    return new Promise(async (resolve, reject) => {
      try {
          const result = userService.getUser(reqBody);
          resolve(result);
      } catch (error) {
          reject(error);
      }
  });

  }
  static deleteUserInfo(event:any,context:any){
    const reqBody = event.body
    return new Promise(async (resolve, reject) => {
      try {
          const result = userService.deleteUser(reqBody);
          resolve(result);
      } catch (error) {
          reject(error);
      }
  });

  }
  static addUserInfo(event:any,context:any){
    const reqBody = event.body
    return new Promise(async (resolve, reject) => {
      try {
          const result = userService.addUser(reqBody);
          resolve(result);
      } catch (error) {
          reject(error);
      }
  });

  }
}

export const getUser = userApi.getUserInfo;
export const addUser= userApi.addUserInfo;
export const deleteUser = userApi.deleteUserInfo;