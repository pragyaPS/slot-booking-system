export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	error?: ApiError;
}

export interface ApiError {
	code: number;
	message: string;
	errors: Array<{ location: string; message: string }>;
}

// Slot Type
export interface Slot {
	id: string;
	startDate: string; // ISO format
	isBooked: 'true' | 'false';
	bookedCustomerName?: string;
}

// API Responses
export type GetSlotsResponse = ApiResponse<Slot[]>;
export type GetSlotByIdResponse = ApiResponse<Slot>;
export type BookSlotResponse = ApiResponse<Slot>;
export type CancelBookingResponse = ApiResponse<Slot>;

// Query Params Types
export interface GetSlotsParams {
	date?: string;
	isBooked?: 'true' | 'false';
}
