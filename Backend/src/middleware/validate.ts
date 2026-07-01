import { z } from 'zod';

// Zod schema for ticket creation
export const CreateTicketSchema = z.object({
  customer_name: z
    .string()
    .min(1, 'Customer name is required')
    .max(100, 'Name too long (max 100 chars)')
    .trim(),

  customer_email: z
    .string()
    .email('Invalid email address')
    .max(254, 'Email too long'),

  issue: z.enum([
    'Sizing & Fit Issues',
    'Fabric & Quality Defects',
    'Wrong Item Received',
    'Color Mismatch',
    'Damaged in Shipping',
    'Late / Lost Delivery',
    'Price / Promotion Dispute',
    'Care & Maintenance Query',
  ], {
    error: 'Invalid issue category',
  }),

  issue_description: z
    .string()
    .min(10, 'Description too short (min 10 chars)')
    .max(2000, 'Description too long (max 2000 chars)')
    .trim(),

  order_id: z
    .string()
    .max(100, 'Order ID too long')
    .optional()
    .or(z.literal('')),
});

// Zod schema for ticket override (manual resolution)
export const UpdateTicketSchema = z.object({
  resolution: z.enum([
    'Refund',
    'Replacement',
    'Repair',
    'Discount',
    'Apology',
    'Return',
    'Exchange',
    'Compensation',
    'Service Enhancement',
  ], {
    error: 'Invalid resolution type',
  }),

  resolution_description: z
    .string()
    .min(5, 'Resolution description too short')
    .max(2000, 'Resolution description too long')
    .trim(),
});

export type CreateTicketInput = z.infer<typeof CreateTicketSchema>;
export type UpdateTicketInput = z.infer<typeof UpdateTicketSchema>;
