USE silent_hill_homecoming_enemies;

-- Insert enemies
INSERT INTO enemies (name, game_appearance, psychological_symbolism, otherworld_behavior) VALUES
   ('Pyramid Head', 'Silent Hill: Homecoming', '', ''),
   ('Asphyxia', 'Silent Hill: Homecoming', '', ''),
   ('Scarlet (boss)', 'Silent Hill: Homecoming', '', ''),
   ('Amnion', 'Silent Hill: Homecoming', '', ''),
   ('Schism', 'Silent Hill: Homecoming', '', ''),
   ('Nurse (Homecoming)', 'Silent Hill: Homecoming', '', ''),
   ('Siam', 'Silent Hill: Homecoming', '', ''),
   ('Sepulcher', 'Silent Hill: Homecoming', '', ''),
   ('Lurker', 'Silent Hill: Homecoming', '', ''),
   ('Smog', 'Silent Hill: Homecoming', '', ''),
   ('Swarm', 'Silent Hill: Homecoming', '', ''),
   ('Needler', 'Silent Hill: Homecoming', '', ''),
   ('Feral', 'Silent Hill: Homecoming', '', '');

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
  