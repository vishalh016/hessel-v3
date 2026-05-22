import pandas as pd
import json
import os

try:
    df = pd.read_excel('d:/Hessel-web/public/Menu- unshuffled.xlsx')
    print("Columns:", df.columns.tolist())
    
    images_dir = 'd:/Hessel-web/public/images/Menu'
    image_files = os.listdir(images_dir) if os.path.exists(images_dir) else []
    image_map = {os.path.splitext(f)[0].lower().strip(): f for f in image_files}
    
    print(f"Found {len(image_files)} image files in images/Menu.")
    
    records = []
    matched_images_count = 0
    
    for idx, row in df.iterrows():
        event = str(row.iloc[0]).strip()
        category_name = str(row.iloc[1]).strip()
        item_name = str(row.iloc[2]).strip()
        veg_flag = str(row.iloc[3]).strip()
        service_style = str(row.iloc[4]).strip() if len(row) > 4 else ""
        
        # Match image
        item_key = item_name.lower().strip()
        image_url = None
        if item_key in image_map:
            image_url = f"/images/Menu/{image_map[item_key]}"
            matched_images_count += 1
            
        records.append({
            "event": event,
            "category": category_name,
            "name": item_name,
            "dietary": veg_flag,
            "service_style": service_style,
            "image_url": image_url
        })
        
    print(f"Processed {len(records)} records. Matched {matched_images_count} images.")
    
    with open('d:/Hessel-web/public/menu_extracted.json', 'w', encoding='utf-8') as f:
        json.dump(records, f, indent=2, ensure_ascii=False)
        
    print("Saved extracted menu with matched images to public/menu_extracted.json!")
    
except Exception as e:
    import traceback
    print("ERROR:", e)
    traceback.print_exc()
