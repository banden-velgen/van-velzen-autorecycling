-- =====================================================
-- Van Velzen Autorecycling - Complete Database Schema
-- =====================================================
-- This file contains all necessary tables, indexes, triggers, and policies
-- for the complete Van Velzen Autorecycling application

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- CORE TABLES
-- =====================================================

-- Quote requests from public website
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
);

-- Customers table
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
);

-- Vehicles table
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
);

-- Pickups table
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
);

-- Quotes table (admin-generated quotes)
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
);

-- =====================================================
-- USER MANAGEMENT
-- =====================================================

-- Admin users table
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
);

-- =====================================================
-- INVENTORY SYSTEM
-- =====================================================

-- Inventory categories
CREATE TABLE IF NOT EXISTS inventory_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inventory items
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
);

-- =====================================================
-- RECYCLING SYSTEM
-- =====================================================

-- Recycling records
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
);

-- Recycling records (alternative table)
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
);

-- RDW vrijwaringen (deregistration certificates)
CREATE TABLE IF NOT EXISTS rdw_vrijwaringen (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
  vrijwaring_number TEXT UNIQUE,
  issue_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vrijwaringen (alternative table)
CREATE TABLE IF NOT EXISTS vrijwaringen (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
  vrijwaring_number TEXT UNIQUE,
  issue_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'active',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- PAYMENT SYSTEM
-- =====================================================

-- Payments table
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
);

-- =====================================================
-- FILE STORAGE SYSTEM
-- =====================================================

-- Files table (general files)
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
);

-- Vehicle documents
CREATE TABLE IF NOT EXISTS vehicle_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Storage items (general file storage)
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
);

-- Storage categories
CREATE TABLE IF NOT EXISTS storage_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Storage table (general storage)
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
);

-- File metadata (for general file management)
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
);

-- =====================================================
-- NOTIFICATION SYSTEM
-- =====================================================

-- Notification preferences
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
);

-- Notification logs
CREATE TABLE IF NOT EXISTS notification_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  notification_type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'sent',
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- AUDIT AND LOGGING
-- =====================================================

-- Activity logs
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Quote requests indexes
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_email ON quote_requests(email);

-- Customers indexes
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);
CREATE INDEX IF NOT EXISTS idx_customers_phone ON customers(phone);
CREATE INDEX IF NOT EXISTS idx_customers_city ON customers(city);

-- Vehicles indexes
CREATE INDEX IF NOT EXISTS idx_vehicles_license_plate ON vehicles(license_plate);
CREATE INDEX IF NOT EXISTS idx_vehicles_customer_id ON vehicles(customer_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);
CREATE INDEX IF NOT EXISTS idx_vehicles_brand_model ON vehicles(brand, model);

-- Pickups indexes
CREATE INDEX IF NOT EXISTS idx_pickups_vehicle_id ON pickups(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_pickups_customer_id ON pickups(customer_id);
CREATE INDEX IF NOT EXISTS idx_pickups_scheduled_date ON pickups(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_pickups_status ON pickups(status);
CREATE INDEX IF NOT EXISTS idx_pickups_city ON pickups(city);

-- Quotes indexes
CREATE INDEX IF NOT EXISTS idx_quotes_vehicle_id ON quotes(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_quotes_customer_id ON quotes(customer_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);
CREATE INDEX IF NOT EXISTS idx_quotes_valid_until ON quotes(valid_until);

-- Admin users indexes
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);
CREATE INDEX IF NOT EXISTS idx_admin_users_is_active ON admin_users(is_active);

-- Inventory indexes
CREATE INDEX IF NOT EXISTS idx_inventory_items_category_id ON inventory_items(category_id);
CREATE INDEX IF NOT EXISTS idx_inventory_items_vehicle_id ON inventory_items(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_inventory_items_sku ON inventory_items(sku);
CREATE INDEX IF NOT EXISTS idx_inventory_items_is_active ON inventory_items(is_active);

-- Recycling indexes
CREATE INDEX IF NOT EXISTS idx_recycling_vehicle_id ON recycling(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_recycling_customer_id ON recycling(customer_id);
CREATE INDEX IF NOT EXISTS idx_recycling_status ON recycling(status);
CREATE INDEX IF NOT EXISTS idx_recycling_date ON recycling(recycling_date);

CREATE INDEX IF NOT EXISTS idx_recycling_records_vehicle_id ON recycling_records(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_recycling_records_customer_id ON recycling_records(customer_id);
CREATE INDEX IF NOT EXISTS idx_recycling_records_status ON recycling_records(status);
CREATE INDEX IF NOT EXISTS idx_recycling_records_date ON recycling_records(recycling_date);

-- RDW vrijwaringen indexes
CREATE INDEX IF NOT EXISTS idx_rdw_vrijwaringen_vehicle_id ON rdw_vrijwaringen(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_rdw_vrijwaringen_number ON rdw_vrijwaringen(vrijwaring_number);
CREATE INDEX IF NOT EXISTS idx_rdw_vrijwaringen_status ON rdw_vrijwaringen(status);

CREATE INDEX IF NOT EXISTS idx_vrijwaringen_vehicle_id ON vrijwaringen(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_vrijwaringen_number ON vrijwaringen(vrijwaring_number);
CREATE INDEX IF NOT EXISTS idx_vrijwaringen_status ON vrijwaringen(status);

-- Payments indexes
CREATE INDEX IF NOT EXISTS idx_payments_quote_id ON payments(quote_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(payment_date);

-- Files indexes
CREATE INDEX IF NOT EXISTS idx_files_entity ON files(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_files_uploaded_by ON files(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_files_type ON files(file_type);

-- Document indexes
CREATE INDEX IF NOT EXISTS idx_vehicle_documents_vehicle_id ON vehicle_documents(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_documents_type ON vehicle_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_storage_items_entity ON storage_items(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_file_metadata_entity ON file_metadata(entity_type, entity_id);

-- Storage indexes
CREATE INDEX IF NOT EXISTS idx_storage_entity ON storage(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_storage_category_id ON storage(category_id);
CREATE INDEX IF NOT EXISTS idx_storage_type ON storage(file_type);

-- Notification indexes
CREATE INDEX IF NOT EXISTS idx_notification_preferences_user_id ON notification_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_preferences_type ON notification_preferences(notification_type);
CREATE INDEX IF NOT EXISTS idx_notification_logs_user_id ON notification_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_notification_logs_type ON notification_logs(notification_type);
CREATE INDEX IF NOT EXISTS idx_notification_logs_sent_at ON notification_logs(sent_at);

-- Activity logs indexes
CREATE INDEX IF NOT EXISTS idx_activity_logs_entity_type ON activity_logs(entity_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_id ON activity_logs(user_id);

-- =====================================================
-- TRIGGERS AND FUNCTIONS
-- =====================================================

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for all tables with updated_at columns
CREATE TRIGGER update_quote_requests_updated_at
  BEFORE UPDATE ON quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON vehicles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pickups_updated_at
  BEFORE UPDATE ON pickups
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quotes_updated_at
  BEFORE UPDATE ON quotes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_categories_updated_at
  BEFORE UPDATE ON inventory_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_items_updated_at
  BEFORE UPDATE ON inventory_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recycling_updated_at
  BEFORE UPDATE ON recycling
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_recycling_records_updated_at
  BEFORE UPDATE ON recycling_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rdw_vrijwaringen_updated_at
  BEFORE UPDATE ON rdw_vrijwaringen
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vrijwaringen_updated_at
  BEFORE UPDATE ON vrijwaringen
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_files_updated_at
  BEFORE UPDATE ON files
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_storage_items_updated_at
  BEFORE UPDATE ON storage_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_storage_categories_updated_at
  BEFORE UPDATE ON storage_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_storage_updated_at
  BEFORE UPDATE ON storage
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_file_metadata_updated_at
  BEFORE UPDATE ON file_metadata
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notification_preferences_updated_at
  BEFORE UPDATE ON notification_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pickups ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE recycling ENABLE ROW LEVEL SECURITY;
ALTER TABLE recycling_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE rdw_vrijwaringen ENABLE ROW LEVEL SECURITY;
ALTER TABLE vrijwaringen ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- RLS POLICIES
-- =====================================================

-- Quote requests policies
CREATE POLICY "Allow authenticated users to read quote_requests"
  ON quote_requests FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated users to insert quote_requests"
  ON quote_requests FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update quote_requests"
  ON quote_requests FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow anonymous users to insert quote_requests"
  ON quote_requests FOR INSERT TO anon WITH CHECK (true);

-- Customers policies
CREATE POLICY "Allow authenticated users to manage customers"
  ON customers FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Vehicles policies
CREATE POLICY "Allow authenticated users to manage vehicles"
  ON vehicles FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Pickups policies
CREATE POLICY "Allow authenticated users to manage pickups"
  ON pickups FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Quotes policies
CREATE POLICY "Allow authenticated users to manage quotes"
  ON quotes FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Admin users policies
CREATE POLICY "Allow authenticated users to manage admin_users"
  ON admin_users FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Inventory categories policies
CREATE POLICY "Allow authenticated users to manage inventory_categories"
  ON inventory_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Inventory items policies
CREATE POLICY "Allow authenticated users to manage inventory_items"
  ON inventory_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Recycling policies
CREATE POLICY "Allow authenticated users to manage recycling"
  ON recycling FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage recycling_records"
  ON recycling_records FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- RDW vrijwaringen policies
CREATE POLICY "Allow authenticated users to manage rdw_vrijwaringen"
  ON rdw_vrijwaringen FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated users to manage vrijwaringen"
  ON vrijwaringen FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Payments policies
CREATE POLICY "Allow authenticated users to manage payments"
  ON payments FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Files policies
CREATE POLICY "Allow authenticated users to manage files"
  ON files FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Vehicle documents policies
CREATE POLICY "Allow authenticated users to manage vehicle_documents"
  ON vehicle_documents FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Storage items policies
CREATE POLICY "Allow authenticated users to manage storage_items"
  ON storage_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Storage categories policies
CREATE POLICY "Allow authenticated users to manage storage_categories"
  ON storage_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Storage policies
CREATE POLICY "Allow authenticated users to manage storage"
  ON storage FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- File metadata policies
CREATE POLICY "Allow authenticated users to manage file_metadata"
  ON file_metadata FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Notification preferences policies
CREATE POLICY "Allow authenticated users to manage notification_preferences"
  ON notification_preferences FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Notification logs policies
CREATE POLICY "Allow authenticated users to manage notification_logs"
  ON notification_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Activity logs policies
CREATE POLICY "Allow authenticated users to manage activity_logs"
  ON activity_logs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- =====================================================
-- SAMPLE DATA (OPTIONAL)
-- =====================================================

-- Insert sample inventory categories
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
ON CONFLICT (name) DO NOTHING;

-- Insert sample storage categories
INSERT INTO storage_categories (name, description) VALUES
  ('Documents', 'Document files and paperwork'),
  ('Images', 'Image files and photos'),
  ('Videos', 'Video files and recordings'),
  ('Archives', 'Compressed and archive files'),
  ('Templates', 'Template files and forms')
ON CONFLICT (name) DO NOTHING;

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (email, password_hash, name, role) VALUES
  ('admin@vanvelzenautorecycling.nl', crypt('admin123', gen_salt('bf')), 'Administrator', 'admin')
ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE quote_requests IS 'Quote requests from the public website';
COMMENT ON TABLE customers IS 'Customer information and contact details';
COMMENT ON TABLE vehicles IS 'Vehicle information linked to customers';
COMMENT ON TABLE pickups IS 'Pickup scheduling and management';
COMMENT ON TABLE quotes IS 'Admin-generated quotes for customers';
COMMENT ON TABLE admin_users IS 'Admin user accounts and authentication';
COMMENT ON TABLE inventory_categories IS 'Categories for inventory items';
COMMENT ON TABLE inventory_items IS 'Inventory items for sale';
COMMENT ON TABLE recycling IS 'Vehicle recycling records';
COMMENT ON TABLE recycling_records IS 'Alternative vehicle recycling records';
COMMENT ON TABLE rdw_vrijwaringen IS 'RDW deregistration certificates';
COMMENT ON TABLE vrijwaringen IS 'Alternative deregistration certificates';
COMMENT ON TABLE payments IS 'Payment records for quotes';
COMMENT ON TABLE files IS 'General file storage';
COMMENT ON TABLE vehicle_documents IS 'Documents linked to vehicles';
COMMENT ON TABLE storage_items IS 'General file storage items';
COMMENT ON TABLE storage_categories IS 'Categories for storage items';
COMMENT ON TABLE storage IS 'General storage system';
COMMENT ON TABLE file_metadata IS 'File metadata for general file management';
COMMENT ON TABLE notification_preferences IS 'User notification preferences';
COMMENT ON TABLE notification_logs IS 'Notification delivery logs';
COMMENT ON TABLE activity_logs IS 'Audit trail for admin activities';

-- =====================================================
-- END OF SCHEMA
-- ===================================================== 