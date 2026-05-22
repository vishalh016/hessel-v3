const fs = require('fs');

const envContent = fs.readFileSync('.env.local', 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/);
  if (match) {
    let val = match[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    } else if (val.startsWith("'") && val.endsWith("'")) {
      val = val.slice(1, -1);
    }
    env[match[1]] = val;
  }
});

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function queryTable(tableName) {
  const res = await fetch(`${url}/rest/v1/${tableName}?select=*`, {
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`
    }
  });
  if (!res.ok) {
    const text = await res.text();
    console.error(`Error querying ${tableName}:`, text);
    return [];
  }
  return await res.json();
}

async function run() {
  const packages = await queryTable('packages');
  const categories = await queryTable('menu_categories');
  const items = await queryTable('menu_items');

  console.log('Packages:', packages.length, packages.map(p => p.name));
  console.log('Categories:', categories.length, categories.map(c => c.name));
  console.log('Items Count:', items.length);
  console.log('Sample Items:', JSON.stringify(items.slice(0, 3), null, 2));
}

run();

