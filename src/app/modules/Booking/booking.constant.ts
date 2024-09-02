export const IsBooked_Status = {
  confirmed: 'confirmed',
  unconfirmed: 'unconfirmed',
  canceled: 'cancelled',
} as const;

export const Payment_Status = {
  pending: 'pending',
  paid: 'paid',
  failed: 'failed',
} as const;
