import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // for the 'toBeInTheDocument' matcher
import Contact from '../Contact';

describe('Contact Component', () => {
    test('renders the Contact page with correct title', () => {
        render(<Contact />);
        
        // Check if the contact title is rendered
        expect(screen.getByRole('heading', { level: 1, name: /Contact/i })).toBeInTheDocument();
    });

    test('renders the introduction paragraph', () => {
        render(<Contact />);
        
        // Check if the introduction paragraph is rendered
        expect(screen.getByText(/Diet Delight was developed by three aspiring Software Developers./i)).toBeInTheDocument();
    });

    test('renders team member headings', () => {
        render(<Contact />);
        
        // Check if there are three team member headings
        expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
    });

    test('renders GitHub links for each team member', () => {
        render(<Contact />);
        
        // Get all GitHub links
        const links = screen.getAllByRole('link', { name: /Github/i });
        
        // Verify the number of links found
        expect(links).toHaveLength(3);

        // Verify each link has the correct href attribute
        expect(links[0]).toHaveAttribute('href', 'https://github.com/jmcaluyafuentes');
        expect(links[1]).toHaveAttribute('href', 'https://github.com/hynguyenduc');
        expect(links[2]).toHaveAttribute('href', 'https://github.com/duskpeyl');
    });
});
