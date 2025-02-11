import { describe, it, expect } from 'vitest';
import { getFormattedDate } from './format-date';

describe('getFormattedDate', () => {
	it('formats date correctly with double digits', () => {
		const input = '2024-12-25T10:00:00Z';
		const result = getFormattedDate(input);
		expect(result).toBe('25.12.2024');
	});

	it('formats date with single digit day and month', () => {
		const input = '2024-01-05T10:00:00Z';
		const result = getFormattedDate(input);
		expect(result).toBe('05.01.2024');
	});

	it('handles last day of month', () => {
		const input = '2024-03-31T10:00:00Z';
		const result = getFormattedDate(input);
		expect(result).toBe('31.03.2024');
	});

	it('handles first day of month', () => {
		const input = '2024-03-01T10:00:00Z';
		const result = getFormattedDate(input);
		expect(result).toBe('01.03.2024');
	});
});
