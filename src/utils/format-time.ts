export function getFormattedTime(isoString: string) {
	const dateObj = new Date(isoString);
	const formattedTime = dateObj.toLocaleTimeString(undefined, {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false, // Ensures 24-hour format
	});
	return formattedTime;
}
