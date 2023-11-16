import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner Component', () => {
    test('renders spinner with the correct attributes', () => {
        render(<Spinner />);

        const spinnerElement = screen.getByTestId('spinner');
        expect(spinnerElement).toBeInTheDocument();

        const svgElement = spinnerElement.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveClass(
            'inline w-14 h-14 text-gray-200 animate-spin dark:text-gray-600 fill-red-900'
        );
        expect(svgElement).toHaveAttribute('aria-hidden', 'true');
        expect(svgElement).toHaveAttribute('viewBox', '0 0 100 101');
        expect(svgElement).toHaveAttribute('fill', 'none');

        const pathElements = svgElement?.querySelectorAll('path');
        expect(pathElements).toHaveLength(2);

        const spanElement = spinnerElement.querySelector('span.sr-only');
        expect(spanElement).toBeInTheDocument();
        expect(spanElement).toHaveTextContent('Loading...');
    });
});
