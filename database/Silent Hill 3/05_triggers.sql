USE silent_hill_3_enemies;

-- Create an audit log table
CREATE TABLE enemy_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    enemy_name VARCHAR(255),
    action_type VARCHAR(50),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger: Log new enemy insertions
DELIMITER $$

CREATE TRIGGER log_enemy_insert
AFTER INSERT ON enemies
FOR EACH ROW
BEGIN
    INSERT INTO enemy_log (enemy_name, action_type) 
    VALUES (NEW.name, 'INSERT');
END$$

DELIMITER ;