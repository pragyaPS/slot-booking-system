import { Slot } from '@/api/request-response-types';
import { useCallback, useState } from 'react';
import { useToast } from './use-toast';
import { getSlotById } from '@/api/get-slot-by-id';

export const useBookingDetails = () => {
	const [bookingDetails, setBookingDetails] = useState<Slot>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { toast } = useToast();

	const fetchBookingDetails = useCallback(
		async (id: string) => {
			if (!id) return;

			try {
				setIsLoading(true);
				setError(null);
				const res = await getSlotById(id);
				setBookingDetails(res.data);
			} catch (e) {
				setError('Failed to load booking details');
				toast({
					variant: 'destructive',
					title: 'Error',
					description: 'Failed to load existing booking',
				});
				console.error('Error fetching booking details:', e);
			} finally {
				setIsLoading(false);
			}
		},
		[toast]
	);

	return {
		bookingDetails,
		isLoading,
		error,
		fetchBookingDetails,
	};
};
