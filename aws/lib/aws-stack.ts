import * as cdk from "aws-cdk-lib";
import { AttributeType, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class AwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const seasoningsTable = new Table(this, "seasoning-recipes", {
      partitionKey: {
        name: "name",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "genre",
        type: AttributeType.STRING,
      },
      tableName: "seasoning-recipes",
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    const likesTable = new Table(this, "likes", {
      partitionKey: {
        name: "userId",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "recipeId",
        type: AttributeType.STRING,
      },
      tableName: "likes",
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });

    seasoningsTable.addGlobalSecondaryIndex({
      indexName: "genre-index",
      partitionKey: {
        name: "genre",
        type: AttributeType.STRING,
      },
    });

    likesTable.addGlobalSecondaryIndex({
      indexName: "recipeId-index",
      partitionKey: {
        name: "recipeId",
        type: AttributeType.STRING,
      },
    });
  }
}
