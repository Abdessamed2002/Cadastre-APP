// AdminDataTable.tsx

import React, { useState } from 'react';
import Image from 'next/image';
import ImageModal from './ImageModal'; // Import the ImageModal

interface TableData {
  id: string;
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  description: string;
  image?: string; // Image is optional
}

interface AdminDataTableProps {
  data: TableData[];
  showImage?: boolean; // Option to toggle the image column
}

const TruncatedText: React.FC<{ text: string; maxLength: number }> = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Vérifie si le texte est trop long pour afficher le bouton
  const shouldTruncate = text.length > maxLength && text.length > 20;

  if (!shouldTruncate) return <span>{text}</span>;

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

const AdminDataTable: React.FC<AdminDataTableProps> = ({ data, showImage = true }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

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
  <div style={{ display: 'block', maxHeight: '6em', overflow: 'hidden' }}>
    <TruncatedText text={item.description} maxLength={40} />
  </div>
</td>
              {showImage && (
                <td className="py-3 px-4 cursor-pointer">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt="Uploaded evidence"
                      width={80}
                      height={80}
                      className="rounded-md"
                      onClick={() => item.image && handleImageClick(item.image)} // Call only if image is defined
                    />
                  ) : (
                    <span>Aucune image</span> // Fallback text if no image is provided
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Modal to display the image */}
      <ImageModal isOpen={isModalOpen} imageSrc={selectedImage!} onClose={handleCloseModal} />
    </div>
  );
};

export default AdminDataTable;
