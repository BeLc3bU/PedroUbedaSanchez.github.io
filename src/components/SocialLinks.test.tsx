import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SocialLinks } from './SocialLinks';

// Mock window.dataLayer
Object.defineProperty(window, 'dataLayer', {
  value: [],
  writable: true
});

describe('SocialLinks', () => {
  it('renders GitHub link', () => {
    render(
      <BrowserRouter>
        <SocialLinks />
      </BrowserRouter>
    );
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
  });

  it('renders LinkedIn link', () => {
    render(
      <BrowserRouter>
        <SocialLinks />
      </BrowserRouter>
    );
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
  });

  it('renders Email link', () => {
    render(
      <BrowserRouter>
        <SocialLinks />
      </BrowserRouter>
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders WhatsApp link', () => {
    render(
      <BrowserRouter>
        <SocialLinks />
      </BrowserRouter>
    );
    expect(screen.getByLabelText('WhatsApp')).toBeInTheDocument();
  });

  it('renders Download CV button', () => {
    render(
      <BrowserRouter>
        <SocialLinks />
      </BrowserRouter>
    );
    expect(screen.getByLabelText('Download CV')).toBeInTheDocument();
  });

  it('pushes dataLayer event on social click', () => {
    render(
      <BrowserRouter>
        <SocialLinks />
      </BrowserRouter>
    );
    
    // Click on GitHub link
    const githubLink = screen.getByLabelText('GitHub');
    githubLink.click();
    
    const dl = window as unknown as { dataLayer?: { event: string; category: string; label: string }[] };
    expect(dl.dataLayer).toContainEqual({
      event: 'social_click',
      category: 'engagement',
      label: 'github'
    });
  });
});
