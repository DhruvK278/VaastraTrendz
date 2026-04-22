import { Request, Response } from 'express';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  GetCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { getAgentResponse } from '../services/agentService';

// ── DynamoDB client ──────────────────────────────────────
const ddbClient = new DynamoDBClient({
  region: process.env.AWS_REGION_1 || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_1 || '',
    secretAccessKey: process.env.AWS_SECRET_KEY_1 || '',
  },
});

const ddb = DynamoDBDocumentClient.from(ddbClient);
const TABLE = () => process.env.DYNAMODB_TABLE_NAME || 'support-tickets';

// ── Rate-limit helper ────────────────────────────────────
const daysSinceEpoch = (): number => {
  const start = new Date('2021-09-14');
  return Math.floor((Date.now() - start.getTime()) / (1000 * 60 * 60 * 24));
};

const getTotalRuns = async (): Promise<number> => {
  const data = await ddb.send(new ScanCommand({ TableName: TABLE() }));
  return data.Items?.length ?? 0;
};

// ── Controllers ──────────────────────────────────────────

export const getAllTickets = async (_req: Request, res: Response) => {
  try {
    // AWS Bypassed for testing
    // const data = await ddb.send(new ScanCommand({ TableName: TABLE() }));
    res.status(200).json([]);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const createTicket = async (req: Request, res: Response) => {
  try {
    // AWS Bypassed for testing
    // const totalRuns = await getTotalRuns();
    // if (totalRuns > daysSinceEpoch() * 100) {
    //   return res.status(429).json({ message: 'Daily limit of 100 AI resolutions reached' });
    // }

    const agentInput = {
      issue: req.body.issue,
      description: req.body.issue_description,
    };

    const agentResult = await getAgentResponse(agentInput);

    const status = agentResult.confidence_score >= 80 ? 'Auto-Resolved' : 'Pending Review';

    const item = {
      id: Math.floor(Math.random() * 10000).toString(),
      customer_name: req.body.customer_name,
      customer_email: req.body.customer_email,
      issue: req.body.issue,
      issue_description: req.body.issue_description,
      resolution: agentResult.resolution,
      resolution_description: agentResult.resolution_description,
      confidence_score: agentResult.confidence_score,
      status,
      date: new Date().toISOString(),
    };

    // AWS Bypassed for testing
    // await ddb.send(new PutCommand({ TableName: TABLE(), Item: item }));
    res.status(201).json(item);
  } catch (error: any) {
    console.error('createTicket error:', error);
    res.status(400).json({ message: error.message });
  }
};

export const getTicket = async (req: Request, res: Response) => {
  try {
    // AWS Bypassed for testing
    // const data = await ddb.send(
    //   new GetCommand({ TableName: TABLE(), Key: { id: req.params.id } })
    // );
    res.status(200).json({});
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTicket = async (req: Request, res: Response) => {
  try {
    // AWS Bypassed for testing
    // const data = await ddb.send(
    //   new UpdateCommand({
    //     TableName: TABLE(),
    //     Key: { id: req.params.id },
    //     UpdateExpression:
    //       'SET resolution = :resolution, resolution_description = :resolution_description, #s = :status',
    //     ExpressionAttributeNames: { '#s': 'status' },
    //     ExpressionAttributeValues: {
    //       ':resolution': req.body.resolution,
    //       ':resolution_description': req.body.resolution_description,
    //       ':status': 'Manually Resolved',
    //     },
    //     ReturnValues: 'ALL_NEW',
    //   })
    // );
    res.status(200).json({ status: 'Manually Resolved' });
  } catch (error: any) {
    console.error('updateTicket error:', error);
    res.status(400).json({ message: error.message });
  }
};
