
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hpyvnhxabkbzogmxjzjj.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhweXZuaHhhYmtiem9nbXhqempqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0MzE5ODUsImV4cCI6MjA1MDAwNzk4NX0.-hyjeSiW_R9xyTHwHKIgAA-SU-sUkli6IglW0pvSA5M"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase