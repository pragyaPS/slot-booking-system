import { Slot } from '@/api/request-response-types';
import { Button } from '@/components/ui/button';
import { getFormattedTime } from '@/utils/format-time';

interface SlotGridProps {
	slots: Slot[];
	onSlotSelect: (slot: Slot) => void;
}

export const SlotGrid = ({ slots, onSlotSelect }: SlotGridProps) => {
	if (!slots.length) {
		return (
			<p className="text-sm text-muted-foreground" role="alert">
				No slots available for this date. Please select another date (Preferably
				08.08.2024).
			</p>
		);
	}

	return (
		<div
			className="grid grid-cols-2 md:grid-cols-3 gap-3"
			role="group"
			aria-label="Available time slots"
		>
			{slots.map((slot) => (
				<Button
					key={slot.startDate}
					variant="outline"
					onClick={() => onSlotSelect(slot)}
					aria-label={`Book slot at ${getFormattedTime(slot.startDate)}`}
				>
					{getFormattedTime(slot.startDate)}
				</Button>
			))}
		</div>
	);
};
