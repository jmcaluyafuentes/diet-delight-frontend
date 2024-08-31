// src/pages/__test__/Home.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom'; // Import jest-dom for additional matchers
import Home from '../Home';

// Mocking the HeroBanner and FeaturedRecipes components
vi.mock('../../components/Herobanner', () => ({
    default: () => <div>HeroBanner Component</div>
}));
vi.mock('../../components/FeaturedRecipes', () => ({
    default: () => <div>FeaturedRecipes Component</div>
}));

describe('Home Component', () => {
    it('renders the HeroBanner component', () => {
        render(<Home />);
        expect(screen.getByText('HeroBanner Component')).toBeInTheDocument();
    });

    it('renders the FeaturedRecipes component', () => {
        render(<Home />);
        expect(screen.getByText('FeaturedRecipes Component')).toBeInTheDocument();
    });

    it('should match the snapshot', () => {
        const { asFragment } = render(<Home />);
        expect(asFragment()).toMatchSnapshot();
    });
});
