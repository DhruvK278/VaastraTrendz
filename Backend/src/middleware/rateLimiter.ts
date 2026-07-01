import rateLimit from 'express-rate-limit';

// Rate limiter (max 5 req)
export const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000,  // 1 minute window
  max: 5,               // max 5 requests per IP per window
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false,  // Disable `X-RateLimit-*` headers
  message: { error: 'Too many AI requests – please try again in a minute' },
});


// General rate limiter
export const generalRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests – please slow down' },
});
