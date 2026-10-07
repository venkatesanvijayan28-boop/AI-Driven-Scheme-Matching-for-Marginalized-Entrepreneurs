import { db } from '../config/db.js';

export async function getAllProfiles(req, res) {
  try {
    const profiles = await db.getAllProfiles();
    return res.status(200).json({ success: true, count: profiles.length, data: profiles });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

export async function getProfileById(req, res) {
  try {
    const { id } = req.params;
    const profile = await db.getProfileById(id);
    if (!profile) {
      return res.status(404).json({ success: false, error: 'Profile not found' });
    }
    return res.status(200).json({ success: true, data: profile });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedProfile = await db.updateProfile(id, updatedData);
    return res.status(200).json({
      success: true,
      message: 'Profile updated and saved to database successfully',
      data: updatedProfile
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
