import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

const user = userEvent.setup();

describe('Pagination component', () => {
    it('renders the previous and next buttons', () => {
        render(
            <Pagination
                onPreviousClick={() => {}}
                previousButtonDisabled={false}
                onNextClick={() => {}}
                nextButtonDisabled={false}
            />
        );

        const previousButton = screen.getByRole('button', {
            name: 'Previous Page',
        });
        const nextButton = screen.getByRole('button', { name: 'Next Page' });

        expect(previousButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
    });

    it('disables buttons based on provided props', () => {
        render(
            <Pagination
                onPreviousClick={() => {}}
                previousButtonDisabled={true}
                onNextClick={() => {}}
                nextButtonDisabled={true}
            />
        );

        const previousButton = screen.getByRole('button', {
            name: 'Previous Page',
        });
        const nextButton = screen.getByRole('button', { name: 'Next Page' });

        expect(previousButton).toBeDisabled();
        expect(nextButton).toBeDisabled();
    });

    it('invokes the provided functions on button click', async () => {
        const previousClickMock = jest.fn();
        const nextClickMock = jest.fn();

        render(
            <Pagination
                onPreviousClick={previousClickMock}
                previousButtonDisabled={false}
                onNextClick={nextClickMock}
                nextButtonDisabled={false}
            />
        );

        const previousButton = screen.getByRole('button', {
            name: 'Previous Page',
        });
        const nextButton = screen.getByRole('button', { name: 'Next Page' });

        await user.click(nextButton);
        await user.click(previousButton);

        expect(nextClickMock).toHaveBeenCalledTimes(1);
        expect(previousClickMock).toHaveBeenCalledTimes(1);
    });
    it('handles missing click handlers', () => {
        render(
            <Pagination
                previousButtonDisabled={false}
                nextButtonDisabled={false}
            />
        );

        const previousButton = screen.getByRole('button', {
            name: 'Previous Page',
        });
        const nextButton = screen.getByRole('button', { name: 'Next Page' });

        expect(() => user.click(previousButton)).not.toThrow();
        expect(() => user.click(nextButton)).not.toThrow();
    });
});
