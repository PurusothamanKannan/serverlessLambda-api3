import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
import {  ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";
import { DeleteItemCommand, DeleteItemCommandInput } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1" });
const dbclient = new DynamoDBClient({ region: "us-east-1" });
const  tableName= "usersTable";
export class userService{

    static async addUser(reqBody:any){
       
        const params: PutItemCommandInput = {
            TableName: tableName,
            Item:  {
                id: reqBody.id,
                status: reqBody.status   
              }
            
        };
        try {
            const results = await client.send(new PutItemCommand(params));
            console.log(results);
            return results;
        } catch(err) {
            console.error(err);
            return err;
        }
        
    }
    static async getUser(reqBody:any){
        const params: ScanCommandInput = {
            TableName: tableName
        };
        
        try {
            const results = await dbclient.send(new ScanCommand(params));
            return results;
          } catch (err) {
            console.error(err);
            return err;
          }
    }
    

        static async deleteUser(reqBody:any){
     
            const params:DeleteItemCommandInput ={
            TableName: tableName,
            Key: {
              id: reqBody.pathParameters.id
            
            }
          };
            try {
                const results = await client.send(new DeleteItemCommand(params));
                console.log(results)
            } catch(err) {
                console.error(err)
            }
    
        }
}