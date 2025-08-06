const { Pool } = require('pg')
const bcrypt = require('bcryptjs')

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Xx3sf8uWAwdN@ep-odd-union-a2815vxh-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
})

async function verifyAdminUser() {
  try {
    console.log('🔍 Checking admin user...')
    
    // Check if admin user exists
    const { rows } = await pool.query(
      'SELECT id, email, name, role, is_active FROM admin_users WHERE email = $1',
      ['admin@vanvelzenautorecycling.nl']
    )

    if (rows.length === 0) {
      console.log('❌ Admin user not found. Creating...')
      
      // Create admin user
      const hashedPassword = await bcrypt.hash('admin123', 12)
      
      const { rows: newUser } = await pool.query(
        `INSERT INTO admin_users (email, password_hash, name, role, is_active, created_at, updated_at) 
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) 
         RETURNING id, email, name, role, is_active`,
        ['admin@vanvelzenautorecycling.nl', hashedPassword, 'Admin User', 'super_admin', true]
      )
      
      console.log('✅ Admin user created successfully:', newUser[0])
    } else {
      const user = rows[0]
      console.log('✅ Admin user found:', {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        is_active: user.is_active
      })
      
      // Update role to super_admin if not already
      if (user.role !== 'super_admin') {
        console.log('🔄 Updating role to super_admin...')
        await pool.query(
          'UPDATE admin_users SET role = $1, updated_at = NOW() WHERE id = $2',
          ['super_admin', user.id]
        )
        console.log('✅ Role updated to super_admin')
      }
      
      // Ensure user is active
      if (!user.is_active) {
        console.log('🔄 Activating user...')
        await pool.query(
          'UPDATE admin_users SET is_active = $1, updated_at = NOW() WHERE id = $2',
          [true, user.id]
        )
        console.log('✅ User activated')
      }
    }
    
    // Test login
    console.log('🧪 Testing login...')
    const testUser = await pool.query(
      'SELECT id, email, password_hash, name, role, is_active FROM admin_users WHERE email = $1 AND is_active = true',
      ['admin@vanvelzenautorecycling.nl']
    )
    
    if (testUser.rows.length > 0) {
      const isValidPassword = await bcrypt.compare('admin123', testUser.rows[0].password_hash)
      if (isValidPassword) {
        console.log('✅ Login test successful')
        console.log('📋 Admin credentials:')
        console.log('   Email: admin@vanvelzenautorecycling.nl')
        console.log('   Password: admin123')
        console.log('   Role: super_admin')
        console.log('   Status: Active')
      } else {
        console.log('❌ Password verification failed')
      }
    } else {
      console.log('❌ User not found for login test')
    }
    
  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await pool.end()
  }
}

verifyAdminUser() 