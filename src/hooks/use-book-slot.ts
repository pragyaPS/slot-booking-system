import { bookSlot } from '@/api/book-slot';
import { useToast } from './use-toast';
import { useNavigate } from 'react-router-dom';

export const useBookSlot = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	const handleBookSlot = async (slotId: string, customerName: string) => {
		try {
			const res = await bookSlot(slotId, customerName);
			if (res.data?.isBooked) {
				toast({
					title: 'Success',
					description: 'Your booking has been confirmed!',
				});
				navigate(`booking/${res.data.id}`);
				return true;
			}
			return false;
		} catch (e) {
			toast({
				variant: 'destructive',
				title: 'Error',
				description: 'Failed to create booking',
			});
			console.error('Error creating booking:', e);
			return false;
		}
	};

	return { handleBookSlot };
};
