"use client"
// pages/form.tsx

import React, { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation"; // For reading query parameters
import Header from '../Components/Header'; // Adjust this path if necessary

const FormPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [formTitle, setFormTitle] = useState("");

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    telephone: '',
    description: '',
    image: null as File | null,
  });

  useEffect(() => {
    // Provide a default value (e.g., "Default Title") if 'title' is not in the URL.
    const titleFromUrl = searchParams?.get("title") || "Demander une deuxième délimitation";
    setFormTitle(decodeURIComponent(titleFromUrl));
  }, [searchParams]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFormData({
        ...formData,
        image: event.target.files[0],
      });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div>
      <Header /> {/* Include your header component here */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex items-center space-x-2 mb-8">
          <h1 className="text-2xl font-bold">{formTitle}</h1> {/* Adjust this to the button clicked */}
        </div>
  
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-md shadow-md">
          {/* Nom and Prénom on the same line */}
          <div className="flex space-x-4">
            <div className="flex flex-col flex-1">
              <label htmlFor="nom" className="mb-2 font-semibold">Nom Propriétaire:</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="border border-[#B2D9D0] p-3 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col flex-1">
              <label htmlFor="prenom" className="mb-2 font-semibold">Prénom Propriétaire:</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
                className="border border-[#B2D9D0] p-3 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="adresse" className="mb-2 font-semibold">Adresse de la Terre:</label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              required
              className="border border-[#B2D9D0] p-3 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="telephone" className="mb-2 font-semibold">Numéro de Téléphone:</label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
              pattern="[0]{1}[5-7]{1}[0-9]{8}" // Pattern for Algerian numbers starting with 05, 06, or 07
              className="border border-[#B2D9D0] p-3 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="description" className="mb-2 font-semibold">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-[#B2D9D0] p-3 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>
  
          {/* Conditionally render the image input based on the form title */}
          {formTitle === "Signaler une fraude immobilière" && (
            <div className="flex flex-col">
              <label htmlFor="image" className="mb-2 font-semibold">Image (pour signaler une fraude):</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="border border-[#B2D9D0] p-3 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}
  
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition"
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
