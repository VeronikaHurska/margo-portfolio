import { useState, useEffect } from "react";
import PortfolioCard from "./PortfolioCard";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        // Dynamically import all JSON files from the projects folder
        const projectModules = import.meta.glob('../data/projects/*.json');

        const projectsData = await Promise.all(
          Object.values(projectModules).map(async (importFn) => {
            const module = await importFn();
            return module.default;
          })
        );

        // Sort by title or add a date field in CMS for sorting
        const sortedProjects = projectsData.sort((a, b) =>
          (a.title || '').localeCompare(b.title || '')
        );

        setProjects(sortedProjects);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return (
      <section className="projects">
        <h2>Portfolio</h2>
        <div className="projects-loading">Loading projects...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="projects">
        <h2>Portfolio</h2>
        <div className="projects-error">{error}</div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="projects">
        <h2>Portfolio</h2>
        <div className="projects-empty">
          No projects yet. Add your first project from the admin panel!
        </div>
      </section>
    );
  }

  return (
    <section className="projects">
      <h2>Portfolio</h2>
      <div className="projects-grid">
        {projects.map((project, idx) => (
          <PortfolioCard key={project.title || idx} project={project} />
        ))}
      </div>
    </section>
  );
}
