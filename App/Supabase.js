
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://kwbstcfzkmdyvrpmixgz.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3YnN0Y2Z6a21keXZycG1peGd6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NzkxNjEsImV4cCI6MjA1MDA1NTE2MX0.Q_DUYfD5pnXlEkTPHFB2r4xctLspZKqZG-C9MDVy2Ec'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
