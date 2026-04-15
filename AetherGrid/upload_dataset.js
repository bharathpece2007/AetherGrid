import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your_supabase')) {
  console.error('ERROR: Please fill in your real VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the .env file first!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const csvFilePath = './Power_Consumption_and_Generation_Dataset.csv';

async function uploadData() {
  console.log('Reading CSV file...');
  const fileContent = fs.readFileSync(csvFilePath, 'utf8');
  
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  console.log(`Found ${records.length} records. Mapping columns...`);

  const formattedRecords = records.map(r => ({
    timestamp: r['Timestamp'],
    usage_kw: parseFloat(r['Real-time Power Usage (kW)']),
    peak_demand_kw: parseFloat(r['Peak Demand (kW)']),
    load_factor: parseFloat(r['Load Factor (%)']),
    voltage_v: parseFloat(r['Voltage Fluctuations (V)']),
    current_a: parseFloat(r['Current Load (A)']),
    power_factor: parseFloat(r['Power Factor']),
    reactive_power: parseFloat(r['Reactive Power (kVAR)']),
    energy_consumption_kwh: parseFloat(r['Energy Consumption per Hour (kWh)']),
    seasonal_variability: r['Seasonal Load Variability'],
    generation_kw: parseFloat(r['Real-time Power Generation (kW)']),
    renewable_contribution: parseFloat(r['Renewable Energy Contribution (%)']),
    battery_level: parseFloat(r['Battery Storage Level (%)']),
    grid_frequency_hz: parseFloat(r['Grid Frequency (Hz)']),
    solar_radiation: parseFloat(r['Solar Radiation (W/mA)']),
    wind_speed: parseFloat(r['Wind Speed (m/s)']),
    fuel_consumption: parseFloat(r['Fuel Consumption Rate (L/h or kg/h)']),
    carbon_emissions: parseFloat(r['Carbon Emissions (gCO,,/kWh)']),
    forecast_accuracy: parseFloat(r['Generation Forecast Accuracy (%)']),
    stability_status: parseInt(r['Power_Stability_Status'])
  }));

  console.log('Uploading to Supabase (table: energy_logs)...');

  // Upload in chunks of 500 to avoid request size limits
  const chunkSize = 500;
  for (let i = 0; i < formattedRecords.length; i += chunkSize) {
    const chunk = formattedRecords.slice(i, i + chunkSize);
    const { error } = await supabase.from('energy_logs').insert(chunk);
    
    if (error) {
      console.error(`Error uploading chunk starting at index ${i}:`, error.message);
    } else {
      console.log(`Successfully uploaded records ${i} to ${Math.min(i + chunkSize, formattedRecords.length)}`);
    }
  }

  console.log('Done!');
}

uploadData();
