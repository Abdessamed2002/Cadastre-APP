"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Pour lire les paramètres de requête
import Header from "../Components/Header"; // Ajuster ce chemin si nécessaire

const FormPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [formTitle, setFormTitle] = useState("");

  const [formData, setFormData] = useState({
    formTitle: "", 
    nom: "",
    prenom: "",
    adresse: "",
    telephone: "",
    description: "",
    image: null as File | null,
  });

  useEffect(() => {
    const titleFromUrl =
      searchParams?.get("title") || "Demander une deuxième délimitation";
    setFormTitle(decodeURIComponent(titleFromUrl));

    setFormData((prevData) => ({
      ...prevData,
      formTitle: decodeURIComponent(titleFromUrl),
    }));
  }, [searchParams]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    const formDataToSend = new FormData();
    formDataToSend.append("formTitle", formData.formTitle);
    formDataToSend.append("nom", formData.nom);
    formDataToSend.append("prenom", formData.prenom);
    formDataToSend.append("adresse", formData.adresse);
    formDataToSend.append("telephone", formData.telephone);
    formDataToSend.append("description", formData.description);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: formDataToSend,
      });
      const result = await response.json();

      setFormData({
        formTitle: "",
        nom: "",
        prenom: "",
        adresse: "",
        telephone: "",
        description: "",
        image: null,
      });
      
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <div className="flex items-center space-x-2 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold">{formTitle}</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-4 sm:p-6 rounded-md shadow-md"
        >
          {/* Nom et Prénom sur la même ligne en grand écran, sur plusieurs lignes en mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="nom" className="mb-2 font-semibold">
                Nom Propriétaire:
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="border border-[#B2D9D0] p-2 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="prenom" className="mb-2 font-semibold">
                Prénom Propriétaire:
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                required
                className="border border-[#B2D9D0] p-2 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="adresse" className="mb-2 font-semibold">
              Adresse de la Terre:
            </label>
            <input
              type="text"
              id="adresse"
              name="adresse"
              value={formData.adresse}
              onChange={handleChange}
              required
              className="border border-[#B2D9D0] p-2 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="telephone" className="mb-2 font-semibold">
              Numéro de Téléphone:
            </label>
            <input
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              required
              pattern="[0]{1}[5-7]{1}[0-9]{8}"
              className="border border-[#B2D9D0] p-2 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="mb-2 font-semibold">
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-[#B2D9D0] p-2 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          {formTitle === "Signaler une fraude immobilière" && (
            <div className="flex flex-col">
              <label htmlFor="image" className="mb-2 font-semibold">
                Image (pour signaler une fraude):
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="border border-[#B2D9D0] p-2 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
