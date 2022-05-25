import moment from 'moment';

export function dateFormat(date) {
	return moment(date).format('DD/MM/YYYY');
}

export function paymentDate(date) {
	const paymentDate = moment(date).clone().add(1, 'month');
	return paymentDate;
}

export function timeFormat(date) {
	return moment(new Date(date), [moment.ISO_8601, 'HH:mm']).format('h:mm:ss a');
}
