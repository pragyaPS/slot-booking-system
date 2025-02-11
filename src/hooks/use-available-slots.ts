import { useCallback, useState } from 'react';
import { useToast } from './use-toast';
import { getSlots } from '@/api/get-slots';
import { Slot } from '@/api/request-response-types';

export const useAvailableSlots = () => {
	const [slots, setSlots] = useState<Slot[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { toast } = useToast();

	const fetchSlots = useCallback(
		async (date: string) => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await getSlots({ date });
				if (response.success) {
					setSlots(response.data || []);
				} else {
					setError(response.error?.message || 'Failed to fetch slots.');
					toast({
						variant: 'destructive',
						title: 'Error',
						description: 'Failed to fetch slots',
					});
				}
			} catch (err) {
				const errorMessage = (err as Error).message;
				setError(errorMessage);
				toast({
					variant: 'destructive',
					title: 'Error',
					description: 'Failed to fetch slots',
				});
			} finally {
				setIsLoading(false);
			}
		},
		[toast]
	);

	return {
		slots,
		isLoading,
		error,
		fetchSlots,
	};
};
