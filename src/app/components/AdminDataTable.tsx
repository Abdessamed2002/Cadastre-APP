"use client"

import React, { useState } from 'react';
import Image from 'next/image';

interface TableData {
  id: string;
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  description: string;
  image?: string;
}

interface AdminDataTableProps {
  data: TableData[];
  showImage?: boolean;
}

const TruncatedText: React.FC<{ text: string; maxLength: number }> = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= maxLength) return <span>{text}</span>;

  return (
    <span>
      {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="ml-2 text-blue-500 hover:text-blue-700"
      >
        {isExpanded ? 'Voir moins' : 'Voir plus'}
      </button>
    </span>
  );
};

const AdminDataTable: React.FC<AdminDataTableProps> = ({ data, showImage = false }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Nom</th>
            <th className="py-3 px-4 text-left">Prénom</th>
            <th className="py-3 px-4 text-left">Adresse</th>
            <th className="py-3 px-4 text-left">Téléphone</th>
            <th className="py-3 px-4 text-left">Description</th>
            {showImage && <th className="py-3 px-4 text-left">Image</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4">{item.id}</td>
              <td className="py-3 px-4">{item.nom}</td>
              <td className="py-3 px-4">{item.prenom}</td>
              <td className="py-3 px-4 max-w-xs">
                <TruncatedText text={item.adresse} maxLength={50} />
              </td>
              <td className="py-3 px-4">{item.telephone}</td>
              <td className="py-3 px-4 max-w-md">
                <TruncatedText text={item.description} maxLength={100} />
              </td>
              {showImage && (
                <td className="py-3 px-4">
                  {item.image && (
                    <Image src={item.image} alt="Fraud evidence" width={50} height={50} className="rounded-md" />
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDataTable;