import { createContext, useContext, useCallback, useState } from 'react';
import { FiCheckCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';
import './toast.css';

const ToastContext = createContext();

let idSeq = 0;

const ICONES = {
  success: <FiCheckCircle />,
  error: <FiAlertTriangle />,
  info: <FiInfo />,
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const remover = useCallback((id) => {
    setToasts((lista) => lista.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (mensagem, tipo = 'info', duracao = 3500) => {
      const id = ++idSeq;
      setToasts((lista) => [...lista, { id, mensagem, tipo }]);
      setTimeout(() => remover(id), duracao);
    },
    [remover]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container" role="region" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast--${t.tipo}`}>
            <span className="toast__icon">{ICONES[t.tipo] || ICONES.info}</span>
            <span className="toast__msg">{t.mensagem}</span>
            <button
              className="toast__close"
              onClick={() => remover(t.id)}
              aria-label="Fechar notificação"
            >
              <FiX />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast deve ser usado dentro de <ToastProvider>');
  return ctx;
}
