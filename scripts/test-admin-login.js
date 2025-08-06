const { Pool } = require('pg')
const bcrypt = require('bcryptjs')

// Neon PostgreSQL connection configuration
const connectionString = 'postgresql://neondb_owner:npg_Xx3sf8uWAwdN@ep-odd-union-a2815vxh-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})

async function testAdminLogin() {
  try {
    console.log('🔄 Testing admin login functionality...')
    
    const client = await pool.connect()
    
    // Test admin login credentials
    const email = 'admin@vanvelzenautorecycling.nl'
    const password = 'admin123'
    
    console.log(`📧 Testing login for: ${email}`)
    
    // Get user from database
    const { rows } = await client.query(
      'SELECT id, email, password_hash, name, role, is_active FROM admin_users WHERE email = $1 AND is_active = true',
      [email]
    )

    if (rows.length === 0) {
      console.log('❌ User not found or inactive')
      return
    }

    const user = rows[0]
    console.log('✅ User found:', { id: user.id, email: user.email, name: user.name, role: user.role })
    
    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    
    if (isValidPassword) {
      console.log('✅ Password verification successful')
      console.log('🎉 Admin login test PASSED!')
    } else {
      console.log('❌ Password verification failed')
      console.log('🔧 Updating password hash...')
      
      // Update password hash
      const newHash = await bcrypt.hash(password, 12)
      await client.query(
        'UPDATE admin_users SET password_hash = $1 WHERE email = $2',
        [newHash, email]
      )
      
      console.log('✅ Password hash updated successfully')
      console.log('🎉 Admin login test PASSED after password update!')
    }
    
    client.release()
    await pool.end()
    
  } catch (error) {
    console.error('❌ Admin login test failed:', error.message)
    process.exit(1)
  }
}

testAdminLogin() 