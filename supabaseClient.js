const SUPABASE_URL = 'https://fiolyigngsvgtjkypfaz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpb2x5aWduZ3N2Z3Rqa3lwZmF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMzM4MjUsImV4cCI6MjA2NTcwOTgyNX0.GrNKZcZ155KLxOe1MSPoWMxDpH21TzLLqJk8fY-lIEk';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
(async () => {
  const { data: users, error } = await supabase.auth.getUser();
  if (error) console.error('Supabase user fetch error', error);
  else console.log('Logged in user data', users);
})();
