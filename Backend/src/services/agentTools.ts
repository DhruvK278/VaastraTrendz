import { tool } from "@langchain/core/tools";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import * as crypto from "crypto";

const prisma = new PrismaClient();

// 1. LOOKUP ORDER — Read-only, searches by ID or customer name
export const lookupOrderTool = tool(
  async ({ orderId, customerName }) => {
    const order = await prisma.order.findFirst({
      where: orderId
        ? { id: orderId }
        : { customerName: { contains: customerName, mode: "insensitive" } },
      include: { items: true },
    });
    if (!order) return "No order found matching the criteria.";
    return JSON.stringify({
      id: order.id,
      customerName: order.customerName,
      status: order.status,
      totalAmount: order.totalAmount,
      itemCount: order.items.length,
      items: order.items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        price: i.price,
      })),
    });
  },
  {
    name: "lookup_order",
    description:
      "Look up a customer order by order ID or customer name. Use this before processing refunds or replacements to verify the order exists and get its details.",
    schema: z.object({
      orderId: z
        .string()
        .optional()
        .describe("The order ID to look up"),
      customerName: z
        .string()
        .optional()
        .describe("Customer name to search by"),
    }),
  }
);

// 2. PROCESS REFUND — Updates order status to "Refunded"
export const processRefundTool = tool(
  async ({ orderId, amount, reason }) => {
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "Refunded",
          refundAmount: amount,
          refundReason: reason,
        },
      });
      return JSON.stringify({
        success: true,
        details: `Refund of ₹${amount} processed for order ${orderId}. Reason: ${reason}`,
      });
    } catch (error: any) {
      return JSON.stringify({
        success: false,
        error: `Failed to process refund: ${error.message}`,
      });
    }
  },
  {
    name: "process_refund",
    description:
      "Process a refund for a customer order. Only use for eligible cases per company policy. Always lookup the order first.",
    schema: z.object({
      orderId: z.string().describe("The order ID to refund"),
      amount: z.number().describe("Refund amount in INR"),
      reason: z.string().describe("Reason for the refund"),
    }),
  }
);

// 3. INITIATE REPLACEMENT — Updates order status to "Replacement Initiated"
export const initiateReplacementTool = tool(
  async ({ orderId, reason }) => {
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: "Replacement Initiated" },
      });
      return JSON.stringify({
        success: true,
        details: `Replacement initiated for order ${orderId}. Reason: ${reason}`,
      });
    } catch (error: any) {
      return JSON.stringify({
        success: false,
        error: `Failed to initiate replacement: ${error.message}`,
      });
    }
  },
  {
    name: "initiate_replacement",
    description:
      "Initiate a replacement for a customer order. Use when the item is defective, wrong, or damaged. Always lookup the order first.",
    schema: z.object({
      orderId: z.string().describe("The order ID to replace"),
      reason: z.string().describe("Reason for the replacement"),
    }),
  }
);

// 4. ISSUE DISCOUNT — Generates a discount code and saves it
export const issueDiscountTool = tool(
  async ({ orderId, percent, reason }) => {
    const code = `VT-${percent}OFF-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: {
          discountCode: code,
          discountPercent: percent,
        },
      });
      return JSON.stringify({
        success: true,
        details: `Discount code ${code} (${percent}% off) issued for order ${orderId}. Reason: ${reason}`,
        discountCode: code,
      });
    } catch (error: any) {
      return JSON.stringify({
        success: false,
        error: `Failed to issue discount: ${error.message}`,
      });
    }
  },
  {
    name: "issue_discount",
    description:
      "Issue a discount code to the customer as compensation or apology. The discount is a percentage off their next order.",
    schema: z.object({
      orderId: z.string().describe("The order ID this discount is related to"),
      percent: z
        .number()
        .min(1)
        .max(50)
        .describe("Discount percentage (1-50)"),
      reason: z.string().describe("Reason for issuing the discount"),
    }),
  }
);

// 5. SEND APOLOGY EMAIL — Logs the apology action (simulated)
export const sendApologyTool = tool(
  async ({ customerEmail, customerName, summary }) => {
    console.log(
      `[SIMULATED EMAIL] To: ${customerEmail}, Subject: Apology from VaastraTrendz, Body: Dear ${customerName}, ${summary}`
    );
    return JSON.stringify({
      success: true,
      details: `Apology email sent to ${customerEmail} for customer ${customerName}. Summary: ${summary}`,
    });
  },
  {
    name: "send_apology_email",
    description:
      "Send an apology email to the customer. Use this when the situation warrants a formal apology from VaastraTrendz.",
    schema: z.object({
      customerEmail: z.string().describe("Customer's email address"),
      customerName: z.string().describe("Customer's name"),
      summary: z
        .string()
        .describe(
          "Brief summary of the apology and what steps were taken to resolve the issue"
        ),
    }),
  }
);

// Export all tools as an array for the agent
export const allTools = [
  lookupOrderTool,
  processRefundTool,
  initiateReplacementTool,
  issueDiscountTool,
  sendApologyTool,
];
