import { SetStateAction } from "react";

export const navigateToNextPage = (startFromProduct: number, productsAmountOnPage: number, productsLength: number, setStartFromProduct: React.Dispatch<SetStateAction<number>> = (): void => {}) => {
	const newStart = Math.min(startFromProduct + productsAmountOnPage, productsLength - productsAmountOnPage);
	setStartFromProduct(newStart);
}
