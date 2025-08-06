# Van Velzen Autorecycling - Setup Guide

## 🚨 Current Issue: Database Schema Mismatch

The error `column "customer_id" does not exist` indicates that your database has tables with an older schema that doesn't match what the admin panel expects. This happens when tables were created with a different structure.

## Environment Variables Setup

### 1. Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `van-velzen-autorecycling`
   - **Database Password**: Choose a strong password
   - **Region**: Select **West Europe** (closest to Netherlands)
5. Click "Create new project"
6. Wait for the project to be created (2-3 minutes)

### 2. Get Your Project Credentials

1. In your new Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
   - **anon public** key (starts with `eyJ...`)

### 3. Update Environment Variables

Edit the `.env.local` file in the root directory and replace the placeholder values:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-actual-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email Configuration (Resend API)
SMTP_PASSWORD=your_resend_api_key_here
SMTP_FROM=send@vanvelzenautorecycling.nl
```

### 4. Set Up Complete Database Schema

**IMPORTANT**: Use the migration script to ensure a clean database setup.

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy and paste the **entire contents** of `supabase/migration.sql`
3. Click **"Run"** to execute the migration script
4. This will:
   - Drop any existing tables with incorrect schema
   - Create all tables with the correct structure
   - Set up proper foreign key relationships
   - Create indexes and triggers
   - Enable Row Level Security

**Alternative**: If you want to keep existing data, use `supabase/setup.sql` instead, but you may need to manually fix any schema conflicts.

### 5. Create Admin User

1. In your Supabase dashboard, go to **Authentication** → **Users**
2. Click **"Add User"**
3. Enter:
   - **Email**: `admin@vanvelzenautorecycling.nl`
   - **Password**: `admin123`
4. Click **"Add User"**

### 6. Configure Vercel Environment Variables

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your `van-velzen-autorecycling` project
3. Go to **Settings** → **Environment Variables**
4. **Add or update** these variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-new-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_new_anon_key_here
NEXT_PUBLIC_APP_URL=https://www.vanvelzenautorecycling.nl
SMTP_PASSWORD=your_resend_api_key_here
SMTP_FROM=send@vanvelzenautorecycling.nl
```

5. Set environment to **Production** for all variables
6. Click **Save**

### 7. Redeploy and Test

1. Go to **Deployments** tab in Vercel
2. Click **"Redeploy"** on your latest deployment
3. Visit [https://www.vanvelzenautorecycling.nl/login](https://www.vanvelzenautorecycling.nl/login)
4. Log in with your admin credentials
5. Test the admin panel functionality

## Database Schema Overview

The updated database includes:

### Core Tables
- **`quote_requests`** - Public quote form submissions
- **`customers`** - Customer information and contact details
- **`vehicles`** - Vehicle details linked to customers
- **`pickups`** - Pickup scheduling and management
- **`quotes`** - Admin-generated quotes for customers

### Supporting Tables
- **`vehicle_documents`** - Document storage for vehicles
- **`activity_logs`** - Admin activity tracking and audit trail

### Features
- **Row Level Security** - Secure access control
- **Automatic timestamps** - Created/updated tracking
- **Foreign key relationships** - Data integrity
- **Indexes** - Performance optimization

## Troubleshooting

### "column customer_id does not exist" Error
- **Cause**: Database tables have an older schema that doesn't match the application
- **Solution**: Use the `supabase/migration.sql` script to recreate all tables with the correct schema

### "Failed to fetch" Error
- **Cause**: Supabase project doesn't exist or URL is incorrect
- **Solution**: Create a new Supabase project and update environment variables

### "Table does not exist" Error
- **Cause**: Database tables haven't been created
- **Solution**: Run the complete `supabase/migration.sql` script in Supabase SQL Editor

### "Invalid login credentials" Error
- **Cause**: Admin user doesn't exist or password is wrong
- **Solution**: Create the admin user in Supabase Authentication

### Admin Panel Pages Not Working
- **Cause**: Missing database tables or incorrect permissions
- **Solution**: Ensure all tables are created and RLS policies are in place

## Migration vs Setup Scripts

- **`supabase/migration.sql`**: Drops and recreates all tables (clean slate)
- **`supabase/setup.sql`**: Creates tables only if they don't exist (preserves data)

**Recommendation**: Use `migration.sql` for a fresh start, or `setup.sql` if you want to preserve existing data.

## Current Status

✅ **Database Schema**: Complete migration script with correct table structure
✅ **Error Handling**: Improved error messages and debugging
✅ **Admin Actions**: Updated to handle async Supabase client
✅ **Environment Setup**: Clear instructions for Vercel deployment
❌ **Supabase Project**: Needs to be created (current one doesn't exist)

## Next Steps

1. Create a new Supabase project following the steps above
2. Run the `supabase/migration.sql` script to set up the database correctly
3. Update environment variables in Vercel
4. Create admin user
5. Redeploy and test all admin panel functionality

Once completed, all admin panel pages including `/admin/pickups` will work properly with full CRUD functionality. 