from app.email_service import send_approval_email
import os
from dotenv import load_dotenv

load_dotenv()

print("Testing email configuration...")
print(f"SMTP_SERVER: {os.getenv('SMTP_SERVER')}")
print(f"SMTP_PORT: {os.getenv('SMTP_PORT')}")
print(f"SENDER_EMAIL: {os.getenv('SENDER_EMAIL')}")
print(f"SENDER_PASSWORD: {'*' * len(os.getenv('SENDER_PASSWORD', ''))}")
print()

# Test sending email
print("Attempting to send test email...")
result = send_approval_email(
    recipient_email="gurmesaayele49@gmail.com",  # Send to yourself for testing
    full_name="Test User",
    temp_password="TestPass123",
    role="restaurant"
)

if result:
    print("\n✅ Email sent successfully!")
    print("Check your inbox: gurmesaayele49@gmail.com")
else:
    print("\n❌ Email failed to send. Check the error messages above.")
