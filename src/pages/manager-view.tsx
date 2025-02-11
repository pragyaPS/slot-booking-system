import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';
import { Slot } from '@/api/request-response-types';
import ConfirmationModal from '@/components/cancellation-confirmation-modal/confirmation-modal';
import { BookingTable } from '@/components/booking-table/booking-table';
import { useBookings } from '@/hooks/use-bookings';

export default function ManagerView() {
	const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
	const slotToCancel = useRef<string | null>(null);
	const { bookings, error, fetchBookings, handleCancelBooking, isCancelling } =
		useBookings();
	const handleCancelClick = (id: Slot['id']) => {
		slotToCancel.current = id;
		setShowCancelConfirmation(true);
	};

	const handleConfirmCancel = async () => {
		if (!slotToCancel.current) return;
		const success = await handleCancelBooking(slotToCancel.current);
		if (success) {
			setShowCancelConfirmation(false);
			slotToCancel.current = null;
		}
	};

	useEffect(() => {
		fetchBookings();
	}, [fetchBookings]);

	if (error) {
		return (
			<Card>
				<CardContent>
					<div role="alert">{error}</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Booked slots</CardTitle>
			</CardHeader>
			<CardContent>
				<BookingTable
					bookings={bookings || []}
					onCancelBooking={handleCancelClick}
				/>
			</CardContent>
			{/* this could also be lazy loaded */}
			<ConfirmationModal
				open={showCancelConfirmation}
				onClose={() => setShowCancelConfirmation(false)}
				onConfirm={handleConfirmCancel}
				title="Cancel Booking"
				isCancelling={isCancelling}
				description="Are you sure you want to cancel this booking? This action cannot be undone."
			/>
		</Card>
	);
}
