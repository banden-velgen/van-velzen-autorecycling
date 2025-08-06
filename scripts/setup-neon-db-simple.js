const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

// Neon PostgreSQL connection configuration
const connectionString = 'postgresql://neondb_owner:npg_Xx3sf8uWAwdN@ep-odd-union-a2815vxh-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})

async function setupDatabase() {
  try {
    console.log('🔄 Connecting to Neon PostgreSQL...')
    
    // Test connection
    const client = await pool.connect()
    console.log('✅ Connected to Neon PostgreSQL successfully!')
    
    // Enable required extensions
    console.log('📦 Enabling extensions...')
    await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    await client.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto"')
    console.log('✅ Extensions enabled')
    
    // Create tables one by one
    console.log('🏗️  Creating tables...')
    
    // Core tables
    await client.query(`
      CREATE TABLE IF NOT EXISTS quote_requests (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        license_plate TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        message TEXT,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ quote_requests table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT,
        postal_code TEXT,
        city TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ customers table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        license_plate TEXT NOT NULL UNIQUE,
        brand TEXT,
        model TEXT,
        year INTEGER,
        color TEXT,
        customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
        status TEXT DEFAULT 'active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ vehicles table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS pickups (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
        customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
        scheduled_date TIMESTAMP WITH TIME ZONE NOT NULL,
        address TEXT NOT NULL,
        postal_code TEXT NOT NULL,
        city TEXT NOT NULL,
        contact_name TEXT NOT NULL,
        contact_phone TEXT NOT NULL,
        notes TEXT,
        status TEXT DEFAULT 'scheduled',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ pickups table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS quotes (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
        customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
        amount DECIMAL(10,2) NOT NULL,
        valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
        status TEXT DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ quotes table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT DEFAULT 'admin',
        is_active BOOLEAN DEFAULT true,
        last_login TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ admin_users table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS inventory_categories (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ inventory_categories table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS inventory_items (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        sku TEXT UNIQUE,
        description TEXT,
        category_id UUID REFERENCES inventory_categories(id) ON DELETE SET NULL,
        vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
        condition TEXT,
        price DECIMAL(10,2) NOT NULL DEFAULT 0,
        cost DECIMAL(10,2) NOT NULL DEFAULT 0,
        quantity INTEGER NOT NULL DEFAULT 0,
        location TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ inventory_items table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS recycling (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
        customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
        recycling_date TIMESTAMP WITH TIME ZONE NOT NULL,
        recycling_center TEXT,
        certificate_number TEXT,
        status TEXT DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ recycling table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS recycling_records (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
        customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
        recycling_date TIMESTAMP WITH TIME ZONE NOT NULL,
        recycling_center TEXT,
        certificate_number TEXT,
        status TEXT DEFAULT 'pending',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ recycling_records table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS rdw_vrijwaringen (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
        vrijwaring_number TEXT UNIQUE,
        issue_date TIMESTAMP WITH TIME ZONE NOT NULL,
        status TEXT DEFAULT 'active',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ rdw_vrijwaringen table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS vrijwaringen (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
        vrijwaring_number TEXT UNIQUE,
        issue_date TIMESTAMP WITH TIME ZONE NOT NULL,
        status TEXT DEFAULT 'active',
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ vrijwaringen table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        quote_id UUID REFERENCES quotes(id) ON DELETE CASCADE,
        amount DECIMAL(10,2) NOT NULL,
        payment_method TEXT NOT NULL,
        payment_date TIMESTAMP WITH TIME ZONE NOT NULL,
        status TEXT DEFAULT 'pending',
        transaction_id TEXT,
        notes TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ payments table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS files (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        file_path TEXT NOT NULL,
        file_type TEXT NOT NULL,
        file_size INTEGER NOT NULL,
        entity_type TEXT NOT NULL,
        entity_id UUID NOT NULL,
        uploaded_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ files table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS vehicle_documents (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
        document_type TEXT NOT NULL,
        file_name TEXT NOT NULL,
        file_path TEXT NOT NULL,
        file_size INTEGER,
        mime_type TEXT,
        uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ vehicle_documents table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS storage_items (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        file_path TEXT NOT NULL,
        file_type TEXT NOT NULL,
        file_size INTEGER NOT NULL,
        entity_type TEXT NOT NULL,
        entity_id UUID NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ storage_items table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS storage_categories (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ storage_categories table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS storage (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        file_path TEXT NOT NULL,
        file_type TEXT NOT NULL,
        file_size INTEGER NOT NULL,
        category_id UUID REFERENCES storage_categories(id) ON DELETE SET NULL,
        entity_type TEXT NOT NULL,
        entity_id UUID NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ storage table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS file_metadata (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        name TEXT NOT NULL,
        size INTEGER NOT NULL,
        type TEXT NOT NULL,
        url TEXT NOT NULL,
        path TEXT NOT NULL,
        entity_type TEXT NOT NULL,
        entity_id UUID NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ file_metadata table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS notification_preferences (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
        notification_type TEXT NOT NULL,
        email_enabled BOOLEAN DEFAULT true,
        sms_enabled BOOLEAN DEFAULT false,
        push_enabled BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        UNIQUE(user_id, notification_type)
      )
    `)
    console.log('✅ notification_preferences table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS notification_logs (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
        notification_type TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'sent',
        sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ notification_logs table created')
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID,
        action TEXT NOT NULL,
        entity_type TEXT NOT NULL,
        entity_id UUID,
        details JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `)
    console.log('✅ activity_logs table created')
    
    // Create indexes
    console.log('📊 Creating indexes...')
    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status)',
      'CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests(created_at DESC)',
      'CREATE INDEX IF NOT EXISTS idx_vehicles_license_plate ON vehicles(license_plate)',
      'CREATE INDEX IF NOT EXISTS idx_vehicles_customer_id ON vehicles(customer_id)',
      'CREATE INDEX IF NOT EXISTS idx_pickups_vehicle_id ON pickups(vehicle_id)',
      'CREATE INDEX IF NOT EXISTS idx_pickups_customer_id ON pickups(customer_id)',
      'CREATE INDEX IF NOT EXISTS idx_quotes_vehicle_id ON quotes(vehicle_id)',
      'CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email)',
      'CREATE INDEX IF NOT EXISTS idx_inventory_items_category_id ON inventory_items(category_id)',
      'CREATE INDEX IF NOT EXISTS idx_recycling_vehicle_id ON recycling(vehicle_id)',
      'CREATE INDEX IF NOT EXISTS idx_payments_quote_id ON payments(quote_id)',
      'CREATE INDEX IF NOT EXISTS idx_files_entity ON files(entity_type, entity_id)',
      'CREATE INDEX IF NOT EXISTS idx_vehicle_documents_vehicle_id ON vehicle_documents(vehicle_id)',
      'CREATE INDEX IF NOT EXISTS idx_storage_items_entity ON storage_items(entity_type, entity_id)',
      'CREATE INDEX IF NOT EXISTS idx_activity_logs_entity_type ON activity_logs(entity_type)'
    ]
    
    for (const index of indexes) {
      await client.query(index)
    }
    console.log('✅ Indexes created')
    
    // Create triggers
    console.log('🔧 Creating triggers...')
    await client.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql
    `)
    
    const tablesWithTriggers = [
      'quote_requests', 'customers', 'vehicles', 'pickups', 'quotes', 
      'admin_users', 'inventory_categories', 'inventory_items', 'recycling',
      'recycling_records', 'rdw_vrijwaringen', 'vrijwaringen', 'payments',
      'files', 'storage_items', 'storage_categories', 'storage', 
      'file_metadata', 'notification_preferences'
    ]
    
    for (const table of tablesWithTriggers) {
      await client.query(`
        DROP TRIGGER IF EXISTS update_${table}_updated_at ON ${table};
        CREATE TRIGGER update_${table}_updated_at
          BEFORE UPDATE ON ${table}
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at_column()
      `)
    }
    console.log('✅ Triggers created')
    
    // Insert sample data
    console.log('📝 Inserting sample data...')
    
    // Insert inventory categories
    await client.query(`
      INSERT INTO inventory_categories (name, description) VALUES
        ('Motoren', 'Auto motoren en onderdelen'),
        ('Transmissie', 'Versnellingsbakken en onderdelen'),
        ('Carrosserie', 'Carrosserie onderdelen'),
        ('Elektronica', 'Elektronische onderdelen'),
        ('Interieur', 'Interieur onderdelen'),
        ('Wielen en Banden', 'Wielen, velgen en banden'),
        ('Remmen', 'Remmen en remonderdelen'),
        ('Ophanging', 'Ophanging en vering'),
        ('Koeling', 'Koelsystemen en onderdelen'),
        ('Brandstof', 'Brandstofsystemen en onderdelen')
      ON CONFLICT (name) DO NOTHING
    `)
    console.log('✅ Inventory categories inserted')
    
    // Insert storage categories
    await client.query(`
      INSERT INTO storage_categories (name, description) VALUES
        ('Documents', 'Document files and paperwork'),
        ('Images', 'Image files and photos'),
        ('Videos', 'Video files and recordings'),
        ('Archives', 'Compressed and archive files'),
        ('Templates', 'Template files and forms')
      ON CONFLICT (name) DO NOTHING
    `)
    console.log('✅ Storage categories inserted')
    
    // Insert admin user
    await client.query(`
      INSERT INTO admin_users (email, password_hash, name, role) VALUES
        ('admin@vanvelzenautorecycling.nl', crypt('admin123', gen_salt('bf')), 'Administrator', 'admin')
      ON CONFLICT (email) DO NOTHING
    `)
    console.log('✅ Admin user created')
    
    // Verify tables
    console.log('🔍 Verifying tables...')
    const tablesResult = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `)
    
    console.log('📊 Created tables:')
    tablesResult.rows.forEach(row => {
      console.log(`  - ${row.table_name}`)
    })
    
    // Verify admin user
    const adminResult = await client.query(`
      SELECT email, name, role 
      FROM admin_users 
      WHERE email = 'admin@vanvelzenautorecycling.nl'
    `)
    
    if (adminResult.rows.length > 0) {
      console.log('✅ Admin user verified:')
      console.log(`  - Email: ${adminResult.rows[0].email}`)
      console.log(`  - Name: ${adminResult.rows[0].name}`)
      console.log(`  - Role: ${adminResult.rows[0].role}`)
      console.log('  - Password: admin123')
    }
    
    client.release()
    console.log('🎉 Database setup completed successfully!')
    console.log('')
    console.log('📝 Next steps:')
    console.log('1. Test the admin login at /admin')
    console.log('2. Verify all functionality works correctly')
    
  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

// Run the setup
setupDatabase() 