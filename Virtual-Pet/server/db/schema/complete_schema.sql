-- Drop tables and views in reverse dependency order to avoid conflicts
DROP VIEW IF EXISTS user_food_count;
DROP TABLE IF EXISTS user_foods CASCADE;

DROP VIEW IF EXISTS user_toiletries_count;
DROP TABLE IF EXISTS user_toiletries CASCADE;

DROP VIEW IF EXISTS user_toy_count;
DROP TABLE IF EXISTS user_toys CASCADE;

DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS foods CASCADE;
DROP TABLE IF EXISTS toiletries CASCADE;
DROP TABLE IF EXISTS toys CASCADE;
DROP TABLE IF EXISTS shop CASCADE;

DROP TABLE IF EXISTS pets CASCADE;
DROP TABLE IF EXISTS sprites CASCADE;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS colors CASCADE;
DROP TABLE IF EXISTS moods CASCADE;
DROP TABLE IF EXISTS species CASCADE;
DROP TABLE IF EXISTS personalities CASCADE;

-- Create tables in the correct order
CREATE TABLE moods (
  id SERIAL PRIMARY KEY,
  mood_name VARCHAR(255)
);

CREATE TABLE colors (
  id SERIAL PRIMARY KEY,
  color_name VARCHAR(255) NOT NULL
);

CREATE TABLE species (
  id SERIAL PRIMARY KEY,
  species_name VARCHAR(255) NOT NULL,
  hunger_mod INT,
  happy_mod INT,
  energy_mod INT,
  clean_mod INT,
  lifespan INT,
  diet_type INT,
  diet_desc TEXT,
  image VARCHAR(255)
);

CREATE TABLE sprites (
  id SERIAL PRIMARY KEY,
  color_id INT REFERENCES colors(id) ON DELETE CASCADE,
  species_id INT REFERENCES species(id) ON DELETE CASCADE,
  mood_id INT REFERENCES moods(id) ON DELETE CASCADE,
  image_url VARCHAR(255)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP
);

CREATE TABLE personalities (
  id SERIAL PRIMARY KEY,
  personality_name VARCHAR(255) UNIQUE,
  energy_decay NUMERIC(5, 2), 
  happiness_decay NUMERIC(5, 2),
  hunger_decay NUMERIC(5, 2),
  cleanliness_decay NUMERIC(5, 2)
);

CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  species_id INT REFERENCES species(id) ON DELETE CASCADE,
  name VARCHAR(255),
  age INT, 
  adopted_at TIMESTAMP,
  sprite_id INT REFERENCES sprites(id) ON DELETE CASCADE,
  mood_id INT REFERENCES moods(id) ON DELETE CASCADE,
  color_id INT REFERENCES colors(id) ON DELETE CASCADE,
  personality_id INT REFERENCES personalities(id) ON DELETE CASCADE,
  update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  energy INT,
  happiness INT,
  hunger INT,
  cleanliness INT 
);

CREATE TABLE shop (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE toys (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(255),
  price NUMERIC,
  effects INT,
  description VARCHAR(255),
  shop_id INTEGER REFERENCES shop(id) ON DELETE CASCADE,
  toy_image VARCHAR(255)
);

CREATE TABLE toiletries (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(255),
  price NUMERIC,
  effects INT,
  description VARCHAR(255), 
  shop_id INTEGER REFERENCES shop(id) ON DELETE CASCADE,
  toiletry_image VARCHAR(255)
);

CREATE TABLE foods (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  name VARCHAR(255),
  price NUMERIC,
  effects INT,
  food_type INT,
  description VARCHAR(255),  
  shop_id INTEGER REFERENCES shop(id) ON DELETE CASCADE,
  food_image VARCHAR(255)
);

CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  money NUMERIC,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_toys (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  count INTEGER DEFAULT 0,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  inventory_id INTEGER REFERENCES inventory(id) ON DELETE CASCADE,
  item_type_id INTEGER REFERENCES toys(id) ON DELETE CASCADE
);

CREATE VIEW user_toy_count AS
SELECT 
    user_id, 
    inventory_id, 
    SUM(count) AS toy_count
FROM 
    user_toys
GROUP BY 
    user_id, inventory_id, item_type_id;

CREATE TABLE user_toiletries (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  count INTEGER DEFAULT 0,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  inventory_id INTEGER REFERENCES inventory(id) ON DELETE CASCADE,
  item_type_id INTEGER REFERENCES toiletries(id) ON DELETE CASCADE
);

CREATE VIEW user_toiletries_count AS
SELECT 
    user_id, 
    inventory_id, 
    SUM(count) AS toiletry_count
FROM 
    user_toiletries
GROUP BY 
    user_id, inventory_id, item_type_id;

CREATE TABLE user_foods (
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  count INTEGER DEFAULT 0,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  inventory_id INTEGER REFERENCES inventory(id) ON DELETE CASCADE,
  item_type_id INTEGER REFERENCES foods(id) ON DELETE CASCADE
);

CREATE VIEW user_food_count AS
SELECT 
    user_id, 
    inventory_id, 
    SUM(count) AS food_count
FROM 
    user_foods
GROUP BY 
    user_id, inventory_id, item_type_id;
