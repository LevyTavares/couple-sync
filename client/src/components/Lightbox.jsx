// client/src/components/Lightbox.jsx
import React, { useCallback, useEffect, useMemo } from "react";
import { FiX, FiChevronLeft, FiChevronRight, FiDownload } from "react-icons/fi";
import "./Lightbox.scss";

function Lightbox({ fotos, startIndex, onClose }) {
  const [index, setIndex] = React.useState(startIndex ?? 0);

  const total = fotos?.length ?? 0;
  const current = useMemo(() => fotos?.[index] ?? null, [fotos, index]);

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + total) % total),
    [total]
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  if (!current) return null;

  const stop = (e) => e.stopPropagation();

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-content" onClick={stop}>
        <button
          className="lb-btn lb-close"
          onClick={onClose}
          aria-label="Fechar"
        >
          <FiX />
        </button>
        {total > 1 && (
          <>
            <button
              className="lb-btn lb-prev"
              onClick={prev}
              aria-label="Anterior"
            >
              <FiChevronLeft />
            </button>
            <button
              className="lb-btn lb-next"
              onClick={next}
              aria-label="Próxima"
            >
              <FiChevronRight />
            </button>
          </>
        )}

        <div className="lightbox-image-wrap">
          <img src={current.image_url} alt={current.description} />
        </div>

        <div className="lightbox-footer">
          <div className="lb-meta">
            <strong>{current.description}</strong>
            <span>{new Date(current.photo_date).toLocaleDateString()}</span>
          </div>
          <a
            className="lb-download"
            href={current.image_url}
            download
            target="_blank"
            rel="noreferrer"
            title="Baixar imagem"
          >
            <FiDownload /> Baixar
          </a>
        </div>
      </div>
    </div>
  );
}

export default Lightbox;
