import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import Home from './Home';

describe('Home Component', () => {
  test('renders the NavBar, hero text, and Footer correctly', () => {
    render(
      <MemoryRouter> {/* Wrap with MemoryRouter */}
        <Home />
      </MemoryRouter>
    );

    // Specific query for hero title
    const heroTitle = screen.getByRole('heading', { name: /Welcome to Diet Delight/i });
    expect(heroTitle).toBeInTheDocument();

    // Or using getAllByText if you want to check for all instances
    const elements = screen.getAllByText(/Diet Delight/i);
    expect(elements).toHaveLength(3); // Adjust the number accordingly
  });

  test('links to the search page', () => {
    render(
      <MemoryRouter> {/* Wrap with MemoryRouter */}
        <Home />
      </MemoryRouter>
    );
    const searchLink = screen.getByRole('link', { name: /Search Recipes/i });
    expect(searchLink).toHaveAttribute('href', '/search');
  });
});
