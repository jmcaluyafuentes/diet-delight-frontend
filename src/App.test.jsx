import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeAll, afterAll, describe, expect, test, vi } from 'vitest';
import App from './App.jsx';

// Mock fetch globally using vi for API calls
beforeAll(() => {
  global.fetch = vi.fn((url) => {
    if (url === 'https://diet-delight-backend.onrender.com/recipes/print') {
      // Create a mock response object for the print recipes API endpoint
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        redirected: false,
        type: 'basic',
        url,
        blob: () => Promise.resolve(new Blob([], { type: 'application/pdf' })),
        clone: () => mockResponse,
        text: () => Promise.resolve(''),
        json: () => Promise.resolve({}),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      };

      return Promise.resolve(mockResponse);
    }
    return Promise.reject(new Error('Not Found'));
  });
});

// Clean up mocks after all tests
afterAll(() => {
  vi.restoreAllMocks();
});

describe('App Component', () => {
  // Test for rendering the Home page
  test('renders Home page when navigating to /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    // Check if the hero banner text is present on the Home page
    expect(screen.getByText('Welcome to Diet Delight')).toBeInTheDocument();

    // Check if the CTA button to search recipes is present on the Home page
    expect(screen.getByRole('link', { name: /search recipes/i })).toBeInTheDocument();
  });

  // Test for rendering the Search page
  test('renders Search page when navigating to /search', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <App />
      </MemoryRouter>
    );

    // Check if the heading for the Search page is present
    expect(screen.getByRole('heading', { name: /recipe search/i })).toBeInTheDocument();
  });

  // Test for rendering the About page
  test('renders About page when navigating to /about', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    // Check if the heading for the About page is present
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();

    // Check if specific introductory text on the About page is present
    expect(screen.getByText(/At Fit Life Gym, we believe that fitness is more than just about the workouts — it is also about nourishing your body with the right foods./i)).toBeInTheDocument();

    // Check if the Search Recipes button is present on the About page
    expect(screen.getByRole('link', { name: /search recipes/i })).toBeInTheDocument();

    // Check if the Featured Recipes button is present on the About page
    expect(screen.getByRole('link', { name: /featured recipes/i })).toBeInTheDocument();
  });

  // Test for rendering the Contact page
  test('renders Contact page when navigating to /contact', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <App />
      </MemoryRouter>
    );

    // Check if the heading for the Contact page is present
    expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument();

    // Check for the introductory paragraph about the developers
    expect(screen.getByText(/Diet Delight was developed by three aspiring Software Developers./i)).toBeInTheDocument();

    // Check for the developer names and their GitHub profile links
    expect(screen.getByText(/John Fuentes/i)).toBeInTheDocument();
    const johnGithubLink = screen.getAllByRole('link', { name: /github/i })[0];
    expect(johnGithubLink).toHaveAttribute('href', 'https://github.com/jmcaluyafuentes');

    expect(screen.getByText(/Hy Nguyen/i)).toBeInTheDocument();
    const hyGithubLink = screen.getAllByRole('link', { name: /github/i })[1];
    expect(hyGithubLink).toHaveAttribute('href', 'https://github.com/hynguyenduc');

    expect(screen.getByText(/Branden Chiem/i)).toBeInTheDocument();
    const brandenGithubLink = screen.getAllByRole('link', { name: /github/i })[2];
    expect(brandenGithubLink).toHaveAttribute('href', 'https://github.com/duskpeyl');
  });

  // Test for rendering the PrintPreview page
  test('renders PrintPreview page when navigating to /print', () => {
    // Mock data for the recipe
    const mockRecipes = [
      {
        instructionsUrl: 'url1',
        title: 'Recipe 1',
        caloriesPerServing: 200,
        servingSize: '1 cup',
        dietLabels: ['Vegan'],
        healthLabels: ['Gluten-Free'],
        ingredients: ['Ingredient 1', 'Ingredient 2'],
      },
    ];

    render(
      <MemoryRouter initialEntries={[{ pathname: '/print', state: { recipes: mockRecipes } }]}>
        <App />
      </MemoryRouter>
    );

    // Debug output to verify rendering
    console.log(screen.debug());

    // Assertions
    // Check for the presence of download and cancel buttons
    expect(screen.getByRole('button', { name: /download pdf/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    
    // Check for the recipe title and nutritional information
    expect(screen.getByText(/Recipe 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Calories: 200.00 kcal/i)).toBeInTheDocument();
    expect(screen.getByText(/Serving Size: 1 cup/i)).toBeInTheDocument();

    // Check for Diet Labels and Health Labels
    expect(screen.getByText(/Diet Labels:/i)).toBeInTheDocument();
    expect(screen.getByText(/Vegan/i)).toBeInTheDocument();
    expect(screen.getByText(/Health Labels:/i)).toBeInTheDocument();
    expect(screen.getByText(/Gluten-Free/i)).toBeInTheDocument();

    // Check for the list of ingredients
    expect(screen.getByText(/Ingredient 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Ingredient 2/i)).toBeInTheDocument();
  });
});
