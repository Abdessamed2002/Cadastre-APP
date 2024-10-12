import React, { FC } from 'react';

const Dashboard: FC = () => {
  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Présentation du tableau de bord</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Cards */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Demande Totales</h3>
          <p className="text-4xl font-bold">50</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Demande Deuxieme Délimitation</h3>
          <p className="text-4xl font-bold">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Propriété non Cadastrée</h3>
          <p className="text-4xl font-bold">8</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {/* Example Cards */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Fraude immobilière signalés</h3>
          <p className="text-4xl font-bold">15</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Conflit déclarer</h3>
          <p className="text-4xl font-bold">7</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Mises à jour cadastrales</h3>
          <p className="text-4xl font-bold">8</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;