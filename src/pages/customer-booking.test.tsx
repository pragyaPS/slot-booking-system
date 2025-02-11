import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useNavigate } from 'react-router-dom';
import CustomerBooking from './customer-booking';
import * as useAvailable from '@/hooks/use-available-slots';

vi.mock('react-router-dom', () => ({
	useNavigate: vi.fn(),
}));

vi.mock('@/hooks/use-available-slots', () => ({
	useAvailableSlots: () => ({
		slots: mockSlots,
		isLoading: false,
		error: null,
		fetchSlots: vi.fn(),
	}),
}));

vi.mock('@/hooks/use-book-slot', () => ({
	useBookSlot: () => ({
		handleBookSlot: vi.fn().mockResolvedValue(true),
	}),
}));

const mockSlots = [
	{
		id: '1',
		startDate: '2024-03-20T10:00:00Z',
		isBooked: false,
	},
	{
		id: '2',
		startDate: '2024-03-20T11:00:00Z',
		isBooked: true,
	},
];

const renderComponent = (component: React.ReactNode) => {
	return render(component);
};

describe('CustomerBooking', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders initial state correctly', () => {
		renderComponent(<CustomerBooking />);
		expect(screen.getByText('Booking')).toBeInTheDocument();
		expect(
			screen.getByRole('button', { name: /confirm date/i })
		).toBeInTheDocument();
	});

	it('shows loading state while fetching slots', () => {
		vi.spyOn(useAvailable, 'useAvailableSlots').mockImplementationOnce(() => ({
			slots: [],
			isLoading: true,
			error: null,
			fetchSlots: vi.fn(),
		}));

		renderComponent(<CustomerBooking />);
		expect(screen.getByRole('status')).toHaveTextContent(
			'Loading available slots...'
		);
	});

	it('shows error when fetch fails', () => {
		vi.spyOn(useAvailable, 'useAvailableSlots').mockImplementationOnce(() => ({
			slots: [],
			isLoading: false,
			error: 'Failed to fetch slots',
			fetchSlots: vi.fn(),
		}));

		renderComponent(<CustomerBooking />);
		expect(screen.getByRole('alert')).toHaveTextContent(
			'Failed to fetch slots'
		);
	});

	it('handles slot selection for unbooked slot', async () => {
		renderComponent(<CustomerBooking />);

		// Confirm date to show slots
		const confirmButton = screen.getByRole('button', { name: /confirm date/i });
		userEvent.click(confirmButton);
		const slot = await screen.findByText('11:00');
		userEvent.click(slot);

		await waitFor(() => expect(screen.getByRole('dialog')).toBeInTheDocument());
	});

	it('handles slot selection for booked slot', async () => {
		const mockNavigate = vi.fn();
		vi.mocked(useNavigate).mockReturnValue(mockNavigate);
		renderComponent(<CustomerBooking />);

		// Confirm date to show slots
		const confirmButton = screen.getByRole('button', { name: /confirm date/i });
		userEvent.click(confirmButton);
		const slot = await screen.findByText('12:00');
		userEvent.click(slot);

		await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('booking/2'));
	});

	it('handles date change correctly', async () => {
		renderComponent(<CustomerBooking />);

		const dateInput = screen.getByLabelText('Date');
		userEvent.clear(dateInput);
		await userEvent.type(dateInput, '2024-01-21');
		expect(dateInput.getAttribute('value')).toBe('2024-01-21');
	});
});
