require("dotenv").config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jmxgirtdenxnzhjsdrfu.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = { supabase };