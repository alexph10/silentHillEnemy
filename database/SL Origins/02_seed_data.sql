USE silent_hill_origins_enemies;

-- Insert enemies
INSERT INTO enemies (name, game_appearance, psychological_symbolism, otherworld_behavior) VALUES
  ('Pyramid Head', 'Silent Hill: Origins', '', ''),
  ('Faceless Nurse', 'Silent Hill: Origins', '', ''),
  ('Butcher', 'Silent Hill: Origins', '', ''),
  ('Caliban', 'Silent Hill: Origins', '', ''),
  ('Alessa''s Dream', 'Silent Hill: Origins', '', ''),
  ('Straightjacket', 'Silent Hill: Origins', '', ''),
  ('Momma', 'Silent Hill: Origins', '', ''),
  ('Sad Daddy', 'Silent Hill: Origins', '', ''),
  ('Ariel', 'Silent Hill: Origins', '', ''),
  ('Remnant', 'Silent Hill: Origins', '', ''),
  ('Carrion', 'Silent Hill: Origins', '', ''),
  ('Two-Back', 'Silent Hill: Origins', '', '');

-- Insert Physical Attributes
INSERT INTO physical_attributes (enemy_id, body_type, size, notable_features) VALUES
  
-- Insert Movement
INSERT INTO movement (enemy_id, movement_type, speed_level, behavior_pattern) VALUES
  

-- Insert Vulnerabilities
INSERT INTO vulnerabilities (enemy_id, weak_to, resistant_to) VALUES
  
-- Insert Attack Patterns
INSERT INTO attack_patterns (enemy_id, attack_name, damage_output, attack_range, attack_speed) VALUES
  
-- Insert Audio Cues
INSERT INTO audio_cues (enemy_id, sound_type, description) VALUES
  