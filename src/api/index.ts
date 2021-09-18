"use strict";
import {getInfoService} from'./../services/getInfo.service'
import {deleteInfoService} from './../services/deleteInfo.service'
import {addInfoService} from './../services/addInfo.service'
class userApi {

  static getInfo(event:any,context:any){
    const reqBody = event.body
    return new Promise(async (resolve, reject) => {
      try {
          const result = getInfoService.getInfo(reqBody);
          resolve(result);
      } catch (error) {
          reject(error);
      }
  });

  }
  static deleteInfo(event:any,context:any){
    const reqBody = event.body
    return new Promise(async (resolve, reject) => {
      try {
          const result = deleteInfoService.deleteInfo(reqBody);
          resolve(result);
      } catch (error) {
          reject(error);
      }
  });

  }
  static addInfo(event:any,context:any){
    const reqBody = event.body
    return new Promise(async (resolve, reject) => {
      try {
          const result = addInfoService.addInfo(reqBody);
          resolve(result);
      } catch (error) {
          reject(error);
      }
  });

  }
}

export const getInfo = userApi.getInfo;
export const deleteInfo = userApi.deleteInfo;
export const addInfo = userApi.addInfo;