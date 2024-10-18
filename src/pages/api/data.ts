import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const client = await clientPromise;
            const db = client.db("Cadastre");
        
            const demandeTotals = await db.collection("users").countDocuments({}); // Count all requests
            const demandeDelimitation = await db.collection("users").countDocuments({ formTitle: 'Demander une deuxième délimitation' });
            const nonCadastre = await db.collection("users").countDocuments({ formTitle: 'Demander d\'enregistrer une propriété foncière non cadastrée' });
            const fraude = await db.collection("users").countDocuments({ formTitle: 'Signaler une fraude immobilière' });
            const conflit = await db.collection("users").countDocuments({ formTitle: 'Déclarer un conflit' });
            const miseAJour = await db.collection("users").countDocuments({ formTitle: 'Demander la mise à jour des informations cadastrales' });

            res.status(200).json({
            demandeTotals,
            demandeDelimitation,
            nonCadastre,
            fraude,
            conflit,
            miseAJour,
            });
        } 
        catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching data:', error.message);
            } else {
                console.error('Unknown error fetching data:', error);
            }
            res.status(500).json({ error: 'Error fetching data' });
        }
    } 
}
    