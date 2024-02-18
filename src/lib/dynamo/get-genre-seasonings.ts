import { Ingredient, ingredientNames } from "@/domain/ingredient";
import { Seasoning } from "@/domain/seasoning";
import {
  AttributeValue,
  DynamoDBClient,
  QueryCommand,
  QueryCommandInput,
} from "@aws-sdk/client-dynamodb";

interface Props {
  genre: string;
}

export const getGenreSeasonings = async ({
  genre,
}: Props): Promise<Seasoning[]> => {
  const params: QueryCommandInput = {
    TableName: "seasoning-recipes",
    IndexName: "genre-index",
    KeyConditionExpression: "genre = :genre",
    ExpressionAttributeValues: {
      ":genre": { S: genre },
    },
  };

  try {
    const dynamoDBClient = new DynamoDBClient({
      region: "ap-northeast-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
    const result = await dynamoDBClient.send(new QueryCommand(params));
    if (!result.Items) throw new Error("No items");

    const seasonings = result.Items?.map((item) => convertToSeasoning(item));
    return seasonings;
  } catch (dbError) {
    console.error("Error", dbError);
    throw new Error();
  }
};

const convertToIngredient = (
  item: Record<string, AttributeValue>
): Ingredient[] => {
  const ingredients = ingredientNames.map((ingredientName) => {
    if (item[ingredientName.en]) {
      return new Ingredient(
        ingredientName.en,
        // NOTE: 値は必ず存在するものとする(個人で使うサービスのため許容)
        Ingredient.convertToSize(item[ingredientName.en]?.M?.size.S!)!.en,
        Number(item[ingredientName.en]?.M?.quantity.N)
      );
    }
  });

  return ingredients.filter(
    (ingredient) => ingredient !== undefined
  ) as Ingredient[];
};

const convertToSeasoning = (
  item: Record<string, AttributeValue>
): Seasoning => {
  const name = item.name.S;
  const genre = item.genre.S;
  const ingredients = convertToIngredient(item);

  const convertedGenre = Seasoning.convertToGenre(genre || "");
  if (!name) throw new Error("Invalid name");
  if (!convertedGenre) throw new Error("Invalid genre");
  if (!ingredients) throw new Error("Invalid ingredients");

  return new Seasoning(name, convertedGenre, ingredients);
};
