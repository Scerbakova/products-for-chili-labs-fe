import { ChangeEvent } from "react";

interface SearchProps {
  searchTerm: string;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ searchTerm, handleSearchChange }: SearchProps) => {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="py-2 my-6 w-full sm:w-[45%] self-center focus:outline-none bg-transparent border-b-2"
    />
  );
};

export default Search;