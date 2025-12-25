// ===============================
// src/components/PdfCarousel.jsx
// ===============================
import { useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Fix worker in Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PdfCarousel({ pdfUrl }) {
  const [numPages, setNumPages] = useState(0);
  const scrollerRef = useRef(null);

  const pages = useMemo(() => {
    if (!numPages) return [];
    return Array.from({ length: numPages }, (_, i) => i + 1);
  }, [numPages]);

  const scrollByCard = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("[data-page-card]");
    const step = card ? card.getBoundingClientRect().width + 16 : 600;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  if (!pdfUrl) return null;

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
        <button onClick={() => scrollByCard(-1)} style={btnStyle}>←</button>
        <button onClick={() => scrollByCard(1)} style={btnStyle}>→</button>
        <a href={pdfUrl} target="_blank" rel="noreferrer" style={{ marginLeft: "auto", opacity: 0.85 }}>
          Open PDF
        </a>
      </div>

      <div
        ref={scrollerRef}
        style={{
          display: "flex",
          gap: 16,
          overflowX: "auto",
          paddingBottom: 10,
          scrollSnapType: "x mandatory",
        }}
      >
        <Document
          file={pdfUrl}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<div style={{ opacity: 0.8 }}>Loading PDF…</div>}
          error={<div style={{ color: "tomato" }}>Failed to load PDF</div>}
        >
          {pages.map((p) => (
            <div
              key={p}
              data-page-card
              style={{
                flex: "0 0 auto",
                scrollSnapAlign: "start",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                padding: 10,
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 8 }}>Page {p}</div>
              <Page pageNumber={p} width={520} renderTextLayer={false} renderAnnotationLayer={false} />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "8px 12px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  cursor: "pointer",
};
