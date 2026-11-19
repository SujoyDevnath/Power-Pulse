const rateLimit = require('express-rate-limit');

// Rate limiter for authentication attempts (Brute-force protection)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // 20 requests per window
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many login attempts from this IP, please try again after 15 minutes.' }
});

// Rate limiter for outage reporting (Spam defense)
const reportLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Max 10 reports per minute per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many reports submitted. Please wait a minute before reporting again.' }
});

module.exports = {
    authLimiter,
    reportLimiter
};
