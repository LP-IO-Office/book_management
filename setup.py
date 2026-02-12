import pandas as pd
import psycopg2
from psycopg2.extras import execute_batch
import random

# -----------------------------
# Database configuration
# -----------------------------
DB_CONFIG = {
    "host": "localhost",
    "port": 5432,
    "dbname": "library",
    "user": "postgres",
    "password": "12345"
}

CSV_FILE = "books.csv"
BATCH_SIZE = 5000  # safe for large imports

# -----------------------------
# Connect to PostgreSQL and create table 
# -----------------------------
conn = psycopg2.connect(**DB_CONFIG)
cursor = conn.cursor()
cursor.execute("SELECT current_database()")
db_name = cursor.fetchone()[0]
cursor.execute("""
               create table if not exists books(    
               id serial primary key, 
               title text not null, 
               author text not null,
               description text,
               rating int check (rating between 1 and 5),
               created_at timestamp default current_timestamp   
               );
               
               """)
conn.commit()
print("Connected to database:", db_name)
print("Table CREATED BOOKS...")

# -----------------------------
# Read CSV (FIXED)
# -----------------------------
df = pd.read_csv(
    CSV_FILE,
    sep=";",
    encoding="latin-1",
    engine="python",      # ✅ more tolerant parser
    on_bad_lines="skip"   # ✅ skip malformed rows
)

print(f"CSV loaded: {len(df)} rows")

# -----------------------------
# Keep only required columns
# -----------------------------
df = df[["Book-Title", "Book-Author"]]

# -----------------------------
# Clean data
# -----------------------------
df["Book-Title"] = df["Book-Title"].str.slice(0, 100)
df["Book-Author"] = df["Book-Author"].str.slice(0, 100)


# Remove empty values
df = df[(df["Book-Title"] != "") & (df["Book-Author"] != "")]

print(f"After cleaning: {len(df)} rows")

# -----------------------------
# Generate rating
# -----------------------------
df["rating"] = [random.randint(1, 5) for _ in range(len(df))]

# -----------------------------
# Prepare data for insert
# -----------------------------
records = list(df.itertuples(index=False, name=None))

# -----------------------------
# Insert query
# -----------------------------
insert_query = """
INSERT INTO public.books (title, author, rating)
VALUES (%s, %s, %s)
"""

# -----------------------------
# Batch insert
# -----------------------------
for i in range(0, len(records), BATCH_SIZE):
    batch = records[i:i + BATCH_SIZE]
    execute_batch(cursor, insert_query, batch)
    conn.commit()
    print(f"Inserted {i + len(batch)} records")

# -----------------------------
# Cleanup
# -----------------------------
cursor.close()
conn.close()

print("Data import completed successfully.")
