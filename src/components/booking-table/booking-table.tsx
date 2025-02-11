import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { Slot } from '@/api/request-response-types';
import { getFormattedDate } from '@/utils/format-date';
import { getFormattedTime } from '@/utils/format-time';

interface BookingTableProps {
	bookings: Slot[];
	onCancelBooking: (id: string) => void;
}

interface BookingRowProps {
	booking: Slot;
	onCancelBooking: (id: string) => void;
}

const BookingRow = ({ booking, onCancelBooking }: BookingRowProps) => {
	return (
		<tr>
			<td className="p-4 border-b">
				<time dateTime={booking.startDate}>
					{getFormattedDate(booking.startDate)}{' '}
					{getFormattedTime(booking.startDate)}
				</time>
			</td>
			<td className="p-4 border-b">{booking.bookedCustomerName}</td>
			<td className="p-4 border-b">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => onCancelBooking(booking.id)}
					aria-label={`Cancel booking for ${booking.bookedCustomerName}`}
				>
					<X className="h-4 w-4" />
				</Button>
			</td>
		</tr>
	);
};

export const BookingTable = ({
	bookings,
	onCancelBooking,
}: BookingTableProps) => {
	if (!bookings?.length) {
		return <div role="status">There are no booked slots</div>;
	}

	return (
		<div className="border rounded-lg">
			<table className="w-full">
				<thead>
					<tr>
						<th className="p-4 border-b text-left">Date</th>
						<th className="p-4 border-b text-left">Name</th>
						<th className="p-4 border-b"></th>
					</tr>
				</thead>
				<tbody>
					{bookings.map((booking) => (
						<BookingRow
							key={booking.id}
							booking={booking}
							onCancelBooking={onCancelBooking}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};
