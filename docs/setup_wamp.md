# WampServer Setup Instructions

## Step 1: Start WampServer
1. Open WampServer (look for the green icon in system tray)
2. Make sure it's running (icon should be green, not orange or red)

## Step 2: Create Database
1. Open your browser and go to: http://localhost/phpmyadmin
2. Click on "New" in the left sidebar
3. Database name: `fooddelivery`
4. Collation: `utf8mb4_unicode_ci`
5. Click "Create"

## Step 3: Check MySQL Connection
- Default username: `root`
- Default password: (empty - no password)
- Port: `3306`

## Alternative: Create database via SQL
1. Go to http://localhost/phpmyadmin
2. Click on "SQL" tab
3. Paste this and click "Go":
```sql
CREATE DATABASE IF NOT EXISTS fooddelivery CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Once done, come back and we'll continue with the backend setup!
