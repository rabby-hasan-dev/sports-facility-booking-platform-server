import { join } from "path";
import { verifyPayment } from "./payment.utils";

import { Booking } from "../Booking/booking.model";
import ejs from 'ejs'

const confirmationService = async (transactionId: string, status: string) => {
    const verifyResponse = await verifyPayment(transactionId);

    let paymentData;

    if (verifyResponse && verifyResponse.pay_status === 'Successful') {
        const updatePaymentStatus = await Booking.findOneAndUpdate({ transactionId }, {
            paymentStatus: 'Paid'
        });

        paymentData = {
            transactionId: verifyResponse?.mer_txnid,
            invoiceNo: verifyResponse?.pg_txnid,
            amount: verifyResponse?.amount,
            currency: 'BDT',
            payment_type: verifyResponse?.payment_type,
            payTime: verifyResponse?.date,
            paymentStatus: verifyResponse?.pay_status
        };

    }

    if (paymentData && status === 'success') {
        const filePathSuccess = join(__dirname, '../../../../views/paymentSuccess.ejs');
        const template = await ejs.renderFile(filePathSuccess, paymentData)
        return template;

    } else {
        const filePathFaild = join(__dirname, '../../../../views/paymentFaild.ejs');
        const template = await ejs.renderFile(filePathFaild, {})
        return template;
    }





}

export const paymentServices = {
    confirmationService
}