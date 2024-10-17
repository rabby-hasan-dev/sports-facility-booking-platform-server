import axios from 'axios';

import config from '../../config';

export const initialPayment = async (paymentData: any) => {
  const data = {
    store_id: process.env.STORE_ID,
    signature_key: process.env.SIGNATURE_KEY,
    tran_id: paymentData.transactionId,
    success_url: `https://sports-facility-bookings-platform-server.vercel.app/api/payments/confirmation?transactionId=${paymentData.transactionId}&status=success`,
    fail_url: `https://sports-facility-bookings-platform-server.vercel.app/api/payments/confirmation?status=failed`,
    cancel_url: 'https://sports-facility-bookings-plartform.netlify.app',
    amount: paymentData.totalPrice,
    currency: 'BDT',
    desc: 'Merchant Registration Payment',
    cus_name: paymentData.custormerName,
    cus_email: paymentData.customerEmail,
    cus_add1: paymentData.customerAddress,
    cus_add2: 'N/A',
    cus_city: 'N/A',
    cus_state: 'N/A',
    cus_postcode: 'N/A',
    cus_country: 'N/A',
    cus_phone: paymentData.customerPhone,
    type: 'json',
  };

  try {
    const response = await axios.post(config.payment_url as string, data);
    return response.data;
  } catch (err) {
    throw new Error('Payment initiation failed!');
  }
};

export const verifyPayment = async (tnxId: string) => {
  try {
    const response = await axios.get(config.payment_verify_url!, {
      params: {
        store_id: config.store_id,
        signature_key: config.signature_key,
        type: 'json',
        request_id: tnxId,
      },
    });

    return response.data;
  } catch (err) {
    throw new Error('Payment validation failed!');
  }
};
