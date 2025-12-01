import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // vider les erreurs
    setNameError("");
    setEmailError("");
    setMessageError("");
    setSuccess("");

    let isValid = true;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    // Nom
    if (!trimmedName) {
      setNameError("Le nom est obligatoire.");
      isValid = false;
    } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(trimmedName)) {
      setNameError("Le nom doit contenir uniquement des lettres.");
      isValid = false;
    }

    // Email
    if (!trimmedEmail) {
      setEmailError("L’e-mail est obligatoire.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setEmailError("Veuillez saisir une adresse e-mail valide.");
      isValid = false;
    }

    // Message
    if (!trimmedMessage) {
      setMessageError("Le message est obligatoire.");
      isValid = false;
    }

    if (!isValid) return;

    setSuccess("Votre message a été envoyé avec succès ✅");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section className="contact">
      <div className="contact-container">
        <h1 className="contact-title">Envoyer un message</h1>
        <p className="contact-subtitle">
          Une question ? Une remarque ? Contactez-nous via ce formulaire.
        </p>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {success && <p className="contact-success">{success}</p>}

          {/* Nom + Email */}
          <div className="contact-row">
            <div className="contact-field">
              <label>Votre nom</label>
              <input
                type="text"
                placeholder="Entrez votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && (
                <span className="contact-error">{nameError}</span>
              )}
            </div>

            <div className="contact-field">
              <label>Votre e-mail</label>
              <input
                type="email"
                placeholder="exemple@domaine.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <span className="contact-error">{emailError}</span>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="contact-field">
            <label>Message</label>
            <textarea
              placeholder="Écrivez votre message ici..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {messageError && (
              <span className="contact-error">{messageError}</span>
            )}
          </div>

          <button type="submit" className="contact-button">
            Envoyer
          </button>
        </form>
      </div>
    </section>
  );
}
