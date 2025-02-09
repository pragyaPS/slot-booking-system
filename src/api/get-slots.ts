import { fetchWrapper } from './fetch-wrapper';
import { GetSlotsParams, GetSlotsResponse } from './request-response-types';
export const getSlots = async (params: GetSlotsParams) => {
	return fetchWrapper<GetSlotsResponse, GetSlotsParams>('slots', params);
};
