USE silent_hill_sm_enemies;

-- List all enemies
SELECT * FROM enemies;


-- Query 2: Get detailed information for a specific enemy (e.g., "Groaner")
SELECT 
    e.enemy_id, 
    e.name, 
    e.game_appearance, 
    e.psychological_symbolism,
    pa.body_type, 
    pa.size, 
    pa.notable_features,
    m.movement_type, 
    m.speed_level, 
    m.behavior_pattern,
    v.weak_to, 
    v.resistant_to, 
    v.immune_to,
    ap.attack_name, 
    ap.damage_output, 
    ap.attack_range, 
    ap.attack_speed,
    ac.sound_type, 
    ac.description AS audio_description
FROM enemies e
LEFT JOIN physical_attributes pa ON e.enemy_id = pa.enemy_id
LEFT JOIN movement m ON e.enemy_id = m.enemy_id
LEFT JOIN vulnerabilities v ON e.enemy_id = v.enemy_id
LEFT JOIN attack_patterns ap ON e.enemy_id = ap.enemy_id
LEFT JOIN audio_cues ac ON e.enemy_id = ac.enemy_id
WHERE e.name = '';

SELECT 
    e.enemy_id, 
    e.name, 
    e.game_appearance, 
    e.psychological_symbolism,
    pa.body_type, 
    pa.size, 
    pa.notable_features,
    m.movement_type, 
    m.speed_level, 
    m.behavior_pattern,
    v.weak_to, 
    v.resistant_to, 
    v.immune_to,
    ap.attack_name, 
    ap.damage_output, 
    ap.attack_range, 
    ap.attack_speed,
    ac.sound_type, 
    ac.description AS audio_description
FROM enemies e
LEFT JOIN physical_attributes pa ON e.enemy_id = pa.enemy_id
LEFT JOIN movement m ON e.enemy_id = m.enemy_id
LEFT JOIN vulnerabilities v ON e.enemy_id = v.enemy_id
LEFT JOIN attack_patterns ap ON e.enemy_id = ap.enemy_id
LEFT JOIN audio_cues ac ON e.enemy_id = ac.enemy_id
WHERE e.name = '';

SELECT 
    e.enemy_id, 
    e.name, 
    e.game_appearance, 
    e.psychological_symbolism,
    pa.body_type, 
    pa.size, 
    pa.notable_features,
    m.movement_type, 
    m.speed_level, 
    m.behavior_pattern,
    v.weak_to, 
    v.resistant_to, 
    v.immune_to,
    ap.attack_name, 
    ap.damage_output, 
    ap.attack_range, 
    ap.attack_speed,
    ac.sound_type, 
    ac.description AS audio_description
FROM enemies e
LEFT JOIN physical_attributes pa ON e.enemy_id = pa.enemy_id
LEFT JOIN movement m ON e.enemy_id = m.enemy_id
LEFT JOIN vulnerabilities v ON e.enemy_id = v.enemy_id
LEFT JOIN attack_patterns ap ON e.enemy_id = ap.enemy_id
LEFT JOIN audio_cues ac ON e.enemy_id = ac.enemy_id
WHERE e.name = '';

SELECT 
    e.enemy_id, 
    e.name, 
    e.game_appearance, 
    e.psychological_symbolism,
    pa.body_type, 
    pa.size, 
    pa.notable_features,
    m.movement_type, 
    m.speed_level, 
    m.behavior_pattern,
    v.weak_to, 
    v.resistant_to, 
    v.immune_to,
    ap.attack_name, 
    ap.damage_output, 
    ap.attack_range, 
    ap.attack_speed,
    ac.sound_type, 
    ac.description AS audio_description
FROM enemies e
LEFT JOIN physical_attributes pa ON e.enemy_id = pa.enemy_id
LEFT JOIN movement m ON e.enemy_id = m.enemy_id
LEFT JOIN vulnerabilities v ON e.enemy_id = v.enemy_id
LEFT JOIN attack_patterns ap ON e.enemy_id = ap.enemy_id
LEFT JOIN audio_cues ac ON e.enemy_id = ac.enemy_id
WHERE e.name = '';

SELECT 
    e.enemy_id, 
    e.name, 
    e.game_appearance, 
    e.psychological_symbolism,
    pa.body_type, 
    pa.size, 
    pa.notable_features,
    m.movement_type, 
    m.speed_level, 
    m.behavior_pattern,
    v.weak_to, 
    v.resistant_to, 
    v.immune_to,
    ap.attack_name, 
    ap.damage_output, 
    ap.attack_range, 
    ap.attack_speed,
    ac.sound_type, 
    ac.description AS audio_description
FROM enemies e
LEFT JOIN physical_attributes pa ON e.enemy_id = pa.enemy_id
LEFT JOIN movement m ON e.enemy_id = m.enemy_id
LEFT JOIN vulnerabilities v ON e.enemy_id = v.enemy_id
LEFT JOIN attack_patterns ap ON e.enemy_id = ap.enemy_id
LEFT JOIN audio_cues ac ON e.enemy_id = ac.enemy_id
WHERE e.name = '';

SELECT 
    e.enemy_id, 
    e.name, 
    e.game_appearance, 
    e.psychological_symbolism,
    pa.body_type, 
    pa.size, 
    pa.notable_features,
    m.movement_type, 
    m.speed_level, 
    m.behavior_pattern,
    v.weak_to, 
    v.resistant_to, 
    v.immune_to,
    ap.attack_name, 
    ap.damage_output, 
    ap.attack_range, 
    ap.attack_speed,
    ac.sound_type, 
    ac.description AS audio_description
FROM enemies e
LEFT JOIN physical_attributes pa ON e.enemy_id = pa.enemy_id
LEFT JOIN movement m ON e.enemy_id = m.enemy_id
LEFT JOIN vulnerabilities v ON e.enemy_id = v.enemy_id
LEFT JOIN attack_patterns ap ON e.enemy_id = ap.enemy_id
LEFT JOIN audio_cues ac ON e.enemy_id = ac.enemy_id
WHERE e.name = '';

SELECT 
    e.enemy_id, 
    e.name, 
    e.game_appearance, 
    e.psychological_symbolism,
    pa.body_type, 
    pa.size, 
    pa.notable_features,
    m.movement_type, 
    m.speed_level, 
    m.behavior_pattern,
    v.weak_to, 
    v.resistant_to, 
    v.immune_to,
    ap.attack_name, 
    ap.damage_output, 
    ap.attack_range, 
    ap.attack_speed,
    ac.sound_type, 
    ac.description AS audio_description
FROM enemies e
LEFT JOIN physical_attributes pa ON e.enemy_id = pa.enemy_id
LEFT JOIN movement m ON e.enemy_id = m.enemy_id
LEFT JOIN vulnerabilities v ON e.enemy_id = v.enemy_id
LEFT JOIN attack_patterns ap ON e.enemy_id = ap.enemy_id
LEFT JOIN audio_cues ac ON e.enemy_id = ac.enemy_id
WHERE e.name = '';

SELECT 
    e.enemy_id, 
    e.name, 
    e.game_appearance, 
    e.psychological_symbolism,
    pa.body_type, 
    pa.size, 
    pa.notable_features,
    m.movement_type, 
    m.speed_level, 
    m.behavior_pattern,
    v.weak_to, 
    v.resistant_to, 
    v.immune_to,
    ap.attack_name, 
    ap.damage_output, 
    ap.attack_range, 
    ap.attack_speed,
    ac.sound_type, 
    ac.description AS audio_description
FROM enemies e
LEFT JOIN physical_attributes pa ON e.enemy_id = pa.enemy_id
LEFT JOIN movement m ON e.enemy_id = m.enemy_id
LEFT JOIN vulnerabilities v ON e.enemy_id = v.enemy_id
LEFT JOIN attack_patterns ap ON e.enemy_id = ap.enemy_id
LEFT JOIN audio_cues ac ON e.enemy_id = ac.enemy_id
WHERE e.name = '';

SELECT 
    e.enemy_id, 
    e.name, 
    e.game_appearance, 
    e.psychological_symbolism,
    pa.body_type, 
    pa.size, 
    pa.notable_features,
    m.movement_type, 
    m.speed_level, 
    m.behavior_pattern,
    v.weak_to, 
    v.resistant_to, 
    v.immune_to,
    ap.attack_name, 
    ap.damage_output, 
    ap.attack_range, 
    ap.attack_speed,
    ac.sound_type, 
    ac.description AS audio_description
FROM enemies e
LEFT JOIN physical_attributes pa ON e.enemy_id = pa.enemy_id
LEFT JOIN movement m ON e.enemy_id = m.enemy_id
LEFT JOIN vulnerabilities v ON e.enemy_id = v.enemy_id
LEFT JOIN attack_patterns ap ON e.enemy_id = ap.enemy_id
LEFT JOIN audio_cues ac ON e.enemy_id = ac.enemy_id
WHERE e.name = '';

SELECT 
    e.enemy_id, 
    e.name, 
    e.game_appearance, 
    e.psychological_symbolism,
    pa.body_type, 
    pa.size, 
    pa.notable_features,
    m.movement_type, 
    m.speed_level, 
    m.behavior_pattern,
    v.weak_to, 
    v.resistant_to, 
    v.immune_to,
    ap.attack_name, 
    ap.damage_output, 
    ap.attack_range, 
    ap.attack_speed,
    ac.sound_type, 
    ac.description AS audio_description
FROM enemies e
LEFT JOIN physical_attributes pa ON e.enemy_id = pa.enemy_id
LEFT JOIN movement m ON e.enemy_id = m.enemy_id
LEFT JOIN vulnerabilities v ON e.enemy_id = v.enemy_id
LEFT JOIN attack_patterns ap ON e.enemy_id = ap.enemy_id
LEFT JOIN audio_cues ac ON e.enemy_id = ac.enemy_id
WHERE e.name = '';

SELECT 
    e.enemy_id, 
    e.name, 
    e.game_appearance, 
    e.psychological_symbolism,
    pa.body_type, 
    pa.size, 
    pa.notable_features,
    m.movement_type, 
    m.speed_level, 
    m.behavior_pattern,
    v.weak_to, 
    v.resistant_to, 
    v.immune_to,
    ap.attack_name, 
    ap.damage_output, 
    ap.attack_range, 
    ap.attack_speed,
    ac.sound_type, 
    ac.description AS audio_description
FROM enemies e
LEFT JOIN physical_attributes pa ON e.enemy_id = pa.enemy_id
LEFT JOIN movement m ON e.enemy_id = m.enemy_id
LEFT JOIN vulnerabilities v ON e.enemy_id = v.enemy_id
LEFT JOIN attack_patterns ap ON e.enemy_id = ap.enemy_id
LEFT JOIN audio_cues ac ON e.enemy_id = ac.enemy_id
WHERE e.name = '';


SELECT 
    e.enemy_id, 
    e.name, 
    e.game_appearance, 
    e.psychological_symbolism,
    pa.body_type, 
    pa.size, 
    pa.notable_features,
    m.movement_type, 
    m.speed_level, 
    m.behavior_pattern,
    v.weak_to, 
    v.resistant_to, 
    v.immune_to,
    ap.attack_name, 
    ap.damage_output, 
    ap.attack_range, 
    ap.attack_speed,
    ac.sound_type, 
    ac.description AS audio_description
FROM enemies e
LEFT JOIN physical_attributes pa ON e.enemy_id = pa.enemy_id
LEFT JOIN movement m ON e.enemy_id = m.enemy_id
LEFT JOIN vulnerabilities v ON e.enemy_id = v.enemy_id
LEFT JOIN attack_patterns ap ON e.enemy_id = ap.enemy_id
LEFT JOIN audio_cues ac ON e.enemy_id = ac.enemy_id
WHERE e.name = '';

SELECT 
    e.enemy_id, 
    e.name, 
    e.game_appearance, 
    e.psychological_symbolism,
    pa.body_type, 
    pa.size, 
    pa.notable_features,
    m.movement_type, 
    m.speed_level, 
    m.behavior_pattern,
    v.weak_to, 
    v.resistant_to, 
    v.immune_to,
    ap.attack_name, 
    ap.damage_output, 
    ap.attack_range, 
    ap.attack_speed,
    ac.sound_type, 
    ac.description AS audio_description
FROM enemies e
LEFT JOIN physical_attributes pa ON e.enemy_id = pa.enemy_id
LEFT JOIN movement m ON e.enemy_id = m.enemy_id
LEFT JOIN vulnerabilities v ON e.enemy_id = v.enemy_id
LEFT JOIN attack_patterns ap ON e.enemy_id = ap.enemy_id
LEFT JOIN audio_cues ac ON e.enemy_id = ac.enemy_id
WHERE e.name = '';

-- Query 3: Find enemies vulnerable to firearms
SELECT e.name, v.weak_to
FROM vulnerabilities v
JOIN enemies e ON v.enemy_id = e.enemy_id
WHERE v.weak_to LIKE '%Firearms%';

SELECT e.name, v.weak_to
FROM vulnerabilities v
JOIN enemies e ON v.enemy_id = e.enemy_id
WHERE v.weak_to LIKE '%Light exposure%';

SELECT e.name, v.weak_to
FROM vulnerabilities v
JOIN enemies e ON v.enemy_id = e.enemy_id
WHERE v.weak_to LIKE '%Blunt force%';

SELECT e.name, v.weak_to
FROM vulnerabilities v
JOIN enemies e ON v.enemy_id = e.enemy_id
WHERE v.weak_to LIKE '%Decapitation%';