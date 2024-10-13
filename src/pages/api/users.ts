import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("Cadastre"); // Replace with your actual database name

    switch (req.method) {
      case 'GET':
        const users = await db.collection("users").find({}).toArray();
        res.status(200).json(users);
        break;
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
}