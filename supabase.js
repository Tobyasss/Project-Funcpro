import { createClient } from '@supabase/supabase-js';
 // Gantilah dengan URL dan KEY dari proyek Supabase-mu
 const supabaseUrl = 'https://cguhrsbelfkjggjievtx.supabase.co';
 const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNndWhyc2JlbGZramdnamlldnR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4ODg4NjQsImV4cCI6MjA0OTQ2NDg2NH0.liJhtOBLlqQfIa2H4yor97e61N0lAGNRPg2NHuI0Et8';
 const supabase = createClient(supabaseUrl, supabaseKey);