const fs = require('fs');

// 1. Read environment variables from .env.local
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
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

// 2. Category mapping configuration
const categoryMap = {
  'Beverage': 'Drinks',
  'Starter': 'Starters',
  'Main Course': 'Main Course',
  'Dessert': 'Desserts',
  'Accompaniment': 'Add-ons',
  'Late Night Counter': 'Add-ons',
  'Bread': 'Main Course',
  'Live Counter': 'Add-ons'
};

async function run() {
  console.log("Starting menu seeding directly into Supabase database...");

  // 3. Fetch current menu_categories to map names to DB UUIDs
  console.log("Fetching categories from database...");
  const catRes = await fetch(`${url}/rest/v1/menu_categories?select=*`, {
    headers: {
      'apikey': serviceRoleKey,
      'Authorization': `Bearer ${serviceRoleKey}`
    }
  });

  if (!catRes.ok) {
    const errorText = await catRes.text();
    console.error("Error fetching categories:", errorText);
    process.exit(1);
  }

  const categories = await catRes.json();
  const categoryNameToId = {};
  categories.forEach(cat => {
    categoryNameToId[cat.name] = cat.id;
  });

  console.log("Found categories in database:", Object.keys(categoryNameToId));

  // 4. Read public/menu_extracted.json
  console.log("Reading public/menu_extracted.json...");
  const rawItems = JSON.parse(fs.readFileSync('public/menu_extracted.json', 'utf-8'));
  console.log(`Loaded ${rawItems.length} items from JSON.`);

  // 5. Clear existing menu items
  console.log("Clearing existing menu items in database...");
  const deleteRes = await fetch(`${url}/rest/v1/menu_items?is_active=eq.true`, {
    method: 'DELETE',
    headers: {
      'apikey': serviceRoleKey,
      'Authorization': `Bearer ${serviceRoleKey}`
    }
  });

  if (!deleteRes.ok) {
    const errText = await deleteRes.text();
    console.warn("Could not delete existing items (might be empty or RLS restricted):", errText);
  } else {
    console.log("Cleared existing menu items successfully.");
  }

  // 6. Process items and map to DB columns
  const menuItemsToInsert = rawItems.map((item, idx) => {
    let mappedCategoryName = categoryMap[item.dish_group] || 'Add-ons';
    
    // Smart override: check if it's a beverage and put it under 'Drinks' category
    const nameLower = item.item_name.toLowerCase();
    const isDrink = nameLower.includes('shorbot') || 
                    nameLower.includes('lemonade') || 
                    nameLower.includes('jaljeera') || 
                    nameLower.includes('tea') || 
                    nameLower.includes('coffee') || 
                    nameLower.includes('mocktail') || 
                    nameLower.includes('beverage') ||
                    nameLower.includes('juice') ||
                    nameLower.includes('shake') ||
                    nameLower.includes('lassi') ||
                    nameLower.includes('gondhoraj ghol') ||
                    nameLower.includes('ghol');
                    
    if (isDrink) {
      mappedCategoryName = 'Drinks';
    }

    const categoryId = categoryNameToId[mappedCategoryName];

    if (!categoryId) {
      console.warn(`Warning: Category ID not found for mapped name '${mappedCategoryName}' (original: '${item.dish_group}')`);
    }

    // Determine dietary flags and rich tags
    const dietary_flags = [];
    const dietaryLower = item.flag ? item.flag.toLowerCase() : '';
    if (dietaryLower === 'veg') {
      dietary_flags.push('veg');
    } else if (dietaryLower === 'non-veg') {
      dietary_flags.push('non-veg');
    } else if (dietaryLower === 'veg/non-veg') {
      dietary_flags.push('veg', 'non-veg', 'mixed');
    }

    // Append course category tag (strict and clean, avoiding events / service styles)
    const courseSlugs = {
      'Starters': 'starter',
      'Main Course': 'main-course',
      'Desserts': 'desserts',
      'Drinks': 'drinks',
      'Add-ons': 'add-ons'
    };
    const categoryTag = courseSlugs[mappedCategoryName] || 'add-ons';
    dietary_flags.push(categoryTag);

    // Create rich description
    const description = `A premium ${item.flag} ${item.dish_group.toLowerCase()} curated by Hessel's master culinary team.`;

    // Assign pricing addons (keep the amount section in db)
    let price_per_plate_addon = 0;
    if (nameLower.includes('mutton') || nameLower.includes('lamb')) {
      price_per_plate_addon = 150;
    } else if (nameLower.includes('prawn') || nameLower.includes('chingri')) {
      price_per_plate_addon = 120;
    } else if (nameLower.includes('bhetki') || nameLower.includes('fish') || nameLower.includes('kakra') || nameLower.includes('crab')) {
      price_per_plate_addon = 100;
    } else if (nameLower.includes('chicken') || nameLower.includes('murgh')) {
      price_per_plate_addon = 60;
    } else if (nameLower.includes('paneer') || nameLower.includes('chhanar') || nameLower.includes('chanar')) {
      price_per_plate_addon = 40;
    }

    return {
      category_id: categoryId,
      name: item.item_name,
      description,
      price_per_plate_addon,
      dietary_flags,
      is_active: true,
      display_order: idx + 1
    };
  });

  // 7. Bulk Insert using PostgREST API
  console.log(`Inserting ${menuItemsToInsert.length} menu items into Supabase...`);
  
  // PostgREST handles bulk insert in a single request with an array of objects
  const insertRes = await fetch(`${url}/rest/v1/menu_items`, {
    method: 'POST',
    headers: {
      'apikey': serviceRoleKey,
      'Authorization': `Bearer ${serviceRoleKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    },
    body: JSON.stringify(menuItemsToInsert)
  });

  if (!insertRes.ok) {
    const errorText = await insertRes.text();
    console.error("Error inserting menu items:", errorText);
    process.exit(1);
  }

  const inserted = await insertRes.json();
  console.log(`Successfully seeded ${inserted.length} menu items in Supabase database! 🎉`);
}

run().catch(err => {
  console.error("Seeding failed with error:", err);
});
