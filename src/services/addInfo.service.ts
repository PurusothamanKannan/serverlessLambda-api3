import { DynamoDBClient, PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient({ region: "us-east-1" });
export class addInfoService{

    static async addInfo(reqBody:any){
        let tableName= "reviewRequest-serverless";
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
}