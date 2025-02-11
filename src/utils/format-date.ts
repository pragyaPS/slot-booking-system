export function getFormattedDate(isoString: string) {
	const dateObj = new Date(isoString);
	const formattedDate = dateObj.toLocaleDateString('en-GB', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
	});
	return formattedDate.split('/').join('.');
}
