import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import DietarySelection from './DietarySelection';

// Mock function for onFetchRecipes
const mockOnFetchRecipes = vi.fn();

describe('DietarySelection Component', () => {
  test('renders the component with title and checkboxes', () => {
    render(<DietarySelection onFetchRecipes={mockOnFetchRecipes} />);
    
    // Check if the title is rendered
    expect(screen.getByText(/Select Your Dietary and Health Criteria/i)).toBeInTheDocument();
    
    // Check if CheckboxGroup components are rendered
    expect(screen.getByText(/Dietary Preferences/i)).toBeInTheDocument();
    expect(screen.getByText(/Health Considerations/i)).toBeInTheDocument();
    
    // Check if the search button is rendered
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument();
  });

  test('checkboxes update state on change', () => {
    render(<DietarySelection onFetchRecipes={mockOnFetchRecipes} />);
    
    // Find and click a checkbox for dietary criteria
    const balancedCheckbox = screen.getByLabelText(/balanced/i);
    fireEvent.click(balancedCheckbox);
    expect(balancedCheckbox.checked).toBe(true);
    
    // Click the checkbox again to uncheck it
    fireEvent.click(balancedCheckbox);
    expect(balancedCheckbox.checked).toBe(false);
  });

  test('calls onFetchRecipes with correct parameters when search button is clicked', () => {
    render(<DietarySelection onFetchRecipes={mockOnFetchRecipes} />);
    
    // Mock the checkbox state
    const dietCheckbox = screen.getByLabelText(/high-fiber/i);
    fireEvent.click(dietCheckbox);
    const healthCheckbox = screen.getByLabelText(/dairy-free/i);
    fireEvent.click(healthCheckbox);
    
    // Click the search button
    fireEvent.click(screen.getByRole('button', { name: /Search/i }));
    
    // Check if onFetchRecipes was called with the correct parameters
    expect(mockOnFetchRecipes).toHaveBeenCalledWith(['high-fiber'], ['dairy-free']);
  });
});
