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

-- RDW vrijwaringen indexes
CREATE INDEX IF NOT EXISTS idx_rdw_vrijwaringen_vehicle_id ON rdw_vrijwaringen(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_rdw_vrijwaringen_number ON rdw_vrijwaringen(vrijwaring_number);
CREATE INDEX IF NOT EXISTS idx_rdw_vrijwaringen_status ON rdw_vrijwaringen(status);

-- Payments indexes
CREATE INDEX IF NOT EXISTS idx_payments_quote_id ON payments(quote_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_date ON payments(payment_date);

-- Document indexes
CREATE INDEX IF NOT EXISTS idx_vehicle_documents_vehicle_id ON vehicle_documents(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_documents_type ON vehicle_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_storage_items_entity ON storage_items(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_file_metadata_entity ON file_metadata(entity_type, entity_id);

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

CREATE TRIGGER update_rdw_vrijwaringen_updated_at
  BEFORE UPDATE ON rdw_vrijwaringen
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_storage_items_updated_at
  BEFORE UPDATE ON storage_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_file_metadata_updated_at
  BEFORE UPDATE ON file_metadata
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
ALTER TABLE inventory_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE recycling ENABLE ROW LEVEL SECURITY;
ALTER TABLE rdw_vrijwaringen ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_metadata ENABLE ROW LEVEL SECURITY;
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

-- Inventory categories policies
CREATE POLICY "Allow authenticated users to manage inventory_categories"
  ON inventory_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Inventory items policies
CREATE POLICY "Allow authenticated users to manage inventory_items"
  ON inventory_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Recycling policies
CREATE POLICY "Allow authenticated users to manage recycling"
  ON recycling FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- RDW vrijwaringen policies
CREATE POLICY "Allow authenticated users to manage rdw_vrijwaringen"
  ON rdw_vrijwaringen FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Payments policies
CREATE POLICY "Allow authenticated users to manage payments"
  ON payments FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Vehicle documents policies
CREATE POLICY "Allow authenticated users to manage vehicle_documents"
  ON vehicle_documents FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Storage items policies
CREATE POLICY "Allow authenticated users to manage storage_items"
  ON storage_items FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- File metadata policies
CREATE POLICY "Allow authenticated users to manage file_metadata"
  ON file_metadata FOR ALL TO authenticated USING (true) WITH CHECK (true);

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

-- =====================================================
-- COMMENTS
-- =====================================================

COMMENT ON TABLE quote_requests IS 'Quote requests from the public website';
COMMENT ON TABLE customers IS 'Customer information and contact details';
COMMENT ON TABLE vehicles IS 'Vehicle information linked to customers';
COMMENT ON TABLE pickups IS 'Pickup scheduling and management';
COMMENT ON TABLE quotes IS 'Admin-generated quotes for customers';
COMMENT ON TABLE inventory_categories IS 'Categories for inventory items';
COMMENT ON TABLE inventory_items IS 'Inventory items for sale';
COMMENT ON TABLE recycling IS 'Vehicle recycling records';
COMMENT ON TABLE rdw_vrijwaringen IS 'RDW deregistration certificates';
COMMENT ON TABLE payments IS 'Payment records for quotes';
COMMENT ON TABLE vehicle_documents IS 'Documents linked to vehicles';
COMMENT ON TABLE storage_items IS 'General file storage items';
COMMENT ON TABLE file_metadata IS 'File metadata for general file management';
COMMENT ON TABLE activity_logs IS 'Audit trail for admin activities';

-- =====================================================
-- END OF SCHEMA
-- ===================================================== 