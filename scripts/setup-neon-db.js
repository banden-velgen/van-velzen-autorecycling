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
    
    // Read the SQL schema file
    const schemaPath = path.join(__dirname, '..', 'database-complete-schema.sql')
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8')
    
    console.log('📖 Reading database schema...')
    
    // Split the SQL into individual statements
    const statements = schemaSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'))
    
    console.log(`🔧 Executing ${statements.length} SQL statements...`)
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      if (statement.trim()) {
        try {
          await client.query(statement)
          console.log(`✅ Statement ${i + 1}/${statements.length} executed successfully`)
        } catch (error) {
          // Skip if table already exists or other non-critical errors
          if (error.message.includes('already exists') || error.message.includes('duplicate key')) {
            console.log(`⚠️  Statement ${i + 1}/${statements.length} skipped (already exists)`)
          } else {
            console.error(`❌ Error in statement ${i + 1}/${statements.length}:`, error.message)
            throw error
          }
        }
      }
    }
    
    // Verify tables were created
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
    
    // Verify admin user exists
    console.log('👤 Verifying admin user...')
    const adminResult = await client.query(`
      SELECT email, name, role 
      FROM admin_users 
      WHERE email = 'admin@vanvelzenautorecycling.nl'
    `)
    
    if (adminResult.rows.length > 0) {
      console.log('✅ Admin user created successfully:')
      console.log(`  - Email: ${adminResult.rows[0].email}`)
      console.log(`  - Name: ${adminResult.rows[0].name}`)
      console.log(`  - Role: ${adminResult.rows[0].role}`)
      console.log('  - Password: admin123')
    } else {
      console.log('⚠️  Admin user not found, creating...')
      await client.query(`
        INSERT INTO admin_users (email, password_hash, name, role) 
        VALUES (
          'admin@vanvelzenautorecycling.nl', 
          crypt('admin123', gen_salt('bf')), 
          'Administrator', 
          'admin'
        )
      `)
      console.log('✅ Admin user created successfully')
    }
    
    client.release()
    console.log('🎉 Database setup completed successfully!')
    console.log('')
    console.log('📝 Next steps:')
    console.log('1. Update your environment variables to use Neon')
    console.log('2. Test the admin login at /admin')
    console.log('3. Verify all functionality works correctly')
    
  } catch (error) {
    console.error('❌ Database setup failed:', error)
    process.exit(1)
  } finally {
    await pool.end()
  }
}

// Run the setup
setupDatabase() 