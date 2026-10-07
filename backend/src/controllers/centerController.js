import { db } from '../config/db.js';

export async function getNearbyBanks(req, res) {
  try {
    const banks = await db.getBanks();
    return res.status(200).json({ success: true, count: banks.length, data: banks });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

export async function getNearbyCSCs(req, res) {
  try {
    const cscs = await db.getCSCCenters();
    return res.status(200).json({ success: true, count: cscs.length, data: cscs });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}

export async function getAllCenters(req, res) {
  try {
    const banks = await db.getBanks();
    const cscs = await db.getCSCCenters();
    return res.status(200).json({
      success: true,
      data: {
        banks,
        cscCenters: cscs
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
