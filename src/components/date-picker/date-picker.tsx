import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';

interface DatePickerProps {
	selectedDate: string;
	onChange: (date: string) => void;
	onConfirm: () => void;
	isLoading: boolean;
}

export const DatePicker = ({
	selectedDate,
	onChange,
	isLoading,
	onConfirm,
}: DatePickerProps) => {
	return (
		<div className="space-y-2">
			<label htmlFor="date-picker" className="text-sm font-medium">
				Date
			</label>
			<Input
				type="date"
				id="date-picker"
				value={selectedDate}
				onChange={(e) => onChange(e.target.value)}
				className="date-picker"
				min={new Date().toISOString().split('T')[0]}
				aria-label="Select date for booking"
			/>
			<Button onClick={onConfirm} disabled={isLoading || !selectedDate}>
				{isLoading ? 'Loading...' : 'Confirm Date'}
			</Button>
		</div>
	);
};
