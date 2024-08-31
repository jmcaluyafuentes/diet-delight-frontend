import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ShowRecipes from '../ShowRecipes.jsx';

// Mock components used in ShowRecipes
vi.mock('../components/DisplayErrorMessage.jsx', () => ({
  __esModule: true,
  default: ({ message, style }) => (
    message ? <div className={style}>{message}</div> : null
  )
}));

vi.mock('../components/AddToPrintButton.jsx', () => ({
  __esModule: true,
  default: ({ recipe, setSelectedRecipes, isSelected }) => (
    <button
      onClick={() => {
        setSelectedRecipes(prev => {
          const newSet = new Set(prev);
          if (isSelected) {
            newSet.delete(recipe.instructionsUrl);
          } else {
            newSet.add(recipe.instructionsUrl);
          }
          return newSet;
        });
      }}
    >
      {isSelected ? 'Remove from Print' : 'Add to Print'}
    </button>
  )
}));

vi.mock('../components/PrintToPDFButton.jsx', () => ({
  __esModule: true,
  default: ({ recipes, selectedRecipes, isDisabled }) => (
    <button disabled={isDisabled}>Print to PDF</button>
  )
}));

vi.mock('../components/ButtonReturnToTop.jsx', () => ({
  __esModule: true,
  default: () => <button>Return to Top</button>
}));

describe('ShowRecipes Component', () => {
  test('displays error message when no recipes are available', () => {
    render(
      <MemoryRouter>
        <ShowRecipes recipes={[]} />
      </MemoryRouter>
    );
    expect(screen.getByText('Sorry, there are no recipes found. Please try other criteria.')).toBeInTheDocument();
  });

  test('renders recipes correctly', () => {
    const recipes = [
      {
        instructionsUrl: 'recipe-1',
        title: 'Recipe 1',
        caloriesPerServing: 100,
        dietLabels: ['Balanced'],
        healthLabels: ['Dairy-Free'],
        dishType: ['Main Course'],
        mealType: ['Dinner'],
        cuisineType: ['Italian'],
        ingredients: ['Ingredient 1', 'Ingredient 2'],
        preparation: 'Cook and serve.',
        source: 'Recipe Source'
      }
    ];

    render(
      <MemoryRouter>
        <ShowRecipes recipes={recipes} />
      </MemoryRouter>
    );

    // Check if recipe title and nutrition are rendered
    expect(screen.getByText('Recipe 1')).toBeInTheDocument();
    expect(screen.getByText(/Nutrition:/)).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument(); // Using regex to match the calories
    expect(screen.getByText(/Dish Type:\s*Main Course/i)).toBeInTheDocument(); // Flexible text matching
    expect(screen.getByText(/Meal Type:\s*Dinner/i)).toBeInTheDocument(); // Flexible text matching
    expect(screen.getByText(/Cuisine:\s*Italian/i)).toBeInTheDocument(); // Flexible text matching
    expect(screen.getByText('Ingredient 1')).toBeInTheDocument();
    expect(screen.getByText('Ingredient 2')).toBeInTheDocument();
  });
});
