import moment from 'moment';

export function dateFormat(date) {
	return moment(date).format('DD/MM/YYYY');
}

export function paymentDate(date) {
	date = moment(date, 'DD/MM/YYYY');
	const paymentDate = date.clone().add(1, 'month');
	return paymentDate.format('DD/MM/YYYY');
}
