USE silent_hill_downpour_enemies;

-- View: Enemy attributes overview
CREATE VIEW enemy_details AS
SELECT e.name, p.body_type, p.size, p.notable_features, m.movement_type, v.weak_to, v.resistant_to, a.attack_name
FROM enemies e
LEFT JOIN physical_attributes p ON e.enemy_id = p.enemy_id
LEFT JOIN movement m ON e.enemy_id = m.enemy_id
LEFT JOIN vulnerabilities v ON e.enemy_id = v.enemy_id
LEFT JOIN attack_patterns a ON e.enemy_id = a.enemy_id;

-- View: Enemy vulnerabilities summary
CREATE VIEW enemy_vulnerabilities AS
SELECT e.name, v.weak_to, v.resistant_to, v.immune_to
FROM enemies e
LEFT JOIN vulnerabilities v ON e.enemy_id = v.enemy_id;

-- View: Enemy attack patterns summary
CREATE VIEW enemy_attacks AS
SELECT e.name, a.attack_name, a.damage_output, a.attack_range
FROM enemies e
LEFT JOIN attack_patterns a ON e.enemy_id = a.enemy_id;

-- View: Enemy audio cues summary
CREATE VIEW enemy_audio_cues AS
SELECT e.name, ac.sound_type, ac.description
FROM enemies e
LEFT JOIN audio_cues ac ON e.enemy_id = ac.enemy_id;

-- View: Enemy movement summary
CREATE VIEW enemy_movement AS
SELECT e.name, m.movement_type, m.speed_level, m.behavior_pattern
FROM enemies e
LEFT JOIN movement m ON e.enemy_id = m.enemy_id;
