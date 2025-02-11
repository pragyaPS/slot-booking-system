import { Button } from '@/components/ui/button';

interface BookingActionsProps {
	onCancelClick: () => void;
	onJoinClick: () => void;
}

export const BookingActions = ({
	onCancelClick,
	onJoinClick,
}: BookingActionsProps) => {
	return (
		<div className="flex gap-2">
			<Button
				variant="outline"
				onClick={onCancelClick}
				aria-label="Cancel this booking"
			>
				Cancel booking
			</Button>
			<Button onClick={onJoinClick} aria-label="Join your scheduled call">
				Join your call
			</Button>
		</div>
	);
};
