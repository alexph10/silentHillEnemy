USE silent_hill_enemies;

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
WHERE e.name = 'Groaner';

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
WHERE e.name = 'Wormhead';

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
WHERE e.name = 'Incubus';

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
WHERE e.name = 'Grey Children';

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
WHERE e.name = 'Air Screamer';

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
WHERE e.name = 'Puppet Nurse';

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
WHERE e.name = 'Puppet Doctor';

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
WHERE e.name = 'Dahlia Gillespie';

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
WHERE e.name = 'Romper';

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
WHERE e.name = 'Creeper';

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
WHERE e.name = 'Alessa Gillespie (Nightmare Manifestation)';


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
WHERE e.name = 'Mumbler';

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
WHERE e.name = 'Bloodsucker';

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
WHERE e.name = 'Split Head';

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
WHERE e.name = 'Monster Cybil';

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
WHERE e.name = 'Night Flutter';

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
WHERE e.name = 'Floatstinger';

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
WHERE e.name = 'Stalker';

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
WHERE e.name = 'Larval Stalker';

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
WHERE e.name = 'Incubator';

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
WHERE e.name = 'Hanged Scratcher';

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
WHERE e.name = 'Twinfeeler';

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
WHERE e.name = 'Parasite';

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

