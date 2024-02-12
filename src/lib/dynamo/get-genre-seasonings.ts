import {
  DynamoDBClient,
  QueryCommand,
  QueryCommandInput,
} from '@aws-sdk/client-dynamodb'

interface Props {
  genre: string;
}

export const getGenreSeasonings = async ({ genre }: Props): Promise<any> => {
  const params: QueryCommandInput = {
      TableName: 'seasoning-recipes',
      IndexName: 'genre-index',
      KeyConditionExpression: 'genre = :genre',
      ExpressionAttributeValues: {
        ':genre': { S: genre },
      },
    }

  try {
    const dynamoDBClient = new DynamoDBClient({})
    const result = await dynamoDBClient.send(new QueryCommand(params))

    console.log(result)

    return result
    } catch (dbError) {
      return { statusCode: 500, body: JSON.stringify(dbError) };
  }
};
