import { useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slot } from '@/api/request-response-types';
import { getFormattedDate } from '@/utils/format-date';
import { getFormattedTime } from '@/utils/format-time';

interface BookingModalProps {
	open: boolean;
	onClose: () => void;
	onConfirm: (name: string) => void;
	slot: Slot;
}

export function BookingModal({
	open,
	onClose,
	onConfirm,
	slot,
}: BookingModalProps) {
	const [name, setName] = useState('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onConfirm(name);
		setName('');
	};

	return (
		<Dialog open={open} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Book this slot?</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<label className="text-sm font-medium">Your Name:</label>
						<Input
							value={name}
							onChange={(e) => setName(e?.target?.value as string)}
							placeholder="Enter your name"
							required
						/>
					</div>
					<div className="space-y-1 text-sm">
						<p>Date: {getFormattedDate(slot.startDate)}</p>
						<p>Time: {getFormattedTime(slot.startDate)}</p>
						<p>Duration: 60 minutes</p>
					</div>
					<div className="flex justify-end gap-2">
						<Button type="button" variant="outline" onClick={onClose}>
							Cancel
						</Button>
						<Button type="submit">Book</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
