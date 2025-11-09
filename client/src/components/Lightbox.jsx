// client/src/components/Lightbox.jsx
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./Lightbox.scss";

function Lightbox({ fotos, startIndex, onClose }) {
  const [index, setIndex] = React.useState(startIndex ?? 0);
  const [expanded, setExpanded] = useState(false);

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
          <div className={`lb-meta ${expanded ? "expanded" : "collapsed"}`}>
            <div className="lb-description" role="note">
              {current.description}
            </div>
            <div className="lb-date">
              {new Date(current.photo_date).toLocaleDateString()}
            </div>
            {current.description?.length > 140 && (
              <button
                type="button"
                className="lb-toggle"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
              >
                {expanded ? "Mostrar menos" : "Mostrar mais"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Lightbox;
