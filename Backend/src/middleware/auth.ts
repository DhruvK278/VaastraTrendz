import { Request, Response, NextFunction } from 'express';
import { timingSafeEqual as cryptoTimingSafeEqual } from 'crypto';

/**
 * Middleware: Require a valid API key for admin / sensitive endpoints.
 * The key is compared in constant-time to prevent timing attacks.
 */
export const requireApiKey = (req: Request, res: Response, next: NextFunction) => {
  const provided = req.headers['x-api-key'] as string | undefined;
  const expected = process.env.ADMIN_API_KEY;

  if (!expected) {
    console.error('ADMIN_API_KEY is not set – blocking all admin requests');
    return res.status(500).json({ error: 'Server misconfiguration: admin key not set' });
  }

  if (!provided || !timingSafeEqual(provided, expected)) {
    return res.status(401).json({ error: 'Unauthorized – invalid or missing API key' });
  }

  next();
};

/**
 * Constant-time string comparison to prevent timing attacks.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  return cryptoTimingSafeEqual(bufA, bufB);
}

