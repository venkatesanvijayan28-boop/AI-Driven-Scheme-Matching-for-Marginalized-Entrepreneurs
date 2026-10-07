import pg from 'pg';
import dotenv from 'dotenv';
import { INITIAL_PROFILES } from '../data/profiles.js';
import { SCHEMES_DATABASE } from '../data/schemes.js';
import { NEARBY_BANKS, NEARBY_CSC_CENTERS } from '../data/centers.js';
import { SCHEME_FAQS } from '../data/faqs.js';

dotenv.config();

const { Pool } = pg;

// Check if valid connection string is provided and sanitize password special chars
let rawConnectionString = process.env.DATABASE_URL || '';
if (rawConnectionString) {
  const match = rawConnectionString.match(/^(postgresql:\/\/[^:]+:)(.*)@([^@]+)$/);
  if (match) {
    const prefix = match[1];
    let password = match[2];
    const hostAndDb = match[3];
    if (password.includes('@')) {
      password = password.replace(/@/g, '%40');
      rawConnectionString = `${prefix}${password}@${hostAndDb}`;
    }
  }
}
const connectionString = rawConnectionString;
const isSupabaseConfigured = connectionString && !connectionString.includes('[YOUR-PASSWORD]');

// PostgreSQL Pool instance
export const pool = new Pool({
  connectionString: connectionString || 'postgresql://postgres:postgres@localhost:5432/postgres',
  ssl: connectionString?.includes('supabase.co') ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 8000,
  idleTimeoutMillis: 30000,
});

let isConnected = false;

// Initialize Database Tables and Seed Data
export async function initDatabase() {
  if (!isSupabaseConfigured) {
    console.log('⚠️ [Database]: Database password not configured in .env yet.');
    console.log('💡 [Database]: Running in hybrid/in-memory mode. Update DATABASE_URL in .env to connect to Supabase PostgreSQL.');
    return false;
  }

  try {
    const client = await pool.connect();
    console.log('✅ [Database]: Successfully connected to Supabase PostgreSQL!');
    isConnected = true;

    // 1. Create Users Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(100) PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        profile_id VARCHAR(100),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Create Profiles Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS profiles (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        mobile VARCHAR(50),
        tagline VARCHAR(255),
        avatar VARCHAR(50),
        age INTEGER,
        gender VARCHAR(50),
        social_category VARCHAR(100),
        social_category_code VARCHAR(50),
        state VARCHAR(100),
        district VARCHAR(100),
        annual_income VARCHAR(50),
        annual_income_num BIGINT,
        education VARCHAR(100),
        education_level VARCHAR(50),
        business_name VARCHAR(255),
        business_type VARCHAR(100),
        sector VARCHAR(150),
        stage VARCHAR(100),
        location_type VARCHAR(50),
        investment_required VARCHAR(50),
        funding_required VARCHAR(50),
        funding_required_num BIGINT,
        expected_turnover VARCHAR(50),
        employees_count VARCHAR(50),
        preferred_language VARCHAR(50),
        funding_type VARCHAR(150),
        support_needed TEXT,
        completion_percentage INTEGER DEFAULT 75,
        documents_ready_count INTEGER DEFAULT 4,
        documents_total_count INTEGER DEFAULT 6,
        active_applications_count INTEGER DEFAULT 1,
        matched_schemes_count INTEGER DEFAULT 6,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      ALTER TABLE profiles ADD COLUMN IF NOT EXISTS email VARCHAR(255);
      ALTER TABLE profiles ADD COLUMN IF NOT EXISTS mobile VARCHAR(50);
    `);

    // 3. Create Schemes Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS schemes (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        short_name VARCHAR(100),
        department VARCHAR(255),
        nodal_agency VARCHAR(255),
        sector VARCHAR(255),
        sectors_list JSONB,
        stage_eligibility JSONB,
        max_funding VARCHAR(100),
        max_funding_num BIGINT,
        min_funding_num BIGINT,
        subsidy_rate TEXT,
        margin_money TEXT,
        status VARCHAR(50),
        description TEXT,
        potential_benefit TEXT,
        why_matched_reasons JSONB,
        factor_scores JSONB,
        eligibility_rules JSONB,
        required_documents JSONB,
        application_steps JSONB,
        where_to_apply TEXT,
        official_portal TEXT,
        is_sample_data BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Create Applications Table (7-Stage Roadmap)
    await client.query(`
      CREATE TABLE IF NOT EXISTS applications (
        id VARCHAR(100) PRIMARY KEY,
        user_id VARCHAR(100) NOT NULL,
        scheme_id VARCHAR(100) NOT NULL,
        scheme_name VARCHAR(255) NOT NULL,
        current_stage INTEGER DEFAULT 1,
        total_stages INTEGER DEFAULT 7,
        status VARCHAR(50) DEFAULT 'In Progress',
        applied_date DATE DEFAULT CURRENT_DATE,
        assigned_bank_id VARCHAR(100),
        assigned_csc_id VARCHAR(100),
        stages JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 5. Create Service Centers Table (Banks & CSCs)
    await client.query(`
      CREATE TABLE IF NOT EXISTS service_centers (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        type VARCHAR(100) NOT NULL,
        category VARCHAR(50) NOT NULL, -- 'BANK' or 'CSC'
        address TEXT,
        district VARCHAR(100),
        state VARCHAR(100),
        latitude NUMERIC(10, 6),
        longitude NUMERIC(10, 6),
        distance VARCHAR(50),
        contact_person VARCHAR(150),
        phone VARCHAR(50),
        email VARCHAR(100),
        supported_schemes JSONB,
        services_offered JSONB,
        timing VARCHAR(100),
        rating NUMERIC(3, 1),
        status VARCHAR(100)
      );
    `);

    // Seed Data into Postgres if tables are empty
    await seedDatabase(client);

    client.release();
    return true;
  } catch (error) {
    console.error('❌ [Database Connection Error]:', error.message);
    console.log('⚠️ [Database]: Falling back to local memory store.');
    isConnected = false;
    return false;
  }
}

// Seed initial data into Supabase Postgres
export async function seedDatabase(client = null) {
  const runner = client || (await pool.connect());
  try {
    // Seed and Upsert Schemes
    console.log('🌱 [Database]: Syncing all Government Schemes & Official Portals into Supabase...');
    for (const s of SCHEMES_DATABASE) {
      await runner.query(`
        INSERT INTO schemes (
          id, name, short_name, department, nodal_agency, sector, sectors_list,
          stage_eligibility, max_funding, max_funding_num, min_funding_num,
          subsidy_rate, margin_money, status, description, potential_benefit,
          why_matched_reasons, factor_scores, eligibility_rules, required_documents,
          application_steps, where_to_apply, official_portal, is_sample_data
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          short_name = EXCLUDED.short_name,
          department = EXCLUDED.department,
          nodal_agency = EXCLUDED.nodal_agency,
          sector = EXCLUDED.sector,
          sectors_list = EXCLUDED.sectors_list,
          stage_eligibility = EXCLUDED.stage_eligibility,
          max_funding = EXCLUDED.max_funding,
          max_funding_num = EXCLUDED.max_funding_num,
          min_funding_num = EXCLUDED.min_funding_num,
          subsidy_rate = EXCLUDED.subsidy_rate,
          margin_money = EXCLUDED.margin_money,
          description = EXCLUDED.description,
          potential_benefit = EXCLUDED.potential_benefit,
          why_matched_reasons = EXCLUDED.why_matched_reasons,
          factor_scores = EXCLUDED.factor_scores,
          eligibility_rules = EXCLUDED.eligibility_rules,
          required_documents = EXCLUDED.required_documents,
          application_steps = EXCLUDED.application_steps,
          where_to_apply = EXCLUDED.where_to_apply,
          official_portal = EXCLUDED.official_portal,
          is_sample_data = EXCLUDED.is_sample_data;
      `, [
        s.id, s.name, s.shortName, s.department, s.nodalAgency, s.sector,
        JSON.stringify(s.sectorsList), JSON.stringify(s.stageEligibility),
        s.maxFunding, s.maxFundingNum, s.minFundingNum, s.subsidyRate,
        s.marginMoney, s.status, s.description, s.potentialBenefit,
        JSON.stringify(s.whyMatchedReasons), JSON.stringify(s.factorScores),
        JSON.stringify(s.eligibilityRules), JSON.stringify(s.requiredDocuments),
        JSON.stringify(s.applicationSteps), s.whereToApply, s.officialPortal, s.isSampleData
      ]);
    }

    // Seed and Upsert Profiles
    console.log('🌱 [Database]: Syncing all Demo Entrepreneur Profiles into Supabase...');
    for (const p of INITIAL_PROFILES) {
      await runner.query(`
        INSERT INTO profiles (
          id, name, tagline, avatar, age, gender, social_category, social_category_code,
          state, district, annual_income, annual_income_num, education, education_level,
          business_name, business_type, sector, stage, location_type, investment_required,
          funding_required, funding_required_num, expected_turnover, employees_count,
          preferred_language, funding_type, support_needed, completion_percentage,
          documents_ready_count, documents_total_count, active_applications_count, matched_schemes_count
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          tagline = EXCLUDED.tagline,
          avatar = EXCLUDED.avatar,
          age = EXCLUDED.age,
          gender = EXCLUDED.gender,
          social_category = EXCLUDED.social_category,
          social_category_code = EXCLUDED.social_category_code,
          state = EXCLUDED.state,
          district = EXCLUDED.district,
          annual_income = EXCLUDED.annual_income,
          annual_income_num = EXCLUDED.annual_income_num,
          education = EXCLUDED.education,
          education_level = EXCLUDED.education_level,
          business_name = EXCLUDED.business_name,
          business_type = EXCLUDED.business_type,
          sector = EXCLUDED.sector,
          stage = EXCLUDED.stage,
          location_type = EXCLUDED.location_type,
          investment_required = EXCLUDED.investment_required,
          funding_required = EXCLUDED.funding_required,
          funding_required_num = EXCLUDED.funding_required_num,
          expected_turnover = EXCLUDED.expected_turnover,
          employees_count = EXCLUDED.employees_count,
          preferred_language = EXCLUDED.preferred_language,
          funding_type = EXCLUDED.funding_type,
          support_needed = EXCLUDED.support_needed,
          completion_percentage = EXCLUDED.completion_percentage,
          documents_ready_count = EXCLUDED.documents_ready_count,
          documents_total_count = EXCLUDED.documents_total_count,
          active_applications_count = EXCLUDED.active_applications_count,
          matched_schemes_count = EXCLUDED.matched_schemes_count;
      `, [
        p.id, p.name, p.tagline, p.avatar, p.age, p.gender, p.socialCategory, p.socialCategoryCode,
        p.state, p.district, p.annualIncome, p.annualIncomeNum, p.education, p.educationLevel,
        p.businessName, p.businessType, p.sector, p.stage, p.locationType, p.investmentRequired,
        p.fundingRequired, p.fundingRequiredNum, p.expectedTurnover, p.employeesCount,
        p.preferredLanguage, p.fundingType, p.supportNeeded, p.completionPercentage,
        p.documentsReadyCount, p.documentsTotalCount, p.activeApplicationsCount, p.matchedSchemesCount
      ]);
    }

    // Seed and Upsert Users
    console.log('🌱 [Database]: Syncing Users into Supabase...');
    await runner.query(`
      INSERT INTO users (id, email, password_hash, profile_id)
      VALUES 
        ('usr-1', 'ravi@schemematch.ai', 'password123', 'ravi'),
        ('usr-2', 'priya@schemematch.ai', 'password123', 'priya'),
        ('usr-3', 'arun@schemematch.ai', 'password123', 'arun'),
        ('usr-4', 'meena@schemematch.ai', 'password123', 'meena'),
        ('usr-5', 'suresh@schemematch.ai', 'password123', 'suresh'),
        ('usr-admin1', 'admin@123', 'admin123', 'admin'),
        ('usr-admin2', 'admin@schemematch.gov.in', 'admin123', 'admin')
      ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        password_hash = EXCLUDED.password_hash,
        profile_id = EXCLUDED.profile_id;
    `);

    // Seed and Upsert Banks and CSCs
    console.log('🌱 [Database]: Syncing MSME Banks & CSC Centers into Supabase...');
    for (const b of NEARBY_BANKS) {
      await runner.query(`
        INSERT INTO service_centers (id, name, type, category, address, district, state, latitude, longitude, distance, contact_person, phone, email, supported_schemes, rating, status)
        VALUES ($1, $2, $3, 'BANK', $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          address = EXCLUDED.address,
          phone = EXCLUDED.phone,
          rating = EXCLUDED.rating;
      `, [
        b.id, b.name, b.type, b.address, b.district, b.state, b.latitude, b.longitude,
        b.distance, b.contactPerson, b.phone, b.email, JSON.stringify(b.supportedSchemes), b.rating, b.status
      ]);
    }

    for (const c of NEARBY_CSC_CENTERS) {
      await runner.query(`
        INSERT INTO service_centers (id, name, type, category, address, district, state, latitude, longitude, distance, contact_person, phone, services_offered, timing)
        VALUES ($1, $2, 'Common Service Center', 'CSC', $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          address = EXCLUDED.address,
          phone = EXCLUDED.phone;
      `, [
        c.id, c.name, c.address, c.district, c.state, c.latitude, c.longitude,
        c.distance, c.vleName, c.phone, JSON.stringify(c.servicesOffered), c.timing
      ]);
    }

    // Seed Applications Roadmap
    console.log('🌱 [Database]: Syncing Applications Roadmap into Supabase...');
    await runner.query(`
      INSERT INTO applications (
        id, user_id, scheme_id, scheme_name, current_stage, total_stages, status, applied_date, assigned_bank_id, assigned_csc_id, stages
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (id) DO UPDATE SET
        current_stage = EXCLUDED.current_stage,
        status = EXCLUDED.status,
        stages = EXCLUDED.stages;
    `, [
      'app-1', 'ravi', 'pmegp', 'Prime Minister’s Employment Generation Programme (PMEGP)',
      3, 7, 'In Progress', '2026-08-15', 'bank-1', 'csc-1',
      JSON.stringify([
        { step: 1, title: 'Profile & Need Discovery', status: 'completed', completedAt: '2026-08-15' },
        { step: 2, title: 'AI Scheme Selection & Match Verification', status: 'completed', completedAt: '2026-08-16' },
        { step: 3, title: 'Document Readiness (4/6 Uploaded)', status: 'in_progress', completedAt: null },
        { step: 4, title: 'DPR & Financial Forecast Generation', status: 'pending', completedAt: null },
        { step: 5, title: 'Online Portal & Nodal Bank Submission', status: 'pending', completedAt: null },
        { step: 6, title: '10-Day EDP Training Completion', status: 'pending', completedAt: null },
        { step: 7, title: 'Bank Loan Sanction & Subsidy Disbursal', status: 'pending', completedAt: null }
      ])
    ]);
  } catch (err) {
    console.error('Seed error:', err.message);
  } finally {
    if (!client) runner.release();
  }
}

// In-Memory Fallback Storage
class HybridDatabaseStore {
  constructor() {
    this.localUsers = [
      { id: 'usr-1', email: 'ravi@schemematch.ai', password: 'password123', profileId: 'ravi' },
      { id: 'usr-2', email: 'priya@schemematch.ai', password: 'password123', profileId: 'priya' },
      { id: 'usr-3', email: 'arun@schemematch.ai', password: 'password123', profileId: 'arun' },
      { id: 'usr-4', email: 'meena@schemematch.ai', password: 'password123', profileId: 'meena' },
      { id: 'usr-5', email: 'suresh@schemematch.ai', password: 'password123', profileId: 'suresh' },
      { id: 'usr-admin1', email: 'admin@123', password: 'admin123', profileId: 'admin' },
      { id: 'usr-admin2', email: 'admin@schemematch.gov.in', password: 'admin123', profileId: 'admin' }
    ];
    this.localProfiles = [...INITIAL_PROFILES];
    this.localSchemes = [...SCHEMES_DATABASE];
    this.localBanks = [...NEARBY_BANKS];
    this.localCSCs = [...NEARBY_CSC_CENTERS];
    this.localApplications = [
      {
        id: 'app-1',
        userId: 'ravi',
        schemeId: 'pmegp',
        schemeName: 'Prime Minister’s Employment Generation Programme (PMEGP)',
        currentStage: 3,
        totalStages: 7,
        status: 'In Progress',
        appliedDate: '2026-08-15',
        assignedBankId: 'bank-1',
        assignedCSCId: 'csc-1',
        stages: [
          { step: 1, title: 'Profile & Need Discovery', status: 'completed', completedAt: '2026-08-15' },
          { step: 2, title: 'AI Scheme Selection & Match Verification', status: 'completed', completedAt: '2026-08-16' },
          { step: 3, title: 'Document Readiness (4/6 Uploaded)', status: 'in_progress', completedAt: null },
          { step: 4, title: 'DPR & Financial Forecast Generation', status: 'pending', completedAt: null },
          { step: 5, title: 'Online Portal & Nodal Bank Submission', status: 'pending', completedAt: null },
          { step: 6, title: '10-Day EDP Training Completion', status: 'pending', completedAt: null },
          { step: 7, title: 'Bank Loan Sanction & Subsidy Disbursal', status: 'pending', completedAt: null }
        ]
      }
    ];
  }

  // --- Profile Operations ---
  async getAllProfiles() {
    if (isConnected) {
      try {
        const { rows } = await pool.query('SELECT * FROM profiles ORDER BY name ASC');
        if (rows.length > 0) return rows.map(this.mapProfileFromDb);
      } catch (e) {
        console.warn('DB read fallback to local profiles:', e.message);
      }
    }
    return this.localProfiles;
  }

  async getProfileById(id) {
    if (isConnected) {
      try {
        const { rows } = await pool.query('SELECT * FROM profiles WHERE id = $1', [id]);
        if (rows.length > 0) return this.mapProfileFromDb(rows[0]);
      } catch (e) {
        console.warn('DB read fallback for profile:', e.message);
      }
    }
    return this.localProfiles.find(p => p.id === id) || null;
  }

  async updateProfile(id, data) {
    if (isConnected) {
      try {
        const existing = await this.getProfileById(id);
        const merged = { ...(existing || {}), ...data };
        
        await pool.query(`
          INSERT INTO profiles (
            id, name, email, mobile, age, gender, social_category, state, district,
            annual_income, sector, business_type, business_name, stage,
            location_type, funding_required, completion_percentage, updated_at
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, CURRENT_TIMESTAMP)
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            email = COALESCE(NULLIF(EXCLUDED.email, ''), profiles.email),
            mobile = COALESCE(NULLIF(EXCLUDED.mobile, ''), profiles.mobile),
            age = EXCLUDED.age,
            gender = EXCLUDED.gender,
            social_category = EXCLUDED.social_category,
            state = EXCLUDED.state,
            district = EXCLUDED.district,
            annual_income = EXCLUDED.annual_income,
            sector = EXCLUDED.sector,
            business_type = EXCLUDED.business_type,
            business_name = EXCLUDED.business_name,
            stage = EXCLUDED.stage,
            location_type = EXCLUDED.location_type,
            funding_required = EXCLUDED.funding_required,
            completion_percentage = EXCLUDED.completion_percentage,
            updated_at = CURRENT_TIMESTAMP;
        `, [
          id,
          merged.name || 'Entrepreneur',
          merged.email || '',
          merged.mobile || '',
          merged.age ? parseInt(merged.age) : null,
          merged.gender || '',
          merged.socialCategory || '',
          merged.state || '',
          merged.district || '',
          merged.annualIncome || '',
          merged.sector || '',
          merged.businessType || '',
          merged.businessName || '',
          merged.stage || '',
          merged.locationType || '',
          merged.fundingRequired || '',
          merged.completionPercentage || 10
        ]);
        return merged;
      } catch (e) {
        console.warn('DB update fallback to local:', e.message);
      }
    }

    const idx = this.localProfiles.findIndex(p => p.id === id);
    if (idx === -1) {
      const newP = { id, ...data };
      this.localProfiles.push(newP);
      return newP;
    }
    this.localProfiles[idx] = { ...this.localProfiles[idx], ...data };
    return this.localProfiles[idx];
  }

  // --- Scheme Operations ---
  async getAllSchemes() {
    if (isConnected) {
      try {
        const { rows } = await pool.query('SELECT * FROM schemes ORDER BY max_funding_num DESC');
        if (rows.length > 0) return rows.map(this.mapSchemeFromDb);
      } catch (e) {
        console.warn('DB read fallback to local schemes:', e.message);
      }
    }
    return this.localSchemes;
  }

  async getSchemeById(id) {
    if (isConnected) {
      try {
        const { rows } = await pool.query('SELECT * FROM schemes WHERE id = $1 OR LOWER(short_name) = LOWER($1)', [id]);
        if (rows.length > 0) return this.mapSchemeFromDb(rows[0]);
      } catch (e) {
        console.warn('DB read fallback for scheme:', e.message);
      }
    }
    return this.localSchemes.find(s => s.id === id || s.shortName?.toLowerCase() === id?.toLowerCase()) || null;
  }

  async createScheme(schemeData) {
    const newScheme = {
      ...schemeData,
      id: schemeData.id || `scheme-${Date.now()}`,
      isSampleData: false,
      createdAt: new Date().toISOString()
    };

    if (isConnected) {
      try {
        await pool.query(`
          INSERT INTO schemes (
            id, name, short_name, department, nodal_agency, sector, sectors_list,
            stage_eligibility, max_funding, max_funding_num, min_funding_num,
            subsidy_rate, margin_money, status, description, potential_benefit,
            why_matched_reasons, factor_scores, eligibility_rules, required_documents,
            application_steps, where_to_apply, official_portal, is_sample_data
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            short_name = EXCLUDED.short_name,
            department = EXCLUDED.department,
            nodal_agency = EXCLUDED.nodal_agency,
            sector = EXCLUDED.sector,
            sectors_list = EXCLUDED.sectors_list,
            stage_eligibility = EXCLUDED.stage_eligibility,
            max_funding = EXCLUDED.max_funding,
            max_funding_num = EXCLUDED.max_funding_num,
            min_funding_num = EXCLUDED.min_funding_num,
            subsidy_rate = EXCLUDED.subsidy_rate,
            margin_money = EXCLUDED.margin_money,
            status = EXCLUDED.status,
            description = EXCLUDED.description,
            potential_benefit = EXCLUDED.potential_benefit,
            why_matched_reasons = EXCLUDED.why_matched_reasons,
            factor_scores = EXCLUDED.factor_scores,
            eligibility_rules = EXCLUDED.eligibility_rules,
            required_documents = EXCLUDED.required_documents,
            application_steps = EXCLUDED.application_steps,
            where_to_apply = EXCLUDED.where_to_apply,
            official_portal = EXCLUDED.official_portal,
            is_sample_data = EXCLUDED.is_sample_data;
        `, [
          newScheme.id, newScheme.name, newScheme.shortName || newScheme.name,
          newScheme.department || 'Ministry of MSME', newScheme.nodalAgency || 'Nodal Agency',
          newScheme.sector || 'All Sectors', JSON.stringify(newScheme.sectorsList || []),
          JSON.stringify(newScheme.stageEligibility || []), newScheme.maxFunding || '₹10 Lakh',
          Number(newScheme.maxFundingNum || 1000000), Number(newScheme.minFundingNum || 50000),
          newScheme.subsidyRate || '15%', newScheme.marginMoney || '10%', newScheme.status || 'Active',
          newScheme.description || '', newScheme.potentialBenefit || '',
          JSON.stringify(newScheme.whyMatchedReasons || []), JSON.stringify(newScheme.factorScores || {}),
          JSON.stringify(newScheme.eligibilityRules || []), JSON.stringify(newScheme.requiredDocuments || []),
          JSON.stringify(newScheme.applicationSteps || []), newScheme.whereToApply || '',
          newScheme.officialPortal || '', false
        ]);
      } catch (err) {
        console.warn('DB createScheme fallback notice:', err.message);
      }
    }

    const existingIdx = this.localSchemes.findIndex(s => s.id === newScheme.id);
    if (existingIdx !== -1) {
      this.localSchemes[existingIdx] = newScheme;
    } else {
      this.localSchemes.unshift(newScheme);
    }

    return newScheme;
  }

  async updateScheme(id, updateData) {
    const existing = await this.getSchemeById(id);
    if (!existing) return null;

    const updatedScheme = { ...existing, ...updateData, id };

    if (isConnected) {
      try {
        await pool.query(`
          UPDATE schemes SET
            name = $1, short_name = $2, department = $3, nodal_agency = $4,
            sector = $5, sectors_list = $6, max_funding = $7, max_funding_num = $8,
            subsidy_rate = $9, margin_money = $10, status = $11, description = $12,
            potential_benefit = $13, official_portal = $14
          WHERE id = $15;
        `, [
          updatedScheme.name, updatedScheme.shortName, updatedScheme.department,
          updatedScheme.nodalAgency, updatedScheme.sector, JSON.stringify(updatedScheme.sectorsList || []),
          updatedScheme.maxFunding, Number(updatedScheme.maxFundingNum || 1000000),
          updatedScheme.subsidyRate, updatedScheme.marginMoney, updatedScheme.status,
          updatedScheme.description, updatedScheme.potentialBenefit, updatedScheme.officialPortal,
          id
        ]);
      } catch (err) {
        console.warn('DB updateScheme fallback notice:', err.message);
      }
    }

    const idx = this.localSchemes.findIndex(s => s.id === id);
    if (idx !== -1) {
      this.localSchemes[idx] = updatedScheme;
    }
    return updatedScheme;
  }

  async deleteScheme(id) {
    if (isConnected) {
      try {
        await pool.query('DELETE FROM schemes WHERE id = $1', [id]);
      } catch (err) {
        console.warn('DB deleteScheme fallback notice:', err.message);
      }
    }

    const beforeLen = this.localSchemes.length;
    this.localSchemes = this.localSchemes.filter(s => s.id !== id);
    return this.localSchemes.length < beforeLen;
  }

  // --- Center Operations ---
  async getBanks() {
    if (isConnected) {
      try {
        const { rows } = await pool.query("SELECT * FROM service_centers WHERE category = 'BANK'");
        if (rows.length > 0) return rows.map(this.mapCenterFromDb);
      } catch (e) {
        console.warn('DB read fallback for banks:', e.message);
      }
    }
    return this.localBanks;
  }

  async getCSCCenters() {
    if (isConnected) {
      try {
        const { rows } = await pool.query("SELECT * FROM service_centers WHERE category = 'CSC'");
        if (rows.length > 0) return rows.map(this.mapCenterFromDb);
      } catch (e) {
        console.warn('DB read fallback for CSCs:', e.message);
      }
    }
    return this.localCSCs;
  }

  // --- Application / Roadmap Operations ---
  async getUserApplications(userId) {
    if (isConnected) {
      try {
        const { rows } = await pool.query('SELECT * FROM applications WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
        if (rows.length > 0) return rows.map(this.mapApplicationFromDb);
      } catch (e) {
        console.warn('DB read fallback for applications:', e.message);
      }
    }
    return this.localApplications.filter(a => a.userId === userId);
  }

  async getApplicationById(id) {
    if (isConnected) {
      try {
        const { rows } = await pool.query('SELECT * FROM applications WHERE id = $1', [id]);
        if (rows.length > 0) return this.mapApplicationFromDb(rows[0]);
      } catch (e) {
        console.warn('DB read fallback for application by id:', e.message);
      }
    }
    return this.localApplications.find(a => a.id === id) || null;
  }

  async createApplication(userId, schemeId) {
    const scheme = await this.getSchemeById(schemeId);
    const newApp = {
      id: `app-${Date.now()}`,
      userId,
      schemeId,
      schemeName: scheme ? scheme.name : 'Government Scheme',
      currentStage: 1,
      totalStages: 7,
      status: 'In Progress',
      appliedDate: new Date().toISOString().split('T')[0],
      assignedBankId: 'bank-1',
      assignedCSCId: 'csc-1',
      stages: [
        { step: 1, title: 'Profile & Need Discovery', status: 'completed', completedAt: new Date().toISOString() },
        { step: 2, title: 'AI Scheme Selection & Match Verification', status: 'in_progress', completedAt: null },
        { step: 3, title: 'Document Readiness Audit', status: 'pending', completedAt: null },
        { step: 4, title: 'DPR & Financial Forecast Generation', status: 'pending', completedAt: null },
        { step: 5, title: 'Online Portal & Nodal Bank Submission', status: 'pending', completedAt: null },
        { step: 6, title: '10-Day EDP Training Completion', status: 'pending', completedAt: null },
        { step: 7, title: 'Bank Loan Sanction & Subsidy Disbursal', status: 'pending', completedAt: null }
      ]
    };

    if (isConnected) {
      try {
        await pool.query(`
          INSERT INTO applications (id, user_id, scheme_id, scheme_name, current_stage, total_stages, status, applied_date, assigned_bank_id, assigned_csc_id, stages)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);
        `, [
          newApp.id, newApp.userId, newApp.schemeId, newApp.schemeName,
          newApp.currentStage, newApp.totalStages, newApp.status, newApp.appliedDate,
          newApp.assignedBankId, newApp.assignedCSCId, JSON.stringify(newApp.stages)
        ]);
        return newApp;
      } catch (e) {
        console.warn('DB create application fallback:', e.message);
      }
    }

    this.localApplications.push(newApp);
    return newApp;
  }

  async updateApplicationStage(appId, stepNumber, status = 'completed') {
    const app = await this.getApplicationById(appId);
    if (!app) return null;

    const stage = app.stages.find(s => s.step === stepNumber);
    if (stage) {
      stage.status = status;
      stage.completedAt = status === 'completed' ? new Date().toISOString() : null;
      if (status === 'completed' && app.currentStage <= stepNumber && stepNumber < app.totalStages) {
        app.currentStage = stepNumber + 1;
        const nextStage = app.stages.find(s => s.step === app.currentStage);
        if (nextStage && nextStage.status === 'pending') {
          nextStage.status = 'in_progress';
        }
      }
    }

    if (isConnected) {
      try {
        await pool.query(`
          UPDATE applications
          SET current_stage = $1, stages = $2, updated_at = CURRENT_TIMESTAMP
          WHERE id = $3;
        `, [app.currentStage, JSON.stringify(app.stages), appId]);
        return app;
      } catch (e) {
        console.warn('DB update application stage fallback:', e.message);
      }
    }

    return app;
  }

  // --- Auth Methods ---
  async findUserByEmail(email) {
    if (!email) return null;
    const clean = email.toLowerCase().trim();
    if (isConnected) {
      try {
        const { rows } = await pool.query('SELECT * FROM users WHERE LOWER(email) = LOWER($1)', [clean]);
        if (rows.length > 0) return { id: rows[0].id, email: rows[0].email, profileId: rows[0].profile_id, password: rows[0].password_hash };
      } catch (e) {
        console.warn('DB user find fallback:', e.message);
      }
    }
    return this.localUsers.find(u => u.email.toLowerCase() === clean) || null;
  }

  async createUser(userData) {
    const newUser = { id: userData.id || `usr-${Date.now()}`, ...userData };
    if (isConnected) {
      try {
        await pool.query(`
          INSERT INTO users (id, email, password_hash, profile_id)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (email) DO UPDATE SET
            profile_id = EXCLUDED.profile_id,
            password_hash = EXCLUDED.password_hash;
        `, [newUser.id, newUser.email, newUser.password || 'hash', newUser.profileId]);
        return newUser;
      } catch (e) {
        console.warn('DB user create fallback:', e.message);
      }
    }
    this.localUsers.push(newUser);
    return newUser;
  }

  async updateUserPassword(email, newPassword) {
    if (!email) return false;
    const clean = email.toLowerCase().trim();
    if (isConnected) {
      try {
        await pool.query('UPDATE users SET password_hash = $1 WHERE LOWER(email) = LOWER($2)', [newPassword, clean]);
      } catch (e) {
        console.warn('DB user password update fallback:', e.message);
      }
    }
    const local = this.localUsers.find(u => u.email.toLowerCase() === clean);
    if (local) {
      local.password = newPassword;
    }
    return true;
  }

  // --- Data Mappers ---
  mapProfileFromDb(row) {
    return {
      id: row.id,
      name: row.name,
      tagline: row.tagline,
      avatar: row.avatar || '👨🏽‍🌾',
      age: row.age,
      gender: row.gender,
      socialCategory: row.social_category,
      socialCategoryCode: row.social_category_code,
      state: row.state,
      district: row.district,
      annualIncome: row.annual_income,
      annualIncomeNum: Number(row.annual_income_num || 0),
      education: row.education,
      educationLevel: row.education_level,
      businessName: row.business_name,
      businessType: row.business_type,
      sector: row.sector,
      stage: row.stage,
      locationType: row.location_type,
      investmentRequired: row.investment_required,
      fundingRequired: row.funding_required,
      fundingRequiredNum: Number(row.funding_required_num || 0),
      expectedTurnover: row.expected_turnover,
      employeesCount: row.employees_count,
      preferredLanguage: row.preferred_language,
      fundingType: row.funding_type,
      supportNeeded: row.support_needed,
      completionPercentage: row.completion_percentage,
      documentsReadyCount: row.documents_ready_count,
      documentsTotalCount: row.documents_total_count,
      activeApplicationsCount: row.active_applications_count,
      matchedSchemesCount: row.matched_schemes_count
    };
  }

  mapSchemeFromDb(row) {
    return {
      id: row.id,
      name: row.name,
      shortName: row.short_name,
      department: row.department,
      nodalAgency: row.nodal_agency,
      sector: row.sector,
      sectorsList: typeof row.sectors_list === 'string' ? JSON.parse(row.sectors_list) : row.sectors_list,
      stageEligibility: typeof row.stage_eligibility === 'string' ? JSON.parse(row.stage_eligibility) : row.stage_eligibility,
      maxFunding: row.max_funding,
      maxFundingNum: Number(row.max_funding_num),
      minFundingNum: Number(row.min_funding_num),
      subsidyRate: row.subsidy_rate,
      marginMoney: row.margin_money,
      status: row.status,
      description: row.description,
      potentialBenefit: row.potential_benefit,
      whyMatchedReasons: typeof row.why_matched_reasons === 'string' ? JSON.parse(row.why_matched_reasons) : row.why_matched_reasons,
      factorScores: typeof row.factor_scores === 'string' ? JSON.parse(row.factor_scores) : row.factor_scores,
      eligibilityRules: typeof row.eligibility_rules === 'string' ? JSON.parse(row.eligibility_rules) : row.eligibility_rules,
      requiredDocuments: typeof row.required_documents === 'string' ? JSON.parse(row.required_documents) : row.required_documents,
      applicationSteps: typeof row.application_steps === 'string' ? JSON.parse(row.application_steps) : row.application_steps,
      whereToApply: row.where_to_apply,
      officialPortal: row.official_portal,
      isSampleData: row.is_sample_data
    };
  }

  mapCenterFromDb(row) {
    return {
      id: row.id,
      name: row.name,
      type: row.type,
      address: row.address,
      district: row.district,
      state: row.state,
      latitude: Number(row.latitude),
      longitude: Number(row.longitude),
      distance: row.distance,
      contactPerson: row.contact_person,
      phone: row.phone,
      email: row.email,
      supportedSchemes: typeof row.supported_schemes === 'string' ? JSON.parse(row.supported_schemes) : row.supported_schemes,
      servicesOffered: typeof row.services_offered === 'string' ? JSON.parse(row.services_offered) : row.services_offered,
      timing: row.timing,
      rating: Number(row.rating),
      status: row.status
    };
  }

  mapApplicationFromDb(row) {
    return {
      id: row.id,
      userId: row.user_id,
      schemeId: row.scheme_id,
      schemeName: row.scheme_name,
      currentStage: row.current_stage,
      totalStages: row.total_stages,
      status: row.status,
      appliedDate: row.applied_date,
      assignedBankId: row.assigned_bank_id,
      assignedCSCId: row.assigned_csc_id,
      stages: typeof row.stages === 'string' ? JSON.parse(row.stages) : row.stages
    };
  }
}

export const db = new HybridDatabaseStore();
