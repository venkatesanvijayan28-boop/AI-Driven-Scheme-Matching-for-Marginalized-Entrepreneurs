import dotenv from 'dotenv';
import { initDatabase, pool } from '../config/db.js';

dotenv.config();

async function runSeed() {
  console.log('🚀 Running database initialization and seeding for Supabase...');
  try {
    const success = await initDatabase();
    if (success) {
      console.log('✨ All tables and data seeded into Supabase PostgreSQL successfully!');
    } else {
      console.log('ℹ️ Seed completed with local in-memory fallback.');
    }
  } catch (error) {
    console.error('❌ Seed script error:', error);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

runSeed();
