USE silent_hill_3_enemies;

-- Index enemy names for quick lookup
CREATE INDEX idx_enemy_name ON enemies (name);

-- Index attack patterns for fast retrieval
CREATE INDEX idx_attack_enemy ON attack_patterns (enemy_id);

-- Index vulnerabilities for quick enemy weaknesses search
CREATE INDEX idx_vuln_enemy ON vulnerabilities (enemy_id);

-- Index movement for fast enemy behavior retrieval
CREATE INDEX idx_move_enemy ON movement (enemy_id);

-- Index audio cues for quick sound effects lookup
CREATE INDEX idx_audio_enemy ON audio_cues (enemy_id);

-- Index physical attributes for quick enemy appearance search
CREATE INDEX idx_attr_enemy ON physical_attributes (enemy_id);

-- Index enemy details for quick enemy information retrieval
CREATE INDEX idx_enemy_details ON enemy_details (name);

-- Index enemy details for quick enemy information retrieval
CREATE INDEX idx_symbolism ON enemies (psychological_symbolism);

-- Index enemy details for quick enemy information retrieval
CREATE INDEX idx_behavior ON movement (behavior_pattern);

-- Index enemy details for quick enemy information retrieval
CREATE INDEX idx_weakness ON vulnerabilities (weak_to);

-- Index enemy details for quick enemy information retrieval
CREATE INDEX idx_resistance ON vulnerabilities (resistant_to);