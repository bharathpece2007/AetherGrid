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

-- Note: To upload your CSV file quickly, you can use the Supabase web interface:
-- Go to Table Editor -> Select 'energy_logs' -> "Insert" -> "Import data from CSV"
-- Make sure the columns map perfectly to the ones above!
