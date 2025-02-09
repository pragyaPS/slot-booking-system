import { fetchWrapper } from './fetch-wrapper';
import { GetSlotByIdResponse } from './request-response-types';

export const getSlotById = async (id: string) => {
	return fetchWrapper<GetSlotByIdResponse>(`slots/${id}`);
};
