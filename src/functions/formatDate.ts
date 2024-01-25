export const FormatDate = (date: Date) => {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear(),
		hours = '' + d.getHours(),
		minutes = '' + d.getMinutes();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
	if (hours.length < 2) hours = '0' + hours;
	if (minutes.length < 2) minutes = '0' + minutes;

	return `${[day, month, year].join('/')} ${hours}:${minutes}`;
};
