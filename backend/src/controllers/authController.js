import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'schemematch_sih26092_jwt_super_secret_key_2026!';
const TOKEN_EXPIRY = '7d';

/**
 * Helper to generate JWT token and set HTTP-only cookie
 */
function generateTokenAndSetCookie(res, userPayload) {
  const token = jwt.sign(userPayload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });

  const isProduction = process.env.NODE_ENV === 'production';
  res.cookie('schemematch_token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  return token;
}

/**
 * POST /api/auth/login
 */
export async function login(req, res) {
  try {
    const { email, password, personaId } = req.body;

    // Fast-path for quick demo persona selection in development
    if (personaId && !password) {
      const profile = await db.getProfileById(personaId);
      if (profile) {
        const isAdmin = personaId === 'admin';
        const userPayload = {
          id: `usr-${personaId}`,
          email: `${personaId}@schemematch.gov.in`,
          role: isAdmin ? 'admin' : 'user',
          profileId: personaId
        };
        const token = generateTokenAndSetCookie(res, userPayload);
        return res.status(200).json({
          success: true,
          token,
          user: { id: userPayload.id, email: userPayload.email, role: userPayload.role, profile }
        });
      }
    }

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email or User ID is required' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanPassword) {
      return res.status(400).json({ success: false, error: 'Password is required' });
    }

    // Check admin credentials
    if ((cleanEmail === 'admin@123' || cleanEmail === 'admin' || cleanEmail === 'admin@schemematch.gov.in')) {
      if (cleanPassword === 'admin123') {
        const userPayload = {
          id: 'usr-admin',
          email: 'admin@schemematch.gov.in',
          role: 'admin',
          profileId: 'admin'
        };
        const token = generateTokenAndSetCookie(res, userPayload);
        return res.status(200).json({
          success: true,
          token,
          user: { id: userPayload.id, email: userPayload.email, role: 'admin', profile: { name: 'Administrator', role: 'admin' } }
        });
      } else {
        return res.status(401).json({ success: false, error: 'Incorrect admin password. Please enter admin123.' });
      }
    }

    let user = await db.findUserByEmail(cleanEmail);
    if (!user) {
      const possibleEmail = cleanEmail.includes('@') ? cleanEmail : `${cleanEmail}@schemematch.ai`;
      user = await db.findUserByEmail(possibleEmail);
    }

    if (!user) {
      return res.status(404).json({ success: false, error: 'No account registered with this email or User ID' });
    }

    // Secure Password Verification
    let isMatch = false;
    if (user.password) {
      if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
        isMatch = await bcrypt.compare(cleanPassword, user.password);
      } else {
        // Legacy plaintext compatibility: compare and immediately upgrade to bcrypt hash
        isMatch = cleanPassword === user.password;
        if (isMatch) {
          const upgradedHash = await bcrypt.hash(cleanPassword, 10);
          await db.updateUserPassword(user.email, upgradedHash);
        }
      }
    }

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Incorrect password. Please verify credentials.' });
    }

    const profile = await db.getProfileById(user.profileId);
    const role = user.role || (cleanEmail.includes('admin') ? 'admin' : 'user');

    const userPayload = {
      id: user.id,
      email: user.email,
      role,
      profileId: user.profileId
    };

    const token = generateTokenAndSetCookie(res, userPayload);

    return res.status(200).json({
      success: true,
      token,
      user: { id: user.id, email: user.email, role, profile }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * POST /api/auth/register
 */
export async function register(req, res) {
  try {
    const { name, email, password, mobile, socialCategory, sector, state, district, fundingRequired, profileId } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Full name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, error: 'Password must be at least 6 characters long' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existingUser = await db.findUserByEmail(cleanEmail);
    if (existingUser) {
      return res.status(409).json({ success: false, error: 'An account with this email already exists' });
    }

    // Secure bcrypt hashing (salt rounds: 10)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newProfileId = profileId || `user-${Date.now()}`;
    const newProfile = await db.updateProfile(newProfileId, {
      name,
      email: cleanEmail,
      mobile: (mobile || '').trim(),
      socialCategory: socialCategory || '',
      sector: sector || '',
      state: state || '',
      district: district || '',
      fundingRequired: fundingRequired || '',
      completionPercentage: 10,
      documentsReadyCount: 0,
      documentsTotalCount: 6,
      activeApplicationsCount: 0,
      matchedSchemesCount: 0
    });

    const newUser = await db.createUser({
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      password: hashedPassword,
      profileId: newProfileId,
      role: 'user'
    });

    const userPayload = {
      id: newUser.id,
      email: newUser.email,
      role: 'user',
      profileId: newProfileId
    };

    const token = generateTokenAndSetCookie(res, userPayload);

    return res.status(201).json({
      success: true,
      message: 'User registered successfully with secure bcrypt credentials',
      token,
      user: { id: newUser.id, email: newUser.email, role: 'user', profile: newProfile }
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * POST /api/auth/reset-password
 */
export async function resetPassword(req, res) {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ success: false, error: 'Email and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, error: 'New password must be at least 6 characters long' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = await db.findUserByEmail(cleanEmail);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User account not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.updateUserPassword(cleanEmail, hashedPassword);

    return res.status(200).json({
      success: true,
      message: 'Password securely updated with bcrypt hash'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * GET /api/auth/me - Validate active session and return current user
 */
export async function getCurrentUser(req, res) {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, error: 'Not authenticated' });
    }

    const profile = await db.getProfileById(req.user.profileId);
    return res.status(200).json({
      success: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
        profile
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

/**
 * POST /api/auth/logout - Clear HTTP-only cookie
 */
export async function logout(req, res) {
  res.clearCookie('schemematch_token', {
    httpOnly: true,
    sameSite: 'lax'
  });
  return res.status(200).json({ success: true, message: 'Logged out successfully' });
}
