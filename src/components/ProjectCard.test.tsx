import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProjectCard } from './ProjectCard';

const mockProject = {
  id: '1',
  title: 'Test Project',
  category: 'Web Development',
  description: 'A test project description',
  tags: ['React', 'TypeScript'],
  icon: 'Cpu',
  link: 'https://example.com',
  github: 'https://github.com/test'
};

describe('ProjectCard', () => {
  it('renders project title', () => {
    render(
      <BrowserRouter>
        <ProjectCard project={mockProject} index={0} />
      </BrowserRouter>
    );
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  it('renders project description', () => {
    render(
      <BrowserRouter>
        <ProjectCard project={mockProject} index={0} />
      </BrowserRouter>
    );
    expect(screen.getByText('A test project description')).toBeInTheDocument();
  });

  it('renders project category', () => {
    render(
      <BrowserRouter>
        <ProjectCard project={mockProject} index={0} />
      </BrowserRouter>
    );
    expect(screen.getByText('Web Development')).toBeInTheDocument();
  });

  it('renders project tags', () => {
    render(
      <BrowserRouter>
        <ProjectCard project={mockProject} index={0} />
      </BrowserRouter>
    );
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });
});
