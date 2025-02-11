import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';

interface ConfirmationModalProps {
	open: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	description: string;
	isCancelling?: boolean;
}

export default function ConfirmationModal({
	open,
	onClose,
	onConfirm,
	title,
	description,
	isCancelling = false,
}: ConfirmationModalProps) {
	return (
		<AlertDialog open={open} onOpenChange={onClose}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onClose}>Close</AlertDialogCancel>
					<AlertDialogAction onClick={onConfirm} disabled={isCancelling}>
						{isCancelling ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								Cancelling...
							</>
						) : (
							'Cancel booking'
						)}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
