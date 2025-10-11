USE silent_hill_f_enemies;

-- Table: Enemies
CREATE TABLE enemies (
    enemy_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    game_appearance VARCHAR(50) NOT NULL,
    psychological_symbolism TEXT,
    otherworld_behavior TEXT
);

-- Table: Physical Attributes
CREATE TABLE physical_attributes (
    attr_id INT AUTO_INCREMENT PRIMARY KEY,
    enemy_id INT,
    body_type VARCHAR(255),
    size VARCHAR(50),
    notable_features TEXT,
    FOREIGN KEY (enemy_id) REFERENCES enemies(enemy_id) ON DELETE CASCADE
);

-- Table: Movement
CREATE TABLE movement (
    move_id INT AUTO_INCREMENT PRIMARY KEY,
    enemy_id INT,
    movement_type VARCHAR(255),
    speed_level ENUM('Slow', 'Medium', 'Fast'),
    behavior_pattern TEXT,
    FOREIGN KEY (enemy_id) REFERENCES enemies(enemy_id) ON DELETE CASCADE
);

-- Table: Vulnerabilities
CREATE TABLE vulnerabilities (
    vuln_id INT AUTO_INCREMENT PRIMARY KEY,
    enemy_id INT,
    weak_to VARCHAR(255),
    resistant_to VARCHAR(255),
    immune_to VARCHAR(255),
    FOREIGN KEY (enemy_id) REFERENCES enemies(enemy_id) ON DELETE CASCADE
);

-- Table: Attack Patterns
CREATE TABLE attack_patterns (
    attack_id INT AUTO_INCREMENT PRIMARY KEY,
    enemy_id INT,
    attack_name VARCHAR(255),
    damage_output VARCHAR(255),
    attack_range VARCHAR(255),
    attack_speed VARCHAR(255),
    FOREIGN KEY (enemy_id) REFERENCES enemies(enemy_id) ON DELETE CASCADE
);

-- Table: Audio Cues
CREATE TABLE audio_cues (
    audio_id INT AUTO_INCREMENT PRIMARY KEY,
    enemy_id INT,
    sound_type VARCHAR(255),
    description TEXT,
    FOREIGN KEY (enemy_id) REFERENCES enemies(enemy_id) ON DELETE CASCADE
);
 