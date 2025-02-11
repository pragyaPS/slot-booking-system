import { useState } from 'react';
import { Slot } from '../api/request-response-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookingModal } from '@/components/booking-modal/booking-modal';
import { useNavigate } from 'react-router-dom';
import { useAvailableSlots } from '@/hooks/use-available-slots';
import { useBookSlot } from '@/hooks/use-book-slot';
import { DatePicker } from '@/components/date-picker/date-picker';
import { SlotGrid } from '@/components/booking-slots-grid/bookings-slot-grid';

const CustomerBooking: React.FC = () => {
	const navigate = useNavigate();
	const [selectedDate, setSelectedDate] = useState<string>(
		new Date().toISOString().split('T')[0]
	); // Default to today
	const [selectedSlot, setSelectedSlot] = useState<Slot>();
	const [showModal, setShowModal] = useState(false);
	const { slots, isLoading, error, fetchSlots } = useAvailableSlots();
	const { handleBookSlot } = useBookSlot();
	const [showSlots, setShowSlots] = useState(false);

	const handleSlotSelect = (slot: Slot) => {
		setSelectedSlot(slot);
		if (slot.isBooked) {
			navigate(`booking/${slot.id}`);
		} else {
			setShowModal(true);
		}
	};

	const handleBookingConfirm = async (customerName: string) => {
		if (!selectedSlot) return;

		const success = await handleBookSlot(selectedSlot.id, customerName);
		if (success) {
			setShowModal(false);
		}
	};

	const handleConfirmDate = async () => {
		setShowSlots(true);
		await fetchSlots(selectedDate);
	};

	const handleDateChange = (date: string) => {
		setSelectedDate(date);
		setShowSlots(false); // Hide slots when date changes
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Booking</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<DatePicker
					selectedDate={selectedDate}
					onChange={handleDateChange}
					onConfirm={handleConfirmDate}
					isLoading={isLoading}
				/>
				{!isLoading && !error && showSlots && (
					<div className="space-y-2">
						<label className="text-sm font-medium">Pick a slot</label>
						{/* we could have component level error boundary here */}
						<SlotGrid slots={slots} onSlotSelect={handleSlotSelect} />
					</div>
				)}
			</CardContent>
			{isLoading && <div role="status">Loading available slots...</div>}

			{error && (
				<div role="alert" className="text-red-500">
					{error}
				</div>
			)}
			{selectedSlot && (
				<BookingModal
					open={showModal}
					onClose={() => setShowModal(false)}
					onConfirm={handleBookingConfirm}
					slot={selectedSlot}
				/>
			)}
		</Card>
	);
};
export default CustomerBooking;
