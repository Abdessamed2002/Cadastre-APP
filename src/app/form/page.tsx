"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // Pour lire les paramètres de requête
import Header from "../Components/Header"; // Ajuster ce chemin si nécessaire

const FormPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [formTitle, setFormTitle] = useState("");

  const [formData, setFormData] = useState({
    formTitle: "", // On peut le stocker ici aussi
    nom: "",
    prenom: "",
    adresse: "",
    telephone: "",
    description: "",
    image: null as File | null,
  });

  useEffect(() => {
    // Valeur par défaut si "title" n'est pas dans l'URL
    const titleFromUrl =
      searchParams?.get("title") || "Demander une deuxième délimitation";
    setFormTitle(decodeURIComponent(titleFromUrl));

    // Met à jour également le formData pour inclure le formTitle
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
    // Logique d'envoi du formulaire

    // Simulation d'envoi au backend
    const formDataToSend = new FormData();
    formDataToSend.append("formTitle", formData.formTitle);  // Ajoute le titre ici
    formDataToSend.append("nom", formData.nom);
    formDataToSend.append("prenom", formData.prenom);
    formDataToSend.append("adresse", formData.adresse);
    formDataToSend.append("telephone", formData.telephone);
    formDataToSend.append("description", formData.description);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    // Exemple de requête d'envoi au backend (remplace l'URL par la tienne)
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: formDataToSend,
      });
      const result = await response.json();

      // Reset the form fields after successful submission
      setFormData({
        formTitle: "", // Reset title if needed, or keep the current one
        nom: "",
        prenom: "",
        adresse: "",
        telephone: "",
        description: "",
        image: null, // Reset image field
      });
      
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire", error);
    }
  };

  return (
    <div>
      <Header /> {/* Inclure le composant Header */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex items-center space-x-2 mb-8">
          <h1 className="text-2xl font-bold">{formTitle}</h1>{" "}
          {/* Titre du formulaire */}
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-md shadow-md"
        >
          {/* Nom et Prénom sur la même ligne */}
          <div className="flex space-x-4">
            <div className="flex flex-col flex-1">
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
                className="border border-[#B2D9D0] p-3 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col flex-1">
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
                className="border border-[#B2D9D0] p-3 rounded-md focus:ring-2 focus:ring-green-500"
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
              className="border border-[#B2D9D0] p-3 rounded-md focus:ring-2 focus:ring-green-500"
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
              pattern="[0]{1}[5-7]{1}[0-9]{8}" // Modèle pour numéros algériens (05, 06, 07)
              className="border border-[#B2D9D0] p-3 rounded-md focus:ring-2 focus:ring-green-500"
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
              className="border border-[#B2D9D0] p-3 rounded-md focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Affichage conditionnel du champ image selon le titre du formulaire */}
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
