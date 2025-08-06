const { Pool } = require('pg')

// Neon PostgreSQL connection configuration
const connectionString = 'postgresql://neondb_owner:npg_Xx3sf8uWAwdN@ep-odd-union-a2815vxh-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})

async function testConnection() {
  try {
    console.log('🔄 Testing Neon PostgreSQL connection...')
    
    const client = await pool.connect()
    console.log('✅ Connected to Neon PostgreSQL successfully!')
    
    // Test basic query
    const result = await client.query('SELECT NOW() as current_time')
    console.log('⏰ Current database time:', result.rows[0].current_time)
    
    // Check if admin_users table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'admin_users'
      )
    `)
    
    if (tableCheck.rows[0].exists) {
      console.log('✅ admin_users table exists')
      
      // Check admin user
      const adminUser = await client.query(
        'SELECT id, email, name, role, is_active FROM admin_users WHERE email = $1',
        ['admin@vanvelzenautorecycling.nl']
      )
      
      if (adminUser.rows.length > 0) {
        console.log('✅ Admin user found:', adminUser.rows[0])
      } else {
        console.log('❌ Admin user not found')
      }
    } else {
      console.log('❌ admin_users table does not exist')
    }
    
    // List all tables
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `)
    
    console.log('📋 Available tables:')
    tables.rows.forEach(row => {
      console.log(`  - ${row.table_name}`)
    })
    
    client.release()
    await pool.end()
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message)
    process.exit(1)
  }
}

testConnection() 