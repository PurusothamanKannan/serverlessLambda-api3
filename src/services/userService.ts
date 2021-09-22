import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import {  ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import { DeleteItemCommand, DeleteItemCommandInput , UpdateItemCommand,UpdateItemCommandInput} from "@aws-sdk/client-dynamodb";
import { AWS_CONFIG } from "src/constants/aws.constants";
import { INITIAL_STATUS,RESP_TEMPLATE } from "src/constants/common.constants";
const client = new DynamoDBClient({ region: AWS_CONFIG.region });

const  tableName= "usersTable";
export class userService{

    static async addUser(req:any){
        console.log(req)
       let reqBody = JSON.parse(req)
       console.log(reqBody)
        const params: PutItemCommandInput = {
            TableName: tableName,
            Item:  {
                "id":{S:reqBody.id} ,
                "status": {S:reqBody.status},
                "compliantStatus": {S:INITIAL_STATUS.initialCompliantStatus}
              }
            
        };
        try {
            const results = await client.send(new PutItemCommand(params));
            console.log(results);
            return {
                statusCode:RESP_TEMPLATE.successRequestCode,
                body:JSON.stringify(results),
                "isBase64Encoded": false,
                headers: RESP_TEMPLATE.headers
            };
        } catch(err) {
            console.error(err);
            return {
                statusCode:RESP_TEMPLATE.badRequestError,
                body:JSON.stringify(err),
                "isBase64Encoded": false,
                headers: RESP_TEMPLATE.headers
            };
        }
        
    }
    static async getUser(reqBody:any){
        const params: ScanCommandInput = {
            TableName: tableName
        };
        
        try {

            const results = await client.send(new ScanCommand(params));
            console.log(results)
            return {
                statusCode:RESP_TEMPLATE.successRequestCode,
                body:JSON.stringify(results),
                "isBase64Encoded": false,
                headers:RESP_TEMPLATE.headers
                
            };
          } catch (err) {
            console.error(err);
            return {
                statusCode:RESP_TEMPLATE.badRequestError,
                body:JSON.stringify(err),
                "isBase64Encoded": false,
                headers: RESP_TEMPLATE.headers
            };
          }
    }
    

        static async deleteUser(reqBody:any){
            
            const params:DeleteItemCommandInput ={
            TableName: tableName,
            Key: {
              "id": {S:reqBody.pathParameters.id},
              "status":{S:reqBody.body.status}
             
            
            }
          };
            try {
                const results = await client.send(new DeleteItemCommand(params));
                console.log(results)
                return {
                    statusCode:RESP_TEMPLATE.successRequestCode,
                    body:JSON.stringify(results),
                    "isBase64Encoded": false,
                    headers: RESP_TEMPLATE.headers
                };
            } catch(err) {
                console.error(err)
                return {
                    statusCode:RESP_TEMPLATE.badRequestError,
                    body:JSON.stringify(err),
                    "isBase64Encoded": false,
                    headers: RESP_TEMPLATE.headers
                };
            }
    
        }

        static async updateUser(reqBody:any){
           console.log(reqBody)
            const params:UpdateItemCommandInput =
            {
            TableName: tableName,
            Key: {
                "id": {S:reqBody.id},
                "status":{S:reqBody.status}
 
              },
            UpdateExpression: 'set compliantStatus = :r',
            ExpressionAttributeValues: {
              ":r": { 
                  S:reqBody.compliantStatus
            }
            }
          };
            try {
                const results = await client.send(new UpdateItemCommand(params));
                console.log(results)
                return {
                    statusCode:RESP_TEMPLATE.successRequestCode,
                    body:JSON.stringify(results),
                    "isBase64Encoded": false,
                    headers: RESP_TEMPLATE.headers
                };
            } catch(err) {
                console.error(err)
                return {
                    statusCode:RESP_TEMPLATE.badRequestError,
                    body:JSON.stringify(err),
                    "isBase64Encoded": false,
                    headers: RESP_TEMPLATE.headers
                };
            }
    
        }

}