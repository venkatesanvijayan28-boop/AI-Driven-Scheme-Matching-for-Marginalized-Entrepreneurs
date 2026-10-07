import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'schemematch_sih26092_jwt_super_secret_key_2026!';

/**
 * Authentication Middleware: Verifies JWT token from Authorization header or HTTP-only cookie
 */
export function requireAuth(req, res, next) {
  try {
    let token = null;

    // 1. Check Authorization Header: Bearer <token>
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    // 2. Check HTTP-only cookie
    if (!token && req.cookies && req.cookies.schemematch_token) {
      token = req.cookies.schemematch_token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'Authentication required. Please log in with a valid session.'
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: 'Invalid or expired session token. Please log in again.',
      details: err.message
    });
  }
}

/**
 * Admin Authorization Middleware: Ensures authenticated user has admin role
 */
export function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required before accessing admin endpoints.'
    });
  }

  const role = req.user.role || '';
  const email = (req.user.email || '').toLowerCase();

  const isAdmin = role === 'admin' || email.includes('admin') || email === 'admin@123';
  if (!isAdmin) {
    return res.status(403).json({
      success: false,
      error: 'Access denied: Administrator privileges required.'
    });
  }

  next();
}

/**
 * Optional Authentication: Attaches req.user if token is present, but doesn't block
 */
export function optionalAuth(req, res, next) {
  try {
    let token = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.cookies && req.cookies.schemematch_token) {
      token = req.cookies.schemematch_token;
    }

    if (token) {
      req.user = jwt.verify(token, JWT_SECRET);
    }
  } catch (e) {
    // Non-blocking
  }
  next();
}
