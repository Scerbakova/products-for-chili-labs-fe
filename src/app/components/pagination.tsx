interface PaginationProps {
	onPreviousClick: () => void;
	previousButtonDisabled: boolean;
	onNextClick: () => void;
	nextButtonDisabled: boolean;
}

const Pagination = ({ onPreviousClick, previousButtonDisabled, onNextClick, nextButtonDisabled }: PaginationProps) => {
  
  const buttonClass = "bg-lime-900 text-white rounded p-2 m-2 w-32 disabled:bg-gray-700 disabled:cursor-not-allowed";

	return (
		<div className="flex flex-row justify-center m-6">
		<button onClick={onPreviousClick} disabled={previousButtonDisabled} className={buttonClass}>
			Previous Page
		</button>
		<button onClick={onNextClick} disabled={nextButtonDisabled} className={buttonClass}>
			Next Page
		</button>
	</div>
	);
}
export default Pagination;