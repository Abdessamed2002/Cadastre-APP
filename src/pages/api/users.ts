import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import clientPromise from '../../lib/mongodb';
import { cloudinary } from '../../lib/cloudinary';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = new IncomingForm({
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
    });

    form.parse(req, async (err, fields, files: any) => {
      if (err) {
        console.error('Error during form parsing:', err);
        return res.status(500).json({ error: 'Erreur lors du traitement du formulaire.' });
      }

      try {
        const client = await clientPromise;
        const db = client.db("Cadastre");

        let imageUrl = null;

        if (files?.image?.[0]?.filepath) {
          try {
            console.time('Cloudinary upload');
            const result = await cloudinary.uploader.upload(files.image[0].filepath, {
              folder: 'cadastre_app',
              resource_type: 'auto',
              timeout: 60000,
            });
            console.timeEnd('Cloudinary upload');
            imageUrl = result.secure_url;

            fs.unlinkSync(files.image[0].filepath);
          } catch (uploadError) {
            // Type narrowing for error
            if (uploadError instanceof Error) {
              console.error('Error uploading to Cloudinary:', uploadError.message);
            } else {
              console.error('Unknown error:', uploadError);
            }
          }
        } else {
          console.log('No image file detected in the request');
        }

        const userData = {
          formTitle: fields.formTitle?.[0] ?? 'Demander une deuxième délimitation',
          nom: fields.nom?.[0] ?? '',
          prenom: fields.prenom?.[0] ?? '',
          adresse: fields.adresse?.[0] ?? '',
          telephone: fields.telephone?.[0] ?? '',
          description: fields.description?.[0] ?? '',
          image: imageUrl,
        };

        await db.collection("users").insertOne(userData);

        res.status(200).json({ message: 'Formulaire reçu et enregistré avec succès.' });
      } catch (error) {
        // Type narrowing for error
        if (error instanceof Error) {
          console.error('Error:', error.message);
        } else {
          console.error('Unknown error:', error);
        }
        res.status(500).json({ error: "Erreur lors de l'enregistrement dans la base de données." });
      }
    });
  } else if (req.method === 'GET') {
    try {
      const { page } = req.query; // Get the page type from the query parameters
      const client = await clientPromise;
      const db = client.db("Cadastre");

      // Mapping of page types to form titles
      const formTitles: { [key: string]: string } = {
        delimitation: "Demander une deuxième délimitation",
        "non-cadastre": "Demander d'enregistrer une propriété foncière non cadastrée",
        fraude: "Signaler une fraude immobilière",
        conflit: "Déclarer un conflit",
        "mise-a-jour": "Demander la mise à jour des informations cadastrales"
      };

      const formTitle = formTitles[page as string]; // Get the correct formTitle for the page

      if (!formTitle) {
        return res.status(400).json({ error: "Invalid page type" });
      }

      // Fetch data based on formTitle
      const data = await db.collection("users")
        .find({ formTitle })
        .toArray();

      res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching data:', error.message);
      } else {
        console.error('Unknown error fetching data:', error);
      }
      res.status(500).json({ error: 'Error fetching data' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }  
}
