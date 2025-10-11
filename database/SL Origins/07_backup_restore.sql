# Backup command
mysqldump -u root -p silent_hill_origins_enemies > backup.sql

# Restore command
mysql -u root -p silent_hill_origins_enemies < backup.sql