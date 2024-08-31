import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import DietarySelection from '../DietarySelection.jsx';
import userEvent from '@testing-library/user-event';

// Mock components and functions used in DietarySelection
// Mocking CheckboxGroup component
vi.mock('../components/CheckboxGroup.jsx', () => ({
  __esModule: true,
  default: ({ title, options, selectedOptions, onChange }) => (
    <div>
      <h3>{title}</h3>
      {options.map(option => (
        <label key={option}>
          <input
            type="checkbox"
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={onChange}
          />
          {option}
        </label>
      ))}
    </div>
  )
}));

// Mocking DisplayErrorMessage component
vi.mock('../components/DisplayErrorMessage.jsx', () => ({
  __esModule: true,
  default: ({ message, style }) => (
    message ? <div className={style}>{message}</div> : null
  )
}));

// Mocking SearchRecipeButton component
vi.mock('../components/SearchRecipeButton.jsx', () => ({
  __esModule: true,
  default: ({ dietCriteria, healthCriteria, setErrorMessage, setRecipes, setIsSearchClicked, setIsLoading }) => (
    <button
      onClick={() => {
        setIsSearchClicked(true);
        setIsLoading(true);
        // Simulate fetching recipes
        setTimeout(() => {
          setRecipes([{ title: 'Mock Recipe', caloriesPerServing: 100 }]);
          setIsLoading(false);
        }, 1000);
      }}
    >
      Search
    </button>
  )
}));

describe('DietarySelection Component', () => {
  // Test to ensure the component renders correctly
  test('renders correctly', () => {
    render(<DietarySelection />);

    // Check if the title and subtitle are rendered
    expect(screen.getByText('Recipe Search')).toBeInTheDocument();
    expect(screen.getByText('Select Your Dietary and Health Criteria')).toBeInTheDocument();
  });

  // Test to check if checkbox changes are handled correctly
  test('handles checkbox changes correctly', () => {
    render(<DietarySelection />);

    // Find and interact with checkboxes
    const veganCheckbox = screen.getByLabelText('Vegan');
    fireEvent.click(veganCheckbox);
    expect(veganCheckbox).toBeChecked();

    const glutenFreeCheckbox = screen.getByLabelText('Gluten-Free');
    fireEvent.click(glutenFreeCheckbox);
    expect(glutenFreeCheckbox).toBeChecked();
  });

  // Test to ensure error message is displayed when criteria are not selected
  test('displays error message when provided', () => {
    render(<DietarySelection />);

    // Simulate setting an error message by clicking the Search button
    fireEvent.click(screen.getByText('Search'));
    expect(screen.getByText('Please tick at least one dietary or health criterion below')).toBeInTheDocument();
  });
});
