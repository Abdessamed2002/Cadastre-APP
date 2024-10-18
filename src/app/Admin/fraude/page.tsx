"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDataTable from '../../Components/AdminDataTable';

interface FraudData {
  id: string;
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  description: string;
  image?: string;
}

const FraudReportPage: React.FC = () => {
  const [fraudData, setFraudData] = useState<FraudData[]>([]);
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
    const fetchFraudReports = async () => {
      try {
        const response = await fetch('/api/users?page=fraude'); // API endpoint for fraud reports
        if (!response.ok) {
          throw new Error('Failed to fetch fraud reports.');
        }
        const data = await response.json();
        setFraudData(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFraudReports();
  }, []);

  if (loading) {
    return <p>Loading fraud reports...</p>;
  }

  if (error) {
    return <p>Error fetching fraud reports: {error}</p>;
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Fraudes immobilière Signalers</h2>
      <AdminDataTable data={fraudData} showImage={true} />
    </>
  );
};

export default FraudReportPage;