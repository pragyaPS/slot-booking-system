import { fetchWrapper } from './fetch-wrapper';
import { BookSlotResponse } from './request-response-types';

export const bookSlot = async (id: string) => {
	return fetchWrapper<BookSlotResponse>(`slots/${id}/book`, undefined, {
		method: 'POST',
	});
};
