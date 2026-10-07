import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function verify() {
  const client = await pool.connect();
  console.log('--- SUPABASE DATABASE AUDIT REPORT ---');
  
  const tables = ['schemes', 'profiles', 'users', 'service_centers', 'applications'];
  for (const t of tables) {
    const res = await client.query(`SELECT COUNT(*) FROM "${t}"`);
    console.log(`Table "${t}": ${res.rows[0].count} records`);
  }

  console.log('\n--- PROFILES IN SUPABASE ---');
  const profs = await client.query('SELECT id, name, state, preferred_language FROM profiles ORDER BY name ASC');
  for (const r of profs.rows) {
    console.log(`- ${r.id}: ${r.name} (${r.state}) | Lang: ${r.preferred_language}`);
  }

  console.log('\n--- USERS IN SUPABASE ---');
  const usrs = await client.query('SELECT id, email, profile_id FROM users ORDER BY id ASC');
  for (const u of usrs.rows) {
    console.log(`- ${u.id}: ${u.email} -> Profile: ${u.profile_id}`);
  }

  client.release();
  await pool.end();
}

verify().catch(console.error);
