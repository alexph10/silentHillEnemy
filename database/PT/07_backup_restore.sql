# Backup command
mysqldump -u root -p pt_enemies > backup.sql

# Restore command
mysql -u root -p pt_enemies < backup.sql