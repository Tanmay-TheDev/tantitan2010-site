# Backups

This project now contains a GitHub Actions workflow at `.github/workflows/backup.yml`. It creates a ZIP backup every Sunday and when manually dispatched, with 90-day artifact retention.

The workflow becomes active after this folder is connected to a GitHub repository with Actions enabled. A hosted backup cannot be truthfully activated from a static ZIP alone because that requires access to the repository/account that owns the deployment.
