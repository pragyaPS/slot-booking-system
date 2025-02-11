import { Slot } from '@/api/request-response-types';
import { getFormattedDate } from '@/utils/format-date';
import { getFormattedTime } from '@/utils/format-time';

interface BookingDetailsProps {
	booking: Slot;
}

export const BookingDetails = ({ booking }: BookingDetailsProps) => {
	return (
		<div
			className="space-y-1 text-sm"
			role="group"
			aria-label="Booking details"
		>
			<div>
				<time dateTime={booking.startDate}>
					Date: {getFormattedDate(booking.startDate)}
				</time>
			</div>
			<div>
				<time dateTime={booking.startDate}>
					Time: {getFormattedTime(booking.startDate)}
				</time>
			</div>
			{/* hardcoded for now */}
			<p>Duration: 60 minutes</p>
		</div>
	);
};
