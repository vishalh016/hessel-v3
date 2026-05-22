import json

with open('d:/Hessel-web/public/menu_extracted.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

# Unique category mapping
category_map = {
    'Beverage': 'Drinks',
    'Starter': 'Starters',
    'Main Course': 'Main Course',
    'Dessert': 'Desserts',
    'Accompaniment': 'Add-ons',
    'Late Night Counter': 'Add-ons',
    'Bread': 'Main Course'
}

sql_lines = []
sql_lines.append("-- ============================================================")
sql_lines.append("-- HESSEL — Menu Items Seeding Script (Excluding image_url Column)")
sql_lines.append("-- Run this in your Supabase SQL Editor")
sql_lines.append("-- ============================================================")
sql_lines.append("")
sql_lines.append("-- 1. Clear existing menu items to prevent duplicates")
sql_lines.append("DELETE FROM menu_items;")
sql_lines.append("")
sql_lines.append("-- 2. Insert new menu items")
sql_lines.append("INSERT INTO menu_items (category_id, name, description, price_per_plate_addon, dietary_flags, is_active, display_order) VALUES")

values_lines = []
for idx, item in enumerate(items):
    cat_name = category_map.get(item['category'], 'Add-ons')
    name = item['name'].replace("'", "''")
    
    # Dietary flags
    is_veg = item['dietary'].lower() in ['veg', 'veg/non-veg']
    dietary_flags = "ARRAY['veg']" if is_veg else "ARRAY[]::TEXT[]"
    
    # Assign pricing addons
    price_addon = 0
    name_lower = name.lower()
    if 'mutton' in name_lower or 'lamb' in name_lower:
        price_addon = 150
    elif 'prawn' in name_lower or 'chingri' in name_lower:
        price_addon = 120
    elif 'bhetki' in name_lower or 'fish' in name_lower or 'kakra' in name_lower or 'crab' in name_lower:
        price_addon = 100
    elif 'chicken' in name_lower or 'murgh' in name_lower:
        price_addon = 60
    elif 'paneer' in name_lower or 'chhanar' in name_lower or 'chanar' in name_lower:
        price_addon = 40
    
    category_subquery = f"(SELECT id FROM menu_categories WHERE name = '{cat_name}' LIMIT 1)"
    
    line = f"  ({category_subquery}, '{name}', NULL, {price_addon}, {dietary_flags}, true, {idx + 1})"
    if idx < len(items) - 1:
        line += ","
    else:
        line += ";"
    values_lines.append(line)

sql_lines.extend(values_lines)

with open('d:/Hessel-web/supabase/seed_menu_items_no_images.sql', 'w', encoding='utf-8') as f:
    f.write("\n".join(sql_lines))

print(f"Generated no-image SQL seed file with {len(items)} items at supabase/seed_menu_items_no_images.sql")
