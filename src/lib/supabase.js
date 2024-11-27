// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

// Supabase 프로젝트의 URL과 익명 API 키를 환경 변수에서 가져옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key must be set in environment variables.');
}
// Supabase 클라이언트를 생성합니다.
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
