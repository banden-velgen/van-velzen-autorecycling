-- Create quote_requests table
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

-- Create RLS policies
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all quote requests
CREATE POLICY "Allow authenticated users to read quote_requests"
  ON quote_requests
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert quote requests
CREATE POLICY "Allow authenticated users to insert quote_requests"
  ON quote_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update quote requests
CREATE POLICY "Allow authenticated users to update quote_requests"
  ON quote_requests
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow anonymous users to insert quote requests (for the public form)
CREATE POLICY "Allow anonymous users to insert quote_requests"
  ON quote_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at timestamp
CREATE TRIGGER update_quote_requests_updated_at
BEFORE UPDATE ON quote_requests
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

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

-- Enable RLS for customers table
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all customers
CREATE POLICY "Allow authenticated users to read customers"
  ON customers
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert customers
CREATE POLICY "Allow authenticated users to insert customers"
  ON customers
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update customers
CREATE POLICY "Allow authenticated users to update customers"
  ON customers
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete customers
CREATE POLICY "Allow authenticated users to delete customers"
  ON customers
  FOR DELETE
  TO authenticated
  USING (true);

-- Create trigger to update updated_at timestamp for customers
CREATE TRIGGER update_customers_updated_at
BEFORE UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create file_metadata table
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

-- Enable RLS for file_metadata table
ALTER TABLE file_metadata ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all file_metadata
CREATE POLICY "Allow authenticated users to read file_metadata"
  ON file_metadata
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert file_metadata
CREATE POLICY "Allow authenticated users to insert file_metadata"
  ON file_metadata
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update file_metadata
CREATE POLICY "Allow authenticated users to update file_metadata"
  ON file_metadata
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete file_metadata
CREATE POLICY "Allow authenticated users to delete file_metadata"
  ON file_metadata
  FOR DELETE
  TO authenticated
  USING (true);

-- Create trigger to update updated_at timestamp for file_metadata
CREATE TRIGGER update_file_metadata_updated_at
BEFORE UPDATE ON file_metadata
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
