"use client"
import React, { useEffect, useState } from 'react';
import AdminDataTable from '../../Components/AdminDataTable';

interface NonCadastreData {
  id: string;
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  description: string;
}

const NonCadastrePage: React.FC = () => {
  const [nonCadastreData, setNonCadastreData] = useState<NonCadastreData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNonCadastreRequests = async () => {
      try {
        const response = await fetch('/api/users?page=non-cadastre'); // API endpoint for non-cadastre data
        if (!response.ok) {
          throw new Error('Failed to fetch non-cadastre data.');
        }
        const data = await response.json();
        setNonCadastreData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNonCadastreRequests();
  }, []);

  if (loading) {
    return <p>Loading non-cadastre requests...</p>;
  }

  if (error) {
    return <p>Error fetching non-cadastre requests: {error}</p>;
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">
        Demandes d'enregistrer une propriété foncière non cadastrée
      </h2>
      <AdminDataTable data={nonCadastreData} showImage={false} />
    </>
  );
};

export default NonCadastrePage;
