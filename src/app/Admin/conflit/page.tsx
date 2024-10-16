"use client"
import React, { useEffect, useState } from 'react';
import AdminDataTable from '../../Components/AdminDataTable';

interface ConflictData {
  id: string;
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  description: string;
}

const ConflictPage: React.FC = () => {
  const [conflictData, setConflictData] = useState<ConflictData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConflictReports = async () => {
      try {
        const response = await fetch('/api/users?page=conflit'); // API endpoint for conflict reports
        if (!response.ok) {
          throw new Error('Failed to fetch conflict reports.');
        }
        const data = await response.json();
        setConflictData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchConflictReports();
  }, []);

  if (loading) {
    return <p>Loading conflict reports...</p>;
  }

  if (error) {
    return <p>Error fetching conflict reports: {error}</p>;
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Conflit Déclarers</h2>
      <AdminDataTable data={conflictData} />
    </>
  );
};

export default ConflictPage;
