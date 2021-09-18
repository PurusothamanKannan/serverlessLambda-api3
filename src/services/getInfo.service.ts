
import { DynamoDBClient, ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";
const dbclient = new DynamoDBClient({ region: "us-east-1" });
export class getInfoService{

    static async getInfo(reqBody:any){
        let tableName= "reviewRequest-serverless";
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
}