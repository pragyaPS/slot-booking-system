import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BookingDetails } from './booking-details';
import '@testing-library/jest-dom';
import { mockBookings } from '@/api/mocks/mock-bookings';

describe('BookingDetails', () => {
	const mockBooking = mockBookings[0];

	it('renders booking details correctly', () => {
		render(<BookingDetails booking={mockBooking} />);

		expect(
			screen.getByRole('group', { name: /booking details/i })
		).toBeInTheDocument();
		expect(screen.getByText(/date:/i)).toBeInTheDocument();
		expect(screen.getByText(/time:/i)).toBeInTheDocument();
		expect(screen.getByText(/duration: 60 minutes/i)).toBeInTheDocument();
	});

	it('formats date correctly', () => {
		render(<BookingDetails booking={mockBooking} />);

		const dateElement = screen.getByText(/date:/i);
		expect(dateElement).toBeInTheDocument();
		expect(dateElement).toHaveTextContent('Date: 08.08.2024');
	});

	it('formats time correctly', () => {
		render(<BookingDetails booking={mockBooking} />);

		const timeElement = screen.getByText(/time:/i);
		expect(timeElement).toBeInTheDocument();
		expect(timeElement).toHaveTextContent('Time: 11:00');
	});

	it('has correct accessibility attributes', () => {
		render(<BookingDetails booking={mockBooking} />);

		const container = screen.getByRole('group', { name: /booking details/i });
		expect(container).toHaveAttribute('aria-label', 'Booking details');
	});
});
