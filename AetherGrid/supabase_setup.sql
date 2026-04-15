-- Paste this entire block into the SQL Editor in Supabase to create your tables

-- 1. Create the Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert the default mock users you requested
INSERT INTO users (username, password, role) VALUES 
('1', '1', 'user'),
('2', '2', 'admin')
ON CONFLICT (username) DO NOTHING;

-- 2. Create the Grid Node Dataset table
CREATE TABLE IF NOT EXISTS energy_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMP WITH TIME ZONE,
    usage_kw FLOAT,
    peak_demand_kw FLOAT,
    load_factor FLOAT,
    voltage_v FLOAT,
    current_a FLOAT,
    power_factor FLOAT,
    reactive_power FLOAT,
    energy_consumption_kwh FLOAT,
    seasonal_variability TEXT,
    generation_kw FLOAT,
    renewable_contribution FLOAT,
    battery_level FLOAT,
    grid_frequency_hz FLOAT,
    solar_radiation FLOAT,
    wind_speed FLOAT,
    fuel_consumption FLOAT,
    carbon_emissions FLOAT,
    forecast_accuracy FLOAT,
    stability_status INTEGER
);

-- 3. Create Solar Data table
CREATE TABLE IF NOT EXISTS solar_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_temp FLOAT,
    amb_temp FLOAT,
    wind_speed FLOAT,
    irradiation FLOAT,
    dc_current FLOAT,
    ac_power FLOAT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create DER Registry table
CREATE TABLE IF NOT EXISTS der_registry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    node_id TEXT UNIQUE,
    zone TEXT,
    capacity TEXT,
    load_kw TEXT,
    status TEXT,
    region TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial DER nodes
INSERT INTO der_registry (node_id, zone, capacity, load_kw, status, region) VALUES
('ND-0842', 'Mysuru North', '150kW', '122kW', 'Online', 'Sector 4'),
('ND-2219', 'Hebbal Sub.', '450kW', '410kW', 'Stressed', 'Sector 2'),
('ND-1104', 'Chamundi Hills', '80kW', '12kW', 'Online', 'Sector 9'),
('ND-5582', 'Siddhartha Lyut', '210kW', '185kW', 'Warning', 'Sector 5')
ON CONFLICT (node_id) DO NOTHING;

-- Note: You should now run 'node upload_all_data.js' to populate these tables from your CSVs.
