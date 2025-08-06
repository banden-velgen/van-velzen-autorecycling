# Van Velzen Autorecycling - Database Setup Guide

## 📋 Overview

This guide explains how to set up the complete database for the Van Velzen Autorecycling application using the `database-complete-schema.sql` file.

## 🗄️ Database Schema

The database includes the following main components:

### Core Business Tables
- **`quote_requests`** - Public quote form submissions
- **`customers`** - Customer information and contact details
- **`vehicles`** - Vehicle details linked to customers
- **`pickups`** - Pickup scheduling and management
- **`quotes`** - Admin-generated quotes for customers

### Inventory Management
- **`inventory_categories`** - Categories for inventory items
- **`inventory_items`** - Inventory items for sale

### Recycling System
- **`recycling`** - Vehicle recycling records
- **`rdw_vrijwaringen`** - RDW deregistration certificates

### Payment System
- **`payments`** - Payment records for quotes

### File Storage
- **`vehicle_documents`** - Documents linked to vehicles
- **`storage_items`** - General file storage items
- **`file_metadata`** - File metadata for general file management

### Audit & Logging
- **`activity_logs`** - Audit trail for admin activities

## 🚀 Setup Instructions

### Option 1: Supabase (Recommended)

1. **Create a new Supabase project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose your organization
   - Enter project details:
     - **Name**: `van-velzen-autorecycling`
     - **Database Password**: Choose a strong password
     - **Region**: Select **West Europe** (closest to Netherlands)
   - Click "Create new project"
   - Wait for the project to be created (2-3 minutes)

2. **Get your project credentials**
   - In your Supabase project dashboard, go to **Settings** → **API**
   - Copy the following values:
     - **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
     - **anon public** key (starts with `eyJ...`)

3. **Run the database schema**
   - In your Supabase dashboard, go to **SQL Editor**
   - Copy and paste the **entire contents** of `database-complete-schema.sql`
   - Click **"Run"** to execute the schema
   - This will create all tables, indexes, triggers, and policies

4. **Create admin user**
   - Go to **Authentication** → **Users**
   - Click **"Add User"**
   - Enter:
     - **Email**: `admin@vanvelzenautorecycling.nl`
     - **Password**: `admin123`
   - Click **"Add User"**

5. **Update environment variables**
   - Edit your `.env.local` file:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### Option 2: PostgreSQL (Local/Server)

1. **Install PostgreSQL**
   - Download from [postgresql.org](https://www.postgresql.org/download/)
   - Or use Docker: `docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres`

2. **Create database**
   ```sql
   CREATE DATABASE van_velzen_autorecycling;
   ```

3. **Run the schema**
   ```bash
   psql -d van_velzen_autorecycling -f database-complete-schema.sql
   ```

4. **Create admin user**
   ```sql
   INSERT INTO auth.users (email, encrypted_password, email_confirmed_at, created_at, updated_at)
   VALUES ('admin@vanvelzenautorecycling.nl', crypt('admin123', gen_salt('bf')), NOW(), NOW(), NOW());
   ```

## 🔧 Features Included

### ✅ Database Features
- **UUID Primary Keys** - Secure, unique identifiers
- **Foreign Key Relationships** - Data integrity
- **Automatic Timestamps** - Created/updated tracking
- **Indexes** - Performance optimization
- **Triggers** - Automatic updated_at timestamps
- **Row Level Security (RLS)** - Secure access control
- **Comprehensive Policies** - Proper permissions

### ✅ Business Logic Support
- **Multi-language support** - All 6 languages (Dutch, English, German, French, Spanish, Italian)
- **File upload system** - Complete file management
- **Inventory management** - Categories and items
- **Vehicle tracking** - Complete vehicle lifecycle
- **Customer management** - Full customer records
- **Quote system** - Public quotes and admin quotes
- **Pickup scheduling** - Complete pickup management
- **Recycling records** - Vehicle recycling tracking
- **Payment tracking** - Quote payment records
- **Activity logging** - Complete audit trail

### ✅ Performance Optimizations
- **Strategic indexes** on frequently queried columns
- **Composite indexes** for complex queries
- **Foreign key indexes** for join performance
- **Status-based indexes** for filtering

## 📊 Sample Data

The schema includes sample inventory categories:
- Motoren (Engines)
- Transmissie (Transmission)
- Carrosserie (Bodywork)
- Elektronica (Electronics)
- Interieur (Interior)
- Wielen en Banden (Wheels and Tires)
- Remmen (Brakes)
- Ophanging (Suspension)
- Koeling (Cooling)
- Brandstof (Fuel)

## 🔒 Security Features

### Row Level Security (RLS)
All tables have RLS enabled with appropriate policies:
- **Authenticated users** can perform all operations
- **Anonymous users** can only insert quote requests
- **Proper data isolation** between users

### Data Protection
- **UUID primary keys** prevent enumeration attacks
- **Encrypted passwords** (if using Supabase Auth)
- **Audit logging** for all admin activities
- **Foreign key constraints** maintain data integrity

## 🛠️ Troubleshooting

### Common Issues

1. **"Extension not found" error**
   - Solution: The script includes `CREATE EXTENSION IF NOT EXISTS` statements
   - If using local PostgreSQL, ensure extensions are available

2. **"Permission denied" error**
   - Solution: Ensure your database user has CREATE privileges
   - For Supabase, this should work automatically

3. **"Table already exists" error**
   - Solution: The script uses `CREATE TABLE IF NOT EXISTS` so this shouldn't happen
   - If it does, the table will be skipped safely

4. **"Policy already exists" error**
   - Solution: Policies are created with proper error handling
   - Duplicate policies will be ignored

### Verification

After running the schema, verify it worked by checking:

1. **Tables exist**:
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' 
   ORDER BY table_name;
   ```

2. **Indexes created**:
   ```sql
   SELECT indexname, tablename FROM pg_indexes 
   WHERE schemaname = 'public' 
   ORDER BY tablename, indexname;
   ```

3. **RLS enabled**:
   ```sql
   SELECT schemaname, tablename, rowsecurity 
   FROM pg_tables 
   WHERE schemaname = 'public' 
   AND rowsecurity = true;
   ```

## 📝 Next Steps

After setting up the database:

1. **Update environment variables** in your application
2. **Test the connection** using the admin panel
3. **Create additional users** as needed
4. **Import any existing data** if migrating from another system
5. **Set up backup procedures** for production

## 🔄 Migration from Existing Database

If you have an existing database:

1. **Backup your current data**
2. **Run the new schema** (it won't overwrite existing data)
3. **Migrate data** using appropriate SQL scripts
4. **Verify data integrity** after migration
5. **Test all functionality** thoroughly

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Verify your database credentials
3. Ensure all environment variables are set correctly
4. Check the application logs for specific error messages

---

**Note**: This schema is designed to work with the Van Velzen Autorecycling Next.js application. Make sure your application code matches the table structures defined here. 