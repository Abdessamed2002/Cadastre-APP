"use client"
import React, { useEffect, useState } from 'react';
import AdminDataTable from '../../Components/AdminDataTable';

interface TableData {
  id: string;
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  description: string;
  image?: string;
}

const DelimitationPage: React.FC = () => {
  const [data, setData] = useState<TableData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users?page=delimitation');
        if (!response.ok) {
          throw new Error('Error fetching delimitation data');
        }
        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Demandes d'une deuxième délimitation</h2>
      <AdminDataTable data={data} />
    </>
  );
};

export default DelimitationPage;