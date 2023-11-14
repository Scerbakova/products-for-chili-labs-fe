import { ChangeEvent } from 'react';

interface InputSearchProps {
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputSearch = ({ handleSearchChange }: InputSearchProps) => {
    return (
        <input
            type="text"
            placeholder="Search products..."
            onChange={handleSearchChange}
            className="py-2 my-6 w-full sm:w-[45%] self-center focus:outline-none bg-transparent border-b-2"
        />
    );
};

export default InputSearch;
