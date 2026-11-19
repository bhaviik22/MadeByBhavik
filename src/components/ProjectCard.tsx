import type { Project } from '../types/project'

interface ProjectCardProps { project: Project }

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {  
  return (
    <article className="project-card">
      <div>
        <span className="tag">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <div className="project-meta"><span className="tag">{project.year}</span><a className="project-link" href={`#${project.id}`}>View project -&gt;</a></div>
    </article>
  )
}

export default ProjectCard;