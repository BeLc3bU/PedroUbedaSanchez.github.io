import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Hero } from './Hero';

const mockOnPrint = vi.fn();

describe('Hero', () => {
  it('renders hero section', () => {
    render(
      <BrowserRouter>
        <Hero onPrint={mockOnPrint} />
      </BrowserRouter>
    );
    // Check if hero section exists
    const hero = document.querySelector('#about');
    expect(hero).toBeInTheDocument();
  });

  it('renders profile image with alt text', () => {
    render(
      <BrowserRouter>
        <Hero onPrint={mockOnPrint} />
      </BrowserRouter>
    );
    expect(screen.getByAltText('Pedro Úbeda Sánchez')).toBeInTheDocument();
  });

  it('renders the main heading', () => {
    render(
      <BrowserRouter>
        <Hero onPrint={mockOnPrint} />
      </BrowserRouter>
    );
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
});
