import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputSearch from './InputSearch';

const user = userEvent.setup();

describe('InputSearch component', () => {
    it('renders the input field', () => {
        render(<InputSearch handleSearchChange={() => {}} />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('updates input value on change', async () => {
        render(<InputSearch handleSearchChange={() => {}} />);
        const input = screen.getByRole('textbox');
        await user.click(input);
        expect(input).toHaveFocus();
        await user.type(input, 'sample text');
        expect(input).toHaveValue('sample text');
    });
    it('calls handleSearchChange on change', async () => {
        const handleSearchChange = jest.fn();
        render(<InputSearch handleSearchChange={handleSearchChange} />);
        const input = screen.getByRole('textbox');
        await user.click(input);
        expect(input).toHaveFocus();
        await user.type(input, 'sample text');
        expect(handleSearchChange).toHaveBeenCalled();
    });

    it('does not trigger handleSearchChange if the input value remains unchanged', async () => {
        const handleSearchChange = jest.fn();
        render(<InputSearch handleSearchChange={handleSearchChange} />);
        const input = screen.getByRole('textbox');
        await user.click(input);
        expect(input).toHaveFocus();
        expect(handleSearchChange).not.toHaveBeenCalled();
    });

    it('handles edge cases of clearing input and calling handleSearchChange', async () => {
        const handleSearchChange = jest.fn();
        render(<InputSearch handleSearchChange={handleSearchChange} />);
        const input = screen.getByRole('textbox');
        await user.type(input, 'sample text');
        await user.clear(input);
        expect(input).toHaveValue('');
        expect(handleSearchChange).toHaveBeenCalled();
    });
});
