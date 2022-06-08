import moment from 'moment';

export function dateFormat(date) {
	return moment(date).format('DD/MM/YYYY');
}

export function paymentDate(paymentDateFromDB) {
	const dateFormated = moment(paymentDateFromDB).format('DD/MM/YYYY');
	const paymentDate = moment(dateFormated).clone().add(1, 'month');
	return moment(paymentDate).format('DD/MM/YYYY');
}

export function timeFormat(date) {
	return moment(new Date(date), [moment.ISO_8601, 'HH:mm']).format('h:mm:ss a');
}
