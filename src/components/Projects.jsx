
// ===============================
// src/components/Projects.jsx
// ===============================
import { useMemo, useState } from "react";
import PdfCarousel from "./PdfCarousel";

// Load ALL JSON files created by Decap CMS in src/data/projects/*.json
// Works with Vite. No backend needed.
const modules = import.meta.glob("../data/projects/*.json", { eager: true });

function normalizeProjects(mods) {
  const arr = Object.entries(mods).map(([path, mod]) => {
    const data = mod?.default ?? mod;
    const id = path.split("/").pop().replace(".json", "");
    return { id, ...data };
  });

  // newest first if filenames are timestamps, otherwise alphabetical
  arr.sort((a, b) => (a.id < b.id ? 1 : -1));
  return arr;
}

export default function Projects() {
  const projects = useMemo(() => normalizeProjects(modules), []);
  const [openId, setOpenId] = useState(projects[0]?.id ?? null);

  if (!projects.length) {
    return (
      <section style={{ marginTop: 40 }}>
        <h2 style={{ marginBottom: 8 }}>Projects</h2>
        <div style={{ opacity: 0.8 }}>No projects yet. Add one in /admin.</div>
      </section>
    );
  }

  return (
    <section style={{ marginTop: 40 }}>
      <h2 style={{ marginBottom: 12 }}>Projects</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {projects.map((p) => {
          const isOpen = openId === p.id;
          return (
            <div key={p.id} style={cardStyle}>
              <button
                onClick={() => setOpenId(isOpen ? null : p.id)}
                style={headerBtnStyle}
              >
                <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{p.title || p.id}</div>
                  <div style={{ opacity: 0.75, marginTop: 4 }}>
                    {p.text ? p.text.slice(0, 90) + (p.text.length > 90 ? "…" : "") : ""}
                  </div>
                </div>
                <div style={{ marginLeft: "auto", opacity: 0.8 }}>{isOpen ? "−" : "+"}</div>
              </button>

              {isOpen && (
                <div style={{ padding: "12px 14px 16px" }}>
                  {p.text && <p style={{ marginTop: 0, opacity: 0.9 }}>{p.text}</p>}
                  <PdfCarousel pdfUrl={p.pdf} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

const cardStyle = {
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: 14,
  overflow: "hidden",
  background: "rgba(255,255,255,0.03)",
};

const headerBtnStyle = {
  width: "100%",
  display: "flex",
  gap: 12,
  alignItems: "center",
  padding: "14px",
  border: "none",
  background: "transparent",
  color: "white",
  cursor: "pointer",
};