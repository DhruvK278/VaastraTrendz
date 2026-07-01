import { Router } from 'express';
import {
  getAllTickets,
  createTicket,
  getTicket,
  updateTicket,
} from '../controllers/supportController';
import { aiRateLimiter, generalRateLimiter } from '../middleware/rateLimiter';
import { requireApiKey } from '../middleware/auth';

const router = Router();

router.get('/list', generalRateLimiter, getAllTickets);
router.post('/create', aiRateLimiter, createTicket);
router.get('/run/:id', generalRateLimiter, getTicket);
router.put('/update/:id', requireApiKey, updateTicket);

export default router;
