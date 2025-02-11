import { GetSlotsParams, Slot } from '@/api/request-response-types';
import { useCallback, useState } from 'react';
import { useToast } from './use-toast';
import { getSlots } from '@/api/get-slots';
import { cancelBooking } from '@/api/cancel-bookig';

export const useBookings = () => {
	const [bookings, setBookings] = useState<Array<Slot>>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isCancelling, setIsCancelling] = useState(false);
	const { toast } = useToast();

	const fetchBookings = useCallback(
		async (params?: GetSlotsParams) => {
			try {
				setIsLoading(true);
				setError(null);
				const res = await getSlots(params || { isBooked: 'true' });
				setBookings(res.data);
			} catch (e) {
				setError('Failed to fetch bookings');
				toast({
					variant: 'destructive',
					title: 'Error',
					description: 'Failed to fetch bookings',
				});
				console.error('Error fetching bookings', e);
			} finally {
				setIsLoading(false);
			}
		},
		[toast]
	);

	const handleCancelBooking = async (id: string) => {
		try {
			setIsCancelling(true);
			const res = await cancelBooking(id);
			if (res.data?.id) {
				toast({
					title: 'Success',
					description: 'Booking has been cancelled',
				});
				await fetchBookings();
				return true;
			}
		} catch (e) {
			toast({
				variant: 'destructive',
				title: 'Error',
				description: 'Failed to cancel booking',
			});
			console.error('Error cancelling booking:', e);
			return false;
		} finally {
			setIsCancelling(false);
		}
	};

	return {
		bookings,
		isLoading,
		error,
		fetchBookings,
		handleCancelBooking,
		isCancelling,
	};
};
