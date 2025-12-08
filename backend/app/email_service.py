import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Email configuration from environment variables
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SENDER_EMAIL = os.getenv("SENDER_EMAIL", "gurmesaayele49@gmail.com")
SENDER_PASSWORD = os.getenv("SENDER_PASSWORD", "")
SENDER_NAME = os.getenv("SENDER_NAME", "FoodHub Admin")

def send_approval_email(recipient_email: str, full_name: str, temp_password: str, role: str):
    """
    Send approval email with temporary credentials to approved user
    """
    try:
        # Create message
        message = MIMEMultipart("alternative")
        message["Subject"] = f"🎉 Your {role.title()} Account Has Been Approved!"
        message["From"] = f"{SENDER_NAME} <{SENDER_EMAIL}>"
        message["To"] = recipient_email

        # Create HTML email body
        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                }}
                .header {{
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 30px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                }}
                .content {{
                    background: white;
                    padding: 30px;
                    border-radius: 0 0 10px 10px;
                }}
                .credentials {{
                    background: #f0f4ff;
                    border-left: 4px solid #667eea;
                    padding: 20px;
                    margin: 20px 0;
                }}
                .credentials h3 {{
                    margin-top: 0;
                    color: #667eea;
                }}
                .credential-item {{
                    margin: 10px 0;
                    font-size: 16px;
                }}
                .credential-label {{
                    font-weight: bold;
                    color: #555;
                }}
                .credential-value {{
                    color: #667eea;
                    font-family: monospace;
                    font-size: 18px;
                    background: white;
                    padding: 5px 10px;
                    border-radius: 4px;
                    display: inline-block;
                    margin-left: 10px;
                }}
                .button {{
                    display: inline-block;
                    padding: 15px 30px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                    margin: 20px 0;
                    font-weight: bold;
                }}
                .warning {{
                    background: #fff3cd;
                    border-left: 4px solid #ffc107;
                    padding: 15px;
                    margin: 20px 0;
                }}
                .footer {{
                    text-align: center;
                    color: #666;
                    font-size: 14px;
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid #ddd;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎉 Congratulations!</h1>
                    <p>Your account has been approved</p>
                </div>
                <div class="content">
                    <p>Dear <strong>{full_name}</strong>,</p>
                    
                    <p>Great news! Your application to join FoodHub as a <strong>{role.title()}</strong> has been approved by our admin team.</p>
                    
                    <p>Welcome to the FoodHub family! We're excited to have you on board.</p>
                    
                    <div class="credentials">
                        <h3>🔐 Your Login Credentials</h3>
                        <div class="credential-item">
                            <span class="credential-label">Username (Email):</span>
                            <span class="credential-value">{recipient_email}</span>
                        </div>
                        <div class="credential-item">
                            <span class="credential-label">Temporary Password:</span>
                            <span class="credential-value">{temp_password}</span>
                        </div>
                    </div>
                    
                    <div class="warning">
                        <strong>⚠️ IMPORTANT SECURITY NOTICE:</strong>
                        <ul>
                            <li>This is a temporary password generated by our system</li>
                            <li>Please change your password immediately after first login</li>
                            <li>Never share your password with anyone</li>
                            <li>Keep your credentials secure</li>
                        </ul>
                    </div>
                    
                    <center>
                        <a href="http://localhost:5173/login" class="button">Login to Your Dashboard</a>
                    </center>
                    
                    <h3>📋 Next Steps:</h3>
                    <ol>
                        <li>Click the button above or visit: <a href="http://localhost:5173/login">http://localhost:5173/login</a></li>
                        <li>Login using your email and temporary password</li>
                        <li>Go to Settings and change your password</li>
                        <li>Complete your profile setup</li>
                        <li>Start using the platform!</li>
                    </ol>
                    
                    <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
                    
                    <p>Thank you for choosing FoodHub!</p>
                    
                    <p>Best regards,<br>
                    <strong>The FoodHub Team</strong><br>
                    Admin: {SENDER_EMAIL}</p>
                    
                    <div class="footer">
                        <p>This email was sent on {datetime.now().strftime("%B %d, %Y at %I:%M %p")}</p>
                        <p>© 2024 FoodHub. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        """

        # Create plain text version as fallback
        text_body = f"""
        Congratulations {full_name}!
        
        Your {role.title()} account has been approved!
        
        Your Login Credentials:
        Username (Email): {recipient_email}
        Temporary Password: {temp_password}
        
        IMPORTANT: Please change your password after first login!
        
        Login at: http://localhost:5173/login
        
        Next Steps:
        1. Visit the login page
        2. Login with your credentials
        3. Change your password in Settings
        4. Complete your profile
        5. Start using FoodHub!
        
        Thank you for joining FoodHub!
        
        Best regards,
        The FoodHub Team
        Admin: {SENDER_EMAIL}
        """

        # Attach both HTML and plain text versions
        part1 = MIMEText(text_body, "plain")
        part2 = MIMEText(html_body, "html")
        message.attach(part1)
        message.attach(part2)

        # Send email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(message)
        
        print(f"✅ Email sent successfully to {recipient_email}")
        return True
        
    except Exception as e:
        print(f"❌ Failed to send email to {recipient_email}: {str(e)}")
        print("\n" + "="*60)
        print("📧 EMAIL PREVIEW (Email sending failed, showing preview)")
        print("="*60)
        print(f"To: {recipient_email}")
        print(f"Subject: Your {role.title()} Account Has Been Approved!")
        print("\n" + "-"*60)
        print(f"Dear {full_name},")
        print(f"\nCongratulations! Your {role} account has been approved.")
        print("\nYour login credentials:")
        print(f"  Email: {recipient_email}")
        print(f"  Temporary Password: {temp_password}")
        print("\nPlease login at: http://localhost:5173/login")
        print("\nIMPORTANT: Please change your password after first login.")
        print("\nThank you for joining our platform!")
        print("\nBest regards,")
        print("FoodHub Team")
        print(f"Admin: {SENDER_EMAIL}")
        print("-"*60)
        print("="*60 + "\n")
        return False


def send_rejection_email(recipient_email: str, full_name: str, role: str, reason: str = ""):
    """
    Send rejection email to user whose request was rejected
    """
    try:
        message = MIMEMultipart("alternative")
        message["Subject"] = f"Update on Your {role.title()} Application"
        message["From"] = f"{SENDER_NAME} <{SENDER_EMAIL}>"
        message["To"] = recipient_email

        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    color: #333;
                }}
                .container {{
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f9f9f9;
                }}
                .header {{
                    background: #6b7280;
                    color: white;
                    padding: 30px;
                    text-align: center;
                    border-radius: 10px 10px 0 0;
                }}
                .content {{
                    background: white;
                    padding: 30px;
                    border-radius: 0 0 10px 10px;
                }}
                .footer {{
                    text-align: center;
                    color: #666;
                    font-size: 14px;
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid #ddd;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Application Update</h1>
                </div>
                <div class="content">
                    <p>Dear <strong>{full_name}</strong>,</p>
                    
                    <p>Thank you for your interest in joining FoodHub as a {role.title()}.</p>
                    
                    <p>After careful review, we regret to inform you that we are unable to approve your application at this time.</p>
                    
                    {f'<div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;"><strong>Reason:</strong><br>{reason}</div>' if reason else ''}
                    
                    <p>We encourage you to address any concerns and reapply in the future if circumstances change.</p>
                    
                    <p>If you have any questions, please contact us at {SENDER_EMAIL}</p>
                    
                    <p>Thank you for your understanding.</p>
                    
                    <p>Best regards,<br>
                    <strong>The FoodHub Team</strong></p>
                    
                    <div class="footer">
                        <p>© 2024 FoodHub. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        """

        reason_text = f"\n\nReason: {reason}\n" if reason else ""
        
        text_body = f"""
        Dear {full_name},
        
        Thank you for your interest in joining FoodHub as a {role.title()}.
        
        After careful review, we regret to inform you that we are unable to approve your application at this time.
        {reason_text}
        We encourage you to address any concerns and reapply in the future.
        
        If you have any questions, please contact us at {SENDER_EMAIL}
        
        Best regards,
        The FoodHub Team
        """

        part1 = MIMEText(text_body, "plain")
        part2 = MIMEText(html_body, "html")
        message.attach(part1)
        message.attach(part2)

        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(message)
        
        print(f"✅ Rejection email sent to {recipient_email}")
        return True
        
    except Exception as e:
        print(f"❌ Failed to send rejection email: {str(e)}")
        return False
