import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import ShowRecipes from './ShowRecipes';

const sampleRecipes = [
    {
        id: '1',
        title: 'Recipe 1',
        image: 'http://example.com/image1.jpg',
        caloriesPerServing: 250,
        servingSize: '1 bowl',
        dietLabels: ['Vegan'],
        healthLabels: ['Gluten-Free'],
        ingredients: ['Ingredient 1', 'Ingredient 2'],
        instructionsUrl: 'http://example.com/instructions1',
        source: 'Recipe Source 1'
    },
    {
        id: '2',
        title: 'Recipe 2',
        image: 'http://example.com/image2.jpg',
        caloriesPerServing: 300,
        servingSize: '2 bowls',
        dietLabels: ['Low-Carb'],
        healthLabels: ['Nut-Free'],
        ingredients: ['Ingredient A', 'Ingredient B'],
        instructionsUrl: 'http://example.com/instructions2',
        source: 'Recipe Source 2'
    }
];

describe('ShowRecipes Component', () => {
    test('renders a list of recipes', () => {
        render(<ShowRecipes recipes={sampleRecipes} />);
        
        // Check if each recipe title is rendered
        sampleRecipes.forEach(recipe => {
            expect(screen.getByText(recipe.title)).toBeInTheDocument();
        });

        // Check if key elements are present in the component
        expect(screen.getAllByText(/Diet Labels:/i)).toHaveLength(sampleRecipes.length); // Expect multiple labels
        expect(screen.getAllByText(/Health Labels:/i)).toHaveLength(sampleRecipes.length); // Expect multiple labels
        
        // Check for the presence of "See instructions" button
        expect(screen.getAllByText('See instructions')).toHaveLength(sampleRecipes.length);
    });

    test('displays a message when no recipes are provided', () => {
        render(<ShowRecipes recipes={[]} />);
        expect(screen.getByText('No recipes found.')).toBeInTheDocument();
    });

    test('renders recipe images with correct src and alt attributes', () => {
        render(<ShowRecipes recipes={sampleRecipes} />);
    
        sampleRecipes.forEach(recipe => {
            const img = screen.getByAltText(recipe.title);
            expect(img).toHaveAttribute('src', recipe.image);
        });
    });

    test('displays nutritional information correctly', () => {
        render(<ShowRecipes recipes={sampleRecipes} />);
    
        sampleRecipes.forEach(recipe => {
            expect(screen.getByText(`Calories: ${recipe.caloriesPerServing.toFixed(2)} kcal`)).toBeInTheDocument();
            expect(screen.getByText(`Serving Size: ${recipe.servingSize}`)).toBeInTheDocument();
        });
    });
    
    test('renders the ingredients list for each recipe', () => {
        render(<ShowRecipes recipes={sampleRecipes} />);
    
        sampleRecipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                expect(screen.getByText(ingredient)).toBeInTheDocument();
            });
        });
    });
    
    test('displays "No recipes found" when recipes array is empty', () => {
        render(<ShowRecipes recipes={[]} />);
        expect(screen.getByText('No recipes found.')).toBeInTheDocument();
    });
    
});
