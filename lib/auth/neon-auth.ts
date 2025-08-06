import { compare, hash } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import pool from '../db/neon'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export interface AdminUser {
  id: string
  email: string
  name: string
  role: string
  is_active: boolean
  last_login?: Date
}

export interface LoginCredentials {
  email: string
  password: string
}

export async function authenticateUser(credentials: LoginCredentials): Promise<AdminUser | null> {
  try {
    const { rows } = await pool.query(
      'SELECT id, email, password_hash, name, role, is_active FROM admin_users WHERE email = $1 AND is_active = true',
      [credentials.email]
    )

    if (rows.length === 0) {
      return null
    }

    const user = rows[0]
    const isValidPassword = await compare(credentials.password, user.password_hash)

    if (!isValidPassword) {
      return null
    }

    // Update last login
    await pool.query(
      'UPDATE admin_users SET last_login = NOW() WHERE id = $1',
      [user.id]
    )

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      is_active: user.is_active,
      last_login: new Date()
    }
  } catch (error) {
    console.error('Authentication error:', error)
    return null
  }
}

export function generateToken(user: AdminUser): string {
  return sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  )
}

export function verifyToken(token: string): AdminUser | null {
  try {
    const decoded = verify(token, JWT_SECRET) as any
    return {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
      is_active: true
    }
  } catch (error) {
    return null
  }
}

export async function createUser(userData: {
  email: string
  password: string
  name: string
  role?: string
}): Promise<AdminUser | null> {
  try {
    const hashedPassword = await hash(userData.password, 12)
    
    const { rows } = await pool.query(
      'INSERT INTO admin_users (email, password_hash, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role, is_active',
      [userData.email, hashedPassword, userData.name, userData.role || 'admin']
    )

    if (rows.length === 0) {
      return null
    }

    return {
      id: rows[0].id,
      email: rows[0].email,
      name: rows[0].name,
      role: rows[0].role,
      is_active: rows[0].is_active
    }
  } catch (error) {
    console.error('User creation error:', error)
    return null
  }
}

export async function getUserById(id: string): Promise<AdminUser | null> {
  try {
    const { rows } = await pool.query(
      'SELECT id, email, name, role, is_active, last_login FROM admin_users WHERE id = $1 AND is_active = true',
      [id]
    )

    if (rows.length === 0) {
      return null
    }

    return {
      id: rows[0].id,
      email: rows[0].email,
      name: rows[0].name,
      role: rows[0].role,
      is_active: rows[0].is_active,
      last_login: rows[0].last_login
    }
  } catch (error) {
    console.error('Get user error:', error)
    return null
  }
}

export async function updateUserPassword(userId: string, newPassword: string): Promise<boolean> {
  try {
    const hashedPassword = await hash(newPassword, 12)
    
    const { rowCount } = await pool.query(
      'UPDATE admin_users SET password_hash = $1, updated_at = NOW() WHERE id = $2',
      [hashedPassword, userId]
    )

    return rowCount > 0
  } catch (error) {
    console.error('Password update error:', error)
    return false
  }
} 