import { DynamoDBClient, DeleteItemCommand, DeleteItemCommandInput } from "@aws-sdk/client-dynamodb";
const client = new DynamoDBClient({ region: "us-east-1" });
export class deleteInfoService{

    static async deleteInfo(reqBody:any){
        let tableName= "reviewRequest-serverless";
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