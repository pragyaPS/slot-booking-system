import ConfirmationModal from '@/components/cancellation-confirmation-modal/confirmation-modal';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBookingDetails } from '@/hooks/use-booking-details';
import { useBookings } from '@/hooks/use-bookings';
import { BookingDetails } from '@/components/booking-details/booking-details';
import { BookingActions } from '@/components/booking-actions/booking-actions';

export default function BookedSlot() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { fetchBookingDetails, error, bookingDetails } = useBookingDetails();
	const { handleCancelBooking, isCancelling } = useBookings();
	const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

	const handleCancel = async () => {
		if (!bookingDetails) return;

		const success = await handleCancelBooking(bookingDetails.id);
		if (success) {
			navigate('/');
		}
	};

	useEffect(() => {
		if (!id) return;
		fetchBookingDetails(id);
	}, [id, fetchBookingDetails]);

	if (error) {
		return (
			<div role="alert" className="space-y-4">
				<p>{error}</p>
				<Button onClick={() => navigate('/')}>Return to homepage</Button>
			</div>
		);
	}
	if (!bookingDetails) {
		return (
			<div role="alert" className="space-y-4">
				<p>Booking not found</p>
				<Button onClick={() => navigate('/')}>Return to homepage</Button>
			</div>
		);
	}
	const handleJoinCall = () => {
		// Implement join call functionality
		console.log('Joining call...');
	};
	return (
		<>
			<div className="space-y-4">
				<div className="space-y-2">
					<h3 className="text-lg font-medium">
						Hello {bookingDetails.bookedCustomerName}
					</h3>
					<p className="text-muted-foreground">Your booked slot</p>
				</div>
				<BookingDetails booking={bookingDetails} />
				<BookingActions
					onCancelClick={() => setShowCancelConfirmation(true)}
					onJoinClick={handleJoinCall}
				/>
			</div>
			{/* this could also be lazy loaded */}
			<ConfirmationModal
				open={showCancelConfirmation}
				onClose={() => setShowCancelConfirmation(false)}
				onConfirm={handleCancel}
				isCancelling={isCancelling}
				title="Cancel Booking"
				description="Are you sure you want to cancel this booking? This action cannot be undone."
			/>
		</>
	);
}
