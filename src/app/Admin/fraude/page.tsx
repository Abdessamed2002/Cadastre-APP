import React from 'react';
import AdminDataTable from '../../Components/AdminDataTable';

// Mock data for fraud reports - replace with actual data fetching logic
const mockFraudData = [
  {
    id: '1',
    nom: 'Smith',
    prenom: 'Jane',
    adresse: '456 Elm St, Oran',
    telephone: '0612345678',
    description: 'Suspected fraudulent property sale.',
    image: '/path/to/image.jpg', // Replace with actual image path
  },
  {
    id: '1',
    nom: 'Smith',
    prenom: 'Jane',
    adresse: '456 Elm St, Oran bbbbzz tt t tqksdfqhgkerg oazeif fvsdv',
    telephone: '0612345678',
    description: 'Suspected fraudulent property sale laaa zeahfurgn qsdvsdfgi^zerg eztopoeazfebzgr sdvvjmzetg^zt btjovsd 854656. Suspected fraudulent property sale laaa zeahfurgn qsdvsdfgi^zerg eztopoeazfebzgr sdvvjmzetg^zt btjovsd 854656.',
    image: '/path/to/image.jpg', // Replace with actual image path
  },
  // Add more mock data as needed
];

const FraudReportPage: React.FC = () => {
  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Fraudes immobilière Signalers</h2>
      <AdminDataTable data={mockFraudData} showImage={true} />
    </>
  );
};

export default FraudReportPage;