-- Enable the UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the quote_requests table
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

-- Create customers table
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

-- Create vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  license_plate TEXT NOT NULL UNIQUE,
  make TEXT,
  model TEXT,
  year INTEGER,
  color TEXT,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pickups table
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

-- Create vehicle_documents table
CREATE TABLE IF NOT EXISTS vehicle_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create quotes table (for admin-generated quotes)
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_vehicles_license_plate ON vehicles(license_plate);
CREATE INDEX IF NOT EXISTS idx_vehicles_customer_id ON vehicles(customer_id);
CREATE INDEX IF NOT EXISTS idx_pickups_vehicle_id ON pickups(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_pickups_customer_id ON pickups(customer_id);
CREATE INDEX IF NOT EXISTS idx_pickups_scheduled_date ON pickups(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_pickups_status ON pickups(status);
CREATE INDEX IF NOT EXISTS idx_activity_logs_entity_type ON activity_logs(entity_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created_at ON activity_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotes_vehicle_id ON quotes(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_quotes_status ON quotes(status);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to automatically update the updated_at column
DROP TRIGGER IF EXISTS update_quote_requests_updated_at ON quote_requests;
CREATE TRIGGER update_quote_requests_updated_at
BEFORE UPDATE ON quote_requests
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_customers_updated_at ON customers;
CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_vehicles_updated_at ON vehicles;
CREATE TRIGGER update_vehicles_updated_at
BEFORE UPDATE ON vehicles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_pickups_updated_at ON pickups;
CREATE TRIGGER update_pickups_updated_at
BEFORE UPDATE ON pickups
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_quotes_updated_at ON quotes;
CREATE TRIGGER update_quotes_updated_at
BEFORE UPDATE ON quotes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security on all tables
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pickups ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Create policies for Row Level Security
-- Quote requests policies
DROP POLICY IF EXISTS "Allow authenticated users to read quote_requests" ON quote_requests;
CREATE POLICY "Allow authenticated users to read quote_requests"
  ON quote_requests
  FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow authenticated users to insert quote_requests" ON quote_requests;
CREATE POLICY "Allow authenticated users to insert quote_requests"
  ON quote_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated users to update quote_requests" ON quote_requests;
CREATE POLICY "Allow authenticated users to update quote_requests"
  ON quote_requests
  FOR UPDATE
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow anonymous users to insert quote_requests" ON quote_requests;
CREATE POLICY "Allow anonymous users to insert quote_requests"
  ON quote_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Customers policies
DROP POLICY IF EXISTS "Allow authenticated users to manage customers" ON customers;
CREATE POLICY "Allow authenticated users to manage customers"
  ON customers
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Vehicles policies
DROP POLICY IF EXISTS "Allow authenticated users to manage vehicles" ON vehicles;
CREATE POLICY "Allow authenticated users to manage vehicles"
  ON vehicles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Pickups policies
DROP POLICY IF EXISTS "Allow authenticated users to manage pickups" ON pickups;
CREATE POLICY "Allow authenticated users to manage pickups"
  ON pickups
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Vehicle documents policies
DROP POLICY IF EXISTS "Allow authenticated users to manage vehicle_documents" ON vehicle_documents;
CREATE POLICY "Allow authenticated users to manage vehicle_documents"
  ON vehicle_documents
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Activity logs policies
DROP POLICY IF EXISTS "Allow authenticated users to manage activity_logs" ON activity_logs;
CREATE POLICY "Allow authenticated users to manage activity_logs"
  ON activity_logs
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Quotes policies
DROP POLICY IF EXISTS "Allow authenticated users to manage quotes" ON quotes;
CREATE POLICY "Allow authenticated users to manage quotes"
  ON quotes
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
