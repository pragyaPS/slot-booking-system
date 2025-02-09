import { fetchWrapper } from './fetch-wrapper';
import { CancelBookingResponse } from './request-response-types';

export const cancelBooking = async (id: string) => {
	return fetchWrapper<CancelBookingResponse>(
		`slots/${id}/cancel-booking`,
		undefined,
		{ method: 'POST' }
	);
};
