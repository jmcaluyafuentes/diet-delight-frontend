import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import About from '../About.jsx';
import user from '@testing-library/user-event';
import { vi } from 'vitest';  // Use 'vi' from 'vitest'

describe('About Component', () => {
  it('shows the title and description correctly', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Check if the page title is rendered
    const title = screen.getByText('About');
    expect(title).toBeInTheDocument();

    // Check if description paragraphs are rendered
    expect(screen.getByText(/At Fit Life Gym,/)).toBeInTheDocument();
    expect(screen.getByText(/a personalized meal planning tool/)).toBeInTheDocument();
    expect(screen.getByText(/Whether you are looking for high-protein meals/)).toBeInTheDocument();
  });

  it('renders Print Recipes section and navigates to search page on button click', async () => {
    render(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/search" element={<div>Search Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Check if Print Recipes section is rendered
    expect(screen.getByText(/Additionally, our Print Recipes feature/)).toBeInTheDocument();

    // Check if the "Search Recipes" link is rendered
    const searchRecipesLink = screen.getByRole('link', { name: /Search Recipes/i });
    expect(searchRecipesLink).toBeInTheDocument();

    // Simulate user clicking on the "Search Recipes" link
    await user.click(searchRecipesLink);

    // Check if the Search Page content is rendered
    expect(screen.getByText('Search Page')).toBeInTheDocument();
  });

  it('scrolls to the featured recipes section when clicking on Featured Recipes link', async () => {
    // Mock the scrollIntoView function
    const scrollIntoViewMock = vi.fn();
    document.getElementById = vi.fn().mockReturnValue({ scrollIntoView: scrollIntoViewMock });

    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    // Simulate user clicking on the "Featured Recipes" link
    const featuredRecipesLink = screen.getByRole('link', { name: /Featured Recipes/i });
    await user.click(featuredRecipesLink);

    // Verify if scrollIntoView was called
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });
});
