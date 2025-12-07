# 📖 Step-by-Step User Guide

## 🎯 Complete Walkthrough of the New System

---

## 👤 FOR CUSTOMERS

### Step 1: Visit the Homepage
1. Open your browser
2. Go to: **http://localhost:5174**
3. You'll see a beautiful homepage with:
   - Hero section with search
   - "Order Now" button
   - Best restaurants
   - How it works
   - Features
   - Partner section
   - Footer

### Step 2: Sign Up (Instant Access)
1. Click **"Sign Up"** in the top-right navbar
2. Fill in your details:
   - Full Name
   - Email
   - Password
   - Phone
3. Click **"Sign Up"**
4. ✅ Account created immediately!
5. You're redirected to login
6. Login and start ordering!

### Step 3: Browse & Order
1. Click **"Order Now"** or **"Explore Restaurants"**
2. Browse available restaurants
3. Click on a restaurant to view menu
4. Add items to cart
5. Checkout and place order
6. Track your delivery in real-time!

---

## 🍽️ FOR RESTAURANT OWNERS

### Step 1: Visit the Homepage
1. Go to: **http://localhost:5174**
2. Scroll down to **"Partner With Us"** section
3. You'll see a card: **"Restaurant Owner? Join our platform"**

### Step 2: Submit Application
1. Click **"Request to Join →"**
2. You'll be taken to the application form
3. Fill in all required fields:
   - **Full Name**: Your name
   - **Email**: Your business email
   - **Phone**: Contact number
   - **Restaurant Name**: Name of your restaurant
   - **Business License**: Optional license number
   - **Restaurant Address**: Full address
   - **Cuisine Type**: Select from dropdown
4. Click **"Submit Request"**
5. ✅ Success! You'll see: "Request submitted successfully!"

### Step 3: Wait for Approval
- Our admin team will review your application
- This typically takes 2-3 business days
- You'll receive an email when approved

### Step 4: Receive Credentials
- Once approved, you'll get an email with:
  - Your login email
  - Temporary password
  - Link to restaurant dashboard

### Step 5: Login & Start
1. Go to: **http://localhost:5175**
2. Login with your credentials
3. Access your restaurant dashboard!
4. Set up your menu
5. Start receiving orders!

---

## 🚴 FOR DELIVERY RIDERS

### Step 1: Visit the Homepage
1. Go to: **http://localhost:5174**
2. Scroll to **"Partner With Us"** section
3. You'll see: **"Become a Rider - Earn on your schedule"**

### Step 2: Submit Application
1. Click **"Apply Now →"**
2. Fill in the application form:
   - **Full Name**: Your name
   - **Email**: Your email address
   - **Phone**: Contact number
   - **Vehicle Type**: Select (Bicycle, Motorcycle, Scooter, Car)
   - **Driver's License Number**: Your license number
   - **Government ID**: Optional ID number
3. Click **"Submit Application"**
4. ✅ Success! Application submitted!

### Step 3: Wait for Verification
- Admin team verifies your information
- Background check (if required)
- Vehicle verification
- Takes 2-3 business days

### Step 4: Get Approved
- Receive email with:
  - Login credentials
  - Temporary password
  - Instructions to start

### Step 5: Start Delivering
1. Go to: **http://localhost:5176**
2. Login with your credentials
3. Access rider dashboard!
4. Accept delivery orders
5. Start earning!

---

## 👨‍💼 FOR ADMINS

### Step 1: Login to Admin Dashboard
1. Go to: **http://localhost:5177**
2. Login with admin credentials:
   - Email: **admin@foodhub.com**
   - Password: **admin123**
3. You'll see the admin dashboard

### Step 2: View Pending Requests
1. In the sidebar, click **"Access Requests"**
2. You'll see a table with all pending applications
3. Each row shows:
   - Request ID
   - Type (Restaurant/Rider)
   - Applicant name
   - Email and phone
   - Key details
   - Submission date

### Step 3: Review Application
1. Click the **"View"** (eye icon) button
2. A modal opens showing full details:
   - **For Restaurants**:
     - Restaurant name
     - Address
     - Cuisine type
     - Business license
   - **For Riders**:
     - Vehicle type
     - License number
     - Government ID
3. Review all information carefully

### Step 4: Approve Application
1. Click the **"Approve"** button (green)
2. A modal opens
3. Enter a **temporary password** for the new account
   - Example: "restaurant123" or "rider123"
4. Optionally add **admin notes**
5. Click **"Approve & Create Account"**
6. ✅ Account created automatically!
7. The applicant can now login

### Step 5: Reject Application (if needed)
1. Click the **"Reject"** button (red)
2. Enter a **reason for rejection**
   - Be clear and professional
   - Example: "Business license verification failed"
3. Click **"Reject Request"**
4. ❌ Request marked as rejected
5. Applicant receives notification

### Step 6: Manage Users
- After approval, accounts appear in:
  - **"Users"** page (all users)
  - **"Restaurants"** page (restaurant owners)
  - **"Riders"** page (delivery riders)
- You can manage them from there

---

## 🔄 Complete User Journey Examples

### Example 1: Pizza Restaurant Owner

**Day 1 - Application**
1. Mario visits http://localhost:5174
2. Sees "Restaurant Owner? Request to join"
3. Clicks and fills form:
   - Name: Mario Rossi
   - Email: mario@pizzaroma.com
   - Restaurant: Pizza Roma
   - Address: 456 Italian St
   - Cuisine: Italian
4. Submits application
5. Sees success message

**Day 2 - Admin Review**
1. Admin logs into dashboard
2. Goes to "Access Requests"
3. Sees Mario's application
4. Reviews details
5. Approves with password: "pizza2024"
6. Account created!

**Day 3 - Mario Starts**
1. Mario receives email (simulated)
2. Goes to http://localhost:5175
3. Logs in: mario@pizzaroma.com / pizza2024
4. Accesses restaurant dashboard
5. Adds menu items
6. Starts receiving orders!

### Example 2: Delivery Rider

**Day 1 - Application**
1. Sarah visits http://localhost:5174
2. Clicks "Become a Rider"
3. Fills form:
   - Name: Sarah Johnson
   - Email: sarah@delivery.com
   - Vehicle: Motorcycle
   - License: MC789456
4. Submits application

**Day 2 - Verification**
1. Admin reviews application
2. Checks license number
3. Approves with password: "rider2024"

**Day 3 - Sarah Delivers**
1. Sarah logs in at http://localhost:5176
2. Email: sarah@delivery.com
3. Password: rider2024
4. Sees available orders
5. Accepts first delivery
6. Starts earning!

---

## 🎯 Quick Reference

### URLs
- **Public Homepage**: http://localhost:5174
- **Restaurant Dashboard**: http://localhost:5175
- **Rider Dashboard**: http://localhost:5176
- **Admin Dashboard**: http://localhost:5177
- **Backend API**: http://localhost:8000

### Who Can Self-Register?
- ✅ **Customers**: Yes, instant access
- ❌ **Restaurant Owners**: No, must apply
- ❌ **Riders**: No, must apply
- ❌ **Admins**: No, pre-created only

### Application Process
1. **Submit** → 2. **Review** → 3. **Approve** → 4. **Login**

### Default Admin Credentials
- **Email**: admin@foodhub.com
- **Password**: admin123

---

## 🚀 Getting Started Checklist

### For Testing
- [ ] Backend running on port 8000
- [ ] Customer app running on port 5174
- [ ] Admin dashboard running on port 5177
- [ ] Database table `access_requests` created
- [ ] Admin account exists

### Test Restaurant Application
- [ ] Visit homepage
- [ ] Click "Restaurant Owner?"
- [ ] Fill and submit form
- [ ] Login to admin
- [ ] Approve request
- [ ] Login with new credentials

### Test Rider Application
- [ ] Visit homepage
- [ ] Click "Become a Rider"
- [ ] Fill and submit form
- [ ] Login to admin
- [ ] Approve request
- [ ] Login with new credentials

---

## 💡 Tips & Best Practices

### For Applicants
- ✅ Use a valid email address
- ✅ Provide accurate information
- ✅ Check spam folder for approval emails
- ✅ Keep your temporary password safe

### For Admins
- ✅ Review applications thoroughly
- ✅ Use strong temporary passwords
- ✅ Add clear admin notes
- ✅ Respond within 2-3 business days
- ✅ Be professional in rejection reasons

---

## ❓ Troubleshooting

### "Email already registered"
- This email is already in use
- Try a different email address
- Or contact admin if it's your email

### "You already have a pending request"
- Your application is being reviewed
- Wait for admin response
- Don't submit duplicate requests

### Can't login after approval
- Check email and password carefully
- Make sure you're on the correct URL
- Contact admin if issues persist

### Request not showing in admin
- Refresh the page
- Check if backend is running
- Verify database connection

---

## 🎉 Success!

You now have a complete understanding of the public homepage and authentication system!

**Key Takeaways:**
- 🏠 One public homepage for everyone
- 👥 Customers can self-register
- 🍽️ Restaurant owners must apply
- 🚴 Riders must apply
- 👨‍💼 Admins approve all applications
- 🔐 Secure, controlled access for all

**Happy ordering, cooking, and delivering!** 🚀
