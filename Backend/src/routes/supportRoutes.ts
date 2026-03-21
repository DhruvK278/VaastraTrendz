import { Router } from 'express';
import {
  getAllTickets,
  createTicket,
  getTicket,
  updateTicket,
} from '../controllers/supportController';

const router = Router();

router.get('/list', getAllTickets);
router.post('/create', createTicket);
router.get('/run/:id', getTicket);
router.put('/update/:id', updateTicket);

export default router;
