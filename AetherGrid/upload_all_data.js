import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import { parse } from 'csv-parse/sync';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your_supabase')) {
  console.error('ERROR: Please fill in your real VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in the .env file first!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadLog(filePath, tableName, mapper) {
    console.log(`Reading ${filePath}...`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const records = parse(fileContent, { columns: true, skip_empty_lines: true });
    
    console.log(`Found ${records.length} records in ${filePath}. Mapping...`);
    const formatted = records.map(mapper);

    const chunkSize = 500;
    for (let i = 0; i < formatted.length; i += chunkSize) {
        const chunk = formatted.slice(i, i + chunkSize);
        const { error } = await supabase.from(tableName).insert(chunk);
        if (error) {
            console.error(`Error in ${tableName} at index ${i}:`, error.message);
        } else {
            console.log(`Uploaded ${i} to ${Math.min(i + chunkSize, formatted.length)} of ${tableName}`);
        }
    }
}

async function run() {
    // 1. Upload Energy Logs (Grid Electricity Data)
    await uploadLog('./Power_Consumption_and_Generation_Dataset.csv', 'energy_logs', r => ({
        timestamp: r['Timestamp'],
        usage_kw: parseFloat(r['Real-time Power Usage (kW)']),
        generation_kw: parseFloat(r['Real-time Power Generation (kW)']),
        grid_frequency_hz: parseFloat(r['Grid Frequency (Hz)']),
        stability_status: parseInt(r['Power_Stability_Status'])
    }));

    // 2. Upload Solar Logs
    await uploadLog('./solar data.csv', 'solar_logs', r => ({
        module_temp: parseFloat(r['MODULE_TEMP']),
        amb_temp: parseFloat(r['Amb_Temp']),
        wind_speed: parseFloat(r['WIND_Speed']),
        irradiation: parseFloat(r['IRR (W/m2)']),
        dc_current: parseFloat(r['DC Current in Amps']),
        ac_power: parseFloat(r['AC Power in Watts'])
    }));

    console.log('Sync Complete!');
}

run();
