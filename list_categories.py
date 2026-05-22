import pandas as pd
df = pd.read_excel('d:/Hessel-web/public/Menu- unshuffled.xlsx')
print("Unique Types in Excel:", df['Type'].unique().tolist())
print("Unique Veg/Non-Veg in Excel:", df['Veg/Non-Veg'].unique().tolist())
