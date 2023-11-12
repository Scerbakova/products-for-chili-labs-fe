import { SetStateAction } from "react";

export const navigateToPreviousPage = (startFromProduct: number, productsAmountOnPage: number, setStartFromProduct: React.Dispatch<SetStateAction<number>> = (): void => {}) => {
	const newStart = Math.max(startFromProduct - productsAmountOnPage, 0);
	setStartFromProduct(newStart);
}
