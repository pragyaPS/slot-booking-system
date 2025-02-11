import { describe, it, expect } from 'vitest';
import { getFormattedTime } from './format-time';

/**
 * The output of these tests will vary on the machine the tests are
 * being executed. It's better to set a timezone in vitest config
 * so that we always get consistent results
 */

describe('getFormattedTime', () => {
	it('formats morning time correctly', () => {
		const input = '2024-03-20T09:30:00Z';
		expect(getFormattedTime(input)).toBe('10:30');
	});

	it('formats afternoon time correctly', () => {
		const input = '2024-03-20T14:30:00Z';
		expect(getFormattedTime(input)).toBe('15:30');
	});

	it('handles midnight correctly', () => {
		const input = '2024-03-20T00:00:00Z';
		expect(getFormattedTime(input)).toBe('01:00');
	});

	it('handles noon correctly', () => {
		const input = '2024-03-20T12:00:00Z';
		expect(getFormattedTime(input)).toBe('13:00');
	});

	it('formats time with single digit hour', () => {
		const input = '2024-03-20T04:30:00Z';
		expect(getFormattedTime(input)).toBe('05:30');
	});
});
