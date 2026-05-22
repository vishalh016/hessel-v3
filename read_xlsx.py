import pandas as pd
import json

try:
    df = pd.read_excel('d:/Hessel-web/public/Menu- Sorted.xlsx')
    print("Columns in Excel:", df.columns.tolist())
    print("Sample rows:")
    print(df.head(5).to_string())
    print("Total rows:", len(df))
    
    # Save parsed data to JSON
    # Column 0: Dish Group, Column 1: Item Name, Column 2: Flag (veg, non-veg)
    # We should make sure we handle column names correctly even if they are slightly different
    records = []
    for idx, row in df.iterrows():
        records.append({
            "dish_group": str(row.iloc[0]).strip(),
            "item_name": str(row.iloc[1]).strip(),
            "flag": str(row.iloc[2]).strip()
        })
        
    with open('d:/Hessel-web/public/menu_extracted.json', 'w', encoding='utf-8') as f:
        json.dump(records, f, indent=2, ensure_ascii=False)
    print("Successfully extracted menu to public/menu_extracted.json!")
except Exception as e:
    import traceback
    print("ERROR:", e)
    traceback.print_exc()
