import { useEffect, useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function StudentModal({
  mode = "create",
  student,
  onClose,
  onSaved,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (mode === "edit" && student) {
      setName(student.name || "");
      setEmail(student.email || "");
      setBirthDate(student.data_nascimento || "");
      setCity(student.cidade || "");
      return;
    }

    setName("");
    setEmail("");
    setBirthDate("");
    setCity("");
  }, [mode, student]);

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedCity = city.trim();

    if (!trimmedName) {
      setErrorMessage("Informe o nome do aluno.");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage("Informe um e-mail válido.");
      return;
    }

    if (!trimmedCity) {
      setErrorMessage("Informe a cidade do aluno.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(
        mode === "edit" ? `/api/alunos/${student.id}` : "/api/alunos",
        {
          method: mode === "edit" ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: trimmedName,
            email: trimmedEmail,
            data_nascimento: birthDate || null,
            cidade: trimmedCity,
          }),
        },
      );

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(payload.error || "Não foi possível salvar o aluno.");
      }

      await onSaved?.();
      onClose();
    } catch (error) {
      setErrorMessage(error.message || "Erro inesperado ao salvar o aluno.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="modal-header">
          <h2 id="modal-title">
            {mode === "edit" ? "Editar aluno" : "Novo aluno"}
          </h2>
          <button type="button" className="ghost-button dark" onClick={onClose}>
            Cancelar
          </button>
        </div>

        <form className="student-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="newName">Nome completo</label>
            <input
              id="newName"
              type="text"
              placeholder="Nome completo"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="field">
            <label htmlFor="newEmail">E-mail</label>
            <input
              id="newEmail"
              type="email"
              placeholder="email@iteamrr.edu.br"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="form-grid">
            <div className="field">
              <label htmlFor="newDate">Data de nascimento</label>
              <input
                id="newDate"
                type="date"
                value={birthDate}
                onChange={(event) => setBirthDate(event.target.value)}
              />
            </div>

            <div className="field">
              <label htmlFor="newCity">Cidade</label>
              <input
                id="newCity"
                type="text"
                placeholder="Cidade"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </div>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Salvando..." : "Salvar aluno"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
