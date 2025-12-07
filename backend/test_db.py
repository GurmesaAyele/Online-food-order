import pymysql

print("Testing MySQL connection...")

try:
    # Try without password
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='',
        port=3306
    )
    print("✅ Connected successfully (no password)")
    
    cursor = connection.cursor()
    cursor.execute("SHOW DATABASES")
    databases = cursor.fetchall()
    print("\nAvailable databases:")
    for db in databases:
        print(f"  - {db[0]}")
    
    # Try to create fooddelivery database
    cursor.execute("CREATE DATABASE IF NOT EXISTS fooddelivery")
    print("\n✅ Database 'fooddelivery' created/verified")
    
    connection.close()
    
except pymysql.err.OperationalError as e:
    print(f"❌ Connection failed: {e}")
    print("\nTrying common WampServer passwords...")
    
    for pwd in ['14162121', '', 'root', 'mysql']:
        try:
            connection = pymysql.connect(
                host='localhost',
                user='root',
                password=pwd,
                port=3306
            )
            print(f"✅ Connected with password: '{pwd}'")
            
            # Create database
            cursor = connection.cursor()
            cursor.execute("CREATE DATABASE IF NOT EXISTS fooddelivery")
            print("✅ Database 'fooddelivery' created/verified")
            
            connection.close()
            break
        except Exception as e:
            print(f"  ❌ Failed with password '{pwd}': {e}")
            continue
