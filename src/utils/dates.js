import moment from 'moment';

export function dateFormat(date) {
	return moment(date).format('MM/DD/YYYY');
}

export function paymentDate(date) {
	date = moment(date, 'MM/DD/YYYY');
	const paymentDate = date.clone().add(1, 'month');
	return paymentDate.format('MM/DD/YYYY');
}
