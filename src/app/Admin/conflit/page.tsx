import React from 'react';
import AdminDataTable from '../../Components/AdminDataTable';

// Mock data - replace this with actual data fetching logic
const mockData = [
  {
    id: '1',
    nom: 'Doe',
    prenom: 'John',
    adresse: '123 Main St, Algiers',
    telephone: '0512345678',
    description: 'Request for second delimitation of property.',
  },
  // Add more mock data as needed
];

const ConflictPage: React.FC = () => {
  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Conflit Déclarers</h2>
      <AdminDataTable data={mockData} />
    </>
  );
};

export default ConflictPage;