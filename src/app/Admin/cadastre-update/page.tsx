"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDataTable from '../../Components/AdminDataTable';

interface CadastreUpdateData {
  id: string;
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  description: string;
}

const CadastreUpdatePage: React.FC = () => {
  const [cadastreUpdateData, setCadastreUpdateData] = useState<CadastreUpdateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check if the user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      // If not logged in, redirect to the login page
      router.push('/Admin/AdminLogin');
    }
  }, [router]);
  
  useEffect(() => {
    const fetchCadastreUpdateRequests = async () => {
      try {
        const response = await fetch('/api/users?page=mise-a-jour'); // API endpoint for cadastre update data
        if (!response.ok) {
          throw new Error('Failed to fetch cadastre update data.');
        }
        const data = await response.json();
        setCadastreUpdateData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCadastreUpdateRequests();
  }, []);

  if (loading) {
    return <p>Loading cadastre update requests...</p>;
  }

  if (error) {
    return <p>Error fetching cadastre update requests: {error}</p>;
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">
        Demande de mise à jour des informations cadastrales
      </h2>
      <AdminDataTable data={cadastreUpdateData} showImage={false}  />
    </>
  );
};

export default CadastreUpdatePage;
