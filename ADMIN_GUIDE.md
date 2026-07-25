# FoodZone Admin Dashboard - Complete Guide

## Overview

The FoodZone Admin Dashboard is a comprehensive management system for controlling all aspects of your ecommerce store. It includes real-time analytics, product management, order tracking, customer insights, and more.

## Access & Login

### Admin Login Credentials (Demo)
- **Email:** `admin@foodzone.com`
- **Password:** `password123`
- **Role:** Full Admin Access

### Alternative Demo Accounts
- **Manager Email:** `manager@foodzone.com` - Can manage products, orders, customers
- **Staff Email:** `staff@foodzone.com` - Can view orders and customer information

### Access URL
```
https://your-domain.com/admin
```

The admin panel automatically redirects unauthenticated users to the login page.

---

## Dashboard Overview

### Main Dashboard (`/admin`)

The dashboard provides a comprehensive overview of your store's performance with:

#### Key Metrics
1. **Total Revenue** - Cumulative revenue from all orders
2. **Total Orders** - Count of all orders placed
3. **Total Customers** - Unique customer count
4. **Total Products** - Number of products in catalog
5. **Average Order Value** - Mean spending per order

#### Analytics Charts
1. **Revenue Trend** - Line chart showing revenue by month with order overlay
2. **Top Selling Product** - Widget displaying best performer with sales and revenue
3. **Orders by Month** - Bar chart for monthly order trends

#### Quick Actions
- Add New Product
- View Orders
- View Customers

---

## Product Management

### Products Page (`/admin/products`)

Manage your complete product catalog with features including:

#### Features
- **Search** - Find products by name
- **Add Product** - Create new products
- **Edit Products** - Update product details and status
- **Delete Products** - Remove discontinued products
- **View Details** - Stock levels, pricing, ratings

#### Product Information Tracked
- Product Name
- Category (Snacks, Beverages, Dairy)
- Price and Stock Levels
- Customer Rating and Review Count
- Status (Active, Inactive, Discontinued)
- Creation and Update Dates

#### Creating a New Product

1. Click "Add Product" button
2. Fill in the form:
   - **Product Name** - Required
   - **Category** - Select from dropdown
   - **Price** - In USD
   - **Stock** - Number of units available
   - **Rating** - 0-5 stars
   - **Status** - Active/Inactive/Discontinued
   - **Description** - Product details
3. Click "Create Product"

#### Updating Products

1. Go to Products page
2. Find the product in the table
3. Click the Edit (pencil) icon
4. Modify the fields
5. Save changes

#### Managing Stock

- Red stock indicator shows out-of-stock items
- Green indicator shows available stock
- Update stock directly from the edit page

---

## Order Management

### Orders Page (`/admin/orders`)

Complete order tracking and fulfillment system:

#### Features
- **Real-time Status Updates** - Change order status with dropdown
- **Payment Tracking** - Monitor payment status (Paid, Pending, Failed)
- **Filtering** - Filter by status (Pending, Processing, Shipped, Delivered)
- **Customer Details** - View customer info with each order
- **Order Details** - Click "View" to see full order information

#### Order Status Workflow

```
Pending → Processing → Shipped → Delivered
                    ↓
                Cancelled (if needed)
```

**Status Guide:**
- **Pending** - Awaiting payment confirmation (yellow)
- **Processing** - Payment received, preparing shipment (blue)
- **Shipped** - In transit to customer (purple)
- **Delivered** - Successfully received by customer (green)
- **Cancelled** - Order was cancelled (red)

#### Payment Status
- **Paid** - Payment received (green)
- **Pending** - Awaiting payment confirmation (yellow)
- **Failed** - Payment declined (red)

#### Updating Order Status

1. Go to Orders page
2. Find the order in the table
3. Click the Status dropdown
4. Select new status
5. Changes are saved automatically

#### Order Details View (`/admin/orders/:id`)

Shows complete order information including:
- Customer name and email
- Items purchased with quantities and prices
- Total order amount
- Current status and payment status
- Order dates

---

## Customer Management

### Customers Page (`/admin/customers`)

Understand and manage your customer base:

#### Features
- **Customer Overview** - View all registered customers
- **Purchase History** - Total orders and spending per customer
- **Status Management** - Activate/deactivate customers
- **Join Date Tracking** - See when customers registered
- **Customer Segmentation** - Active vs inactive breakdown

#### Customer Information Tracked
- Customer Name and Email
- Phone Number (if provided)
- Total Orders Count
- Total Amount Spent
- Account Status (Active/Inactive)
- Join Date and Last Order Date

#### Viewing Customer Details (`/admin/customers/:id`)

Click "View" to see:
- Complete customer profile
- Order history and spending patterns
- Contact information
- Account creation and activity dates

#### Managing Customer Status

1. Go to Customers page
2. Find the customer in the table
3. Click the Status badge to toggle Active/Inactive
4. Changes apply immediately

#### Customer Segments (Shown on Dashboard)
- **Total Customers** - All registered customers
- **Active Customers** - Customers who can place orders
- **Inactive Customers** - Disabled customer accounts

---

## Store Settings

### Settings Page (`/admin/settings`)

Configure essential store parameters:

#### Store Information
- **Store Name** - Display name for your store
- **Store Email** - Primary contact email
- **Store Phone** - Customer service phone number

#### Business Settings
- **Currency** - Select currency (USD, EUR, GBP, INR)
- **Tax Rate (%)** - Applied to all orders
- **Shipping Cost** - Flat shipping fee for orders

#### Maintenance Mode
- **Enable/Disable** - Toggle maintenance mode
- **Effect** - Customers cannot access store when enabled
- **Use Case** - System updates, restocking, maintenance

#### Saving Settings
1. Modify the fields
2. Click "Save Settings"
3. Confirmation message appears
4. Changes take effect immediately

---

## Dashboard Analytics

### Revenue Analysis

#### Monthly Revenue Tracking
- Revenue by month visualization
- Order count trends
- Seasonal pattern identification
- Growth analysis

#### Revenue Metrics
- **Total Revenue** - All-time accumulated revenue
- **Average Order Value** - Mean spending per transaction
- **Top Product** - Best-selling product with revenue contribution

### Customer Analytics

#### Engagement Metrics
- Active vs inactive customers
- Customer growth trends
- Repeat purchase rates
- Customer lifetime value

#### Order Analytics
- Total orders by status
- Order fulfillment tracking
- Payment success rates
- Average order value trends

---

## Admin Users Management

### User Roles & Permissions

#### Role Types

1. **Admin**
   - Full access to all features
   - Can create, edit, delete products
   - Can manage orders and customers
   - Can configure settings
   - Can manage admin users

2. **Manager**
   - View and manage orders
   - View and manage products
   - View customer information
   - Cannot change settings
   - Cannot manage admin users

3. **Staff**
   - View orders
   - View products
   - View customer information
   - No edit/delete permissions

### Adding New Admin Users

1. Go to Admin Users section (if available in full version)
2. Click "Add Admin User"
3. Enter:
   - Email address
   - Name
   - Select Role
   - Assign Permissions
4. Send invitation link to user

### Managing Admin Users

- **View Users** - List all admin users with roles
- **Edit** - Change user role and permissions
- **Deactivate** - Temporarily disable user access
- **Delete** - Remove admin user

---

## Activity Logging

### Activity Logs

Track all administrative actions:

#### Logged Actions
- Product creation, updates, deletion
- Order status changes
- Settings modifications
- Customer status updates
- User access and login times

#### Viewing Logs

1. Check "Activity" section in dashboard
2. View recent actions with:
   - Admin user who performed action
   - Action type
   - Timestamp
   - Details of change

#### Use Cases
- Audit trail for compliance
- Troubleshooting changes
- Understanding user actions
- Accountability tracking

---

## Best Practices

### Product Management
✓ Keep product descriptions detailed and accurate
✓ Update stock levels regularly
✓ Use consistent category names
✓ Remove discontinued products to avoid confusion
✓ Monitor low stock alerts

### Order Management
✓ Update order status promptly
✓ Communicate status changes to customers
✓ Verify payment before processing
✓ Handle cancellations gracefully
✓ Keep customer service contact info handy

### Customer Management
✓ Maintain accurate customer data
✓ Deactivate old inactive accounts periodically
✓ Track customer feedback and issues
✓ Monitor repeat customers for loyalty programs
✓ Use customer data for targeted marketing

### Store Settings
✓ Review and update pricing regularly
✓ Keep contact information current
✓ Test maintenance mode before using
✓ Adjust tax and shipping rates as needed
✓ Document setting changes

---

## Troubleshooting

### Common Issues

#### Cannot Access Admin Dashboard
- Verify you're logged in with admin account
- Check user role and permissions
- Clear browser cache
- Try different browser

#### Changes Not Saving
- Ensure internet connection is stable
- Check browser console for errors
- Verify user has permission for action
- Try refreshing the page

#### Slow Dashboard Performance
- Clear browser cache
- Reduce number of open tabs
- Check internet connection speed
- Refresh the page

#### Missing Products/Orders
- Verify filters are not hiding items
- Check pagination settings
- Search for specific items
- Contact development team if persists

---

## Data Migration Guide

### Replacing Mock Data with Backend

When ready to integrate with Spring Boot backend:

#### Step 1: Update Admin Services
File: `/services/admin.ts`

Replace mock data functions with API calls:

```typescript
// Before (Mock)
export const getAdminProducts = async () => {
  return ADMIN_PRODUCTS
}

// After (Real API)
export const getAdminProducts = async () => {
  const response = await fetch('https://api.your-domain.com/admin/products')
  return response.json()
}
```

#### Step 2: Update Auth Service
File: `/services/auth.ts`

Replace JWT mock generation with backend verification:

```typescript
// Connect to Spring Boot auth endpoints:
POST /api/auth/send-otp
POST /api/auth/verify-otp
POST /api/admin/verify-token
```

#### Step 3: Required Backend Endpoints

```
GET    /api/admin/dashboard
GET    /api/admin/products
GET    /api/admin/products/:id
POST   /api/admin/products
PUT    /api/admin/products/:id
DELETE /api/admin/products/:id

GET    /api/admin/orders
GET    /api/admin/orders/:id
PUT    /api/admin/orders/:id

GET    /api/admin/customers
GET    /api/admin/customers/:id
PUT    /api/admin/customers/:id

GET    /api/admin/users
POST   /api/admin/users
PUT    /api/admin/users/:id
DELETE /api/admin/users/:id

GET    /api/admin/logs
PUT    /api/admin/settings
GET    /api/admin/settings
```

---

## Support & Resources

### Getting Help
- Check this documentation first
- Review inline help tooltips
- Contact development team for bugs
- Check server logs for errors

### Development References
- `/services/admin.ts` - API service functions
- `/hooks/useAdmin.ts` - React Query hooks
- `/types/admin.ts` - TypeScript types
- `/mock/admin-data.ts` - Mock data

---

## Version History

- **v1.0** (Current)
  - Dashboard with analytics
  - Product management
  - Order management
  - Customer management
  - Store settings
  - Admin user management
  - Activity logging
