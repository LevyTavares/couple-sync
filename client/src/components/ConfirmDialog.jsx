// client/src/components/ConfirmDialog.jsx
/**
 * Modal de confirmação simples e reutilizável.
 * Props:
 * - isOpen: boolean
 * - title: string
 * - message: string | node
 * - confirmText?: string (default: "Confirmar")
 * - cancelText?: string (default: "Cancelar")
 * - onConfirm: () => void
 * - onCancel: () => void
 */
import React from "react";
import "./ConfirmDialog.scss";

function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  const stop = (e) => e.stopPropagation();

  return (
    <div className="cd-backdrop" onClick={onCancel} role="dialog" aria-modal>
      <div className="cd-card" onClick={stop}>
        <header className="cd-header">
          <h3 className="cd-title">{title}</h3>
        </header>
        <div className="cd-body">{message}</div>
        <footer className="cd-actions">
          <button className="cd-btn ghost" onClick={onCancel}>
            {cancelText}
          </button>
          <button className="cd-btn danger" onClick={onConfirm} autoFocus>
            {confirmText}
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ConfirmDialog;
