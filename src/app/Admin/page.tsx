"use client";
import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface DashboardData {
  demandeTotals: number;
  demandeDelimitation: number;
  nonCadastre: number;
  fraude: number;
  conflit: number;
  miseAJour: number;
}

const Dashboard: FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn");

    // Redirect to login if not logged in
    if (isLoggedIn !== "true") {
      router.push("/Admin/AdminLogin");
    } else {
      fetch("/api/data") // Fetch the data from the API
        .then((res) => res.json())
        .then((data) => {
          setDashboardData(data); // Set the data from the API
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching dashboard data:", err);
          setIsLoading(false);
        });
    }
  }, [router]);

  if (isLoading || !dashboardData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Présentation du tableau de bord</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Demande Totales</h3>
          <p className="text-4xl font-bold">{dashboardData.demandeTotals}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Demande Deuxieme Délimitation</h3>
          <p className="text-4xl font-bold">{dashboardData.demandeDelimitation}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Propriété non Cadastrée</h3>
          <p className="text-4xl font-bold">{dashboardData.nonCadastre}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Fraude immobilière signalés</h3>
          <p className="text-4xl font-bold">{dashboardData.fraude}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Conflit déclarer</h3>
          <p className="text-4xl font-bold">{dashboardData.conflit}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Mises à jour cadastrales</h3>
          <p className="text-4xl font-bold">{dashboardData.miseAJour}</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
