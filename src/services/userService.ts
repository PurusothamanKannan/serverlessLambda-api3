import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import {  ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import { DeleteItemCommand, DeleteItemCommandInput } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const dbclient = new DynamoDBClient({ region: "us-east-1" });
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
                "status": {S:reqBody.status}
              }
            
        };
        try {
            const results = await client.send(new PutItemCommand(params));
            console.log(results);
            return {
                statusCode:200,
                body:JSON.stringify(results),
                "isBase64Encoded": false,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            };
        } catch(err) {
            console.error(err);
            return {
                statusCode:400,
                body:JSON.stringify(err),
                "isBase64Encoded": false,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            };
        }
        
    }
    static async getUser(reqBody:any){
        const params: ScanCommandInput = {
            TableName: tableName
        };
        
        try {

            const results = await dbclient.send(new ScanCommand(params));
            console.log(results)
            return {
                statusCode:200,
                body:JSON.stringify(results),
                "isBase64Encoded": false,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            };
          } catch (err) {
            console.error(err);
            return {
                statusCode:400,
                body:JSON.stringify(err),
                "isBase64Encoded": false,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            };
          }
    }
    

        static async deleteUser(reqBody:any){
            let status="Pending";
            const params:DeleteItemCommandInput ={
            TableName: tableName,
            Key: {
              "id": {S:reqBody.pathParameters.id},
              "status":{S:status}
             
            
            }
          };
            try {
                const results = await client.send(new DeleteItemCommand(params));
                console.log(results)
                return {
                    statusCode:200,
                    body:JSON.stringify(results),
                    "isBase64Encoded": false,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    }
                };
            } catch(err) {
                console.error(err)
                return {
                    statusCode:400,
                    body:JSON.stringify(err),
                    "isBase64Encoded": false,
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                    }
                };
            }
    
        }
}