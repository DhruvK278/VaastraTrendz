import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { name, phone, address, totalAmount, items } = req.body;

    if (!name || !phone || !address || !items || items.length === 0) {
      return res.status(400).json({ message: 'Missing required fields or empty cart' });
    }

    const newOrder = await prisma.order.create({
      data: {
        customerName: name,
        customerPhone: phone,
        customerAddress: address,
        totalAmount: totalAmount,
        status: 'Pending',
        items: {
          create: items.map((item: any) => ({
            productId: item.id.toString(),
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: true
      }
    });

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error while processing the order' });
  }
};
