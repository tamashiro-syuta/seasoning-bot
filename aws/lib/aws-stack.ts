import * as cdk from 'aws-cdk-lib';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class AwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const table = new Table(this, "seasoning-recipes", {
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

    table.addGlobalSecondaryIndex({
      indexName: "genre-index",
      partitionKey: {
        name: "genre",
        type: AttributeType.STRING,
      },
    });

    // DBで必須なカラム
    // - name: string (パーティションキー)
    // - genre: string (ソートキー かつ GSI)
    // 任意のカラム
    // 各種調味料: string
  }
}
