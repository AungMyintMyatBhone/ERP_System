# 🏢 ERP System - Enterprise Resource Planning

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/atlas)

A comprehensive Enterprise Resource Planning (ERP) system built with React 18 frontend and Node.js backend, integrated with MongoDB Atlas for persistent data storage.

## 🚀 Features

### Core Modules
- **Dashboard** - Overview of business metrics and recent activities
- **Customer Management** - Complete customer database with contact information
- **Inventory Management** - Stock tracking, low-stock alerts, and supplier management
- **Sales Management** - Order processing, sales tracking, and revenue analytics
- **Financial Management** - Transaction tracking, profit/loss, and financial reporting
- **HR Management** - Employee records, department management, and organizational structure

### Key Features
- 🔐 **Secure Authentication** - Role-based access control
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Clean, intuitive interface with Material Design
- 📊 **Real-time Analytics** - Dashboard with key business metrics
- 🔍 **Advanced Search** - Search and filter across all modules
- 📈 **Data Visualization** - Charts and graphs for business insights
- 💾 **Data Export** - Export data to CSV for external analysis
- 🔔 **Notifications** - Alert system for important business events

## 🛠️ Technology Stack

- **Frontend**: React 18, Material-UI 5, React Router 6
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (Cloud Database)
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: React Context API
- **Styling**: Material-UI, Emotion, CSS-in-JS
- **Charts**: Recharts
- **Date Handling**: date-fns
- **HTTP Client**: Axios
- **Build Tool**: Create React App

## 🗄️ Database Configuration

### MongoDB Atlas Setup
The system is connected to MongoDB Atlas cloud database:
- **Cluster**: Cluster0.8cat7vu.mongodb.net
- **Database**: erp_system
- **Connection**: Secure connection with authentication
- **Collections**: Customers, Inventory, Sales, Transactions, Employees

### Backend Server
- **Port**: 5001
- **API Base**: http://localhost:5001/api
- **Environment**: Development with MongoDB Atlas

## 📦 Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- Git

### Setup Instructions

1. **Clone the repository from GitHub**
   ```bash
   git clone https://github.com/AungMyintMyatBhone/ERP_System.git
   cd ERP_System
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Start the backend server**
   ```bash
   cd server
   npm start
   ```
   Server will run on http://localhost:5001

5. **Start the frontend application**
   ```bash
   npm start
   ```
   Application will run on http://localhost:3001

6. **Access the application**
   Navigate to `http://localhost:3001`

## 🔐 Default Login Credentials

The system comes with demo accounts for testing:

### Administrator Account
- **Email**: admin@erp.com
- **Password**: admin123
- **Permissions**: Full system access

### Manager Account
- **Email**: manager@erp.com
- **Password**: manager123
- **Permissions**: Limited to customers, inventory, and sales modules

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/                 # Authentication components
│   ├── common/               # Reusable UI components
│   ├── dashboard/            # Dashboard and navigation
│   └── modules/              # Core business modules
├── contexts/                 # React Context providers
├── data/                     # Mock data and constants
├── services/                 # API services and HTTP client
├── styles/                   # Global styles and themes
├── utils/                    # Utility functions and helpers
├── App.js                    # Main application component
└── index.js                  # Application entry point
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_VERSION=1.0.0
REACT_APP_ENVIRONMENT=development
```

### API Integration
The application is designed to work with a REST API. Update the API endpoints in `src/services/api.js` to connect to your backend server.

## 📊 Module Overview

### Dashboard
- Real-time business metrics
- Recent activity feed
- Quick action buttons
- Notification center

### Customer Management
- Customer database with contact details
- Search and filter capabilities
- Customer status tracking
- Order history integration

### Inventory Management
- Product catalog with SKU tracking
- Stock level monitoring
- Low-stock alerts
- Supplier information
- Location-based inventory

### Sales Management
- Order creation and processing
- Sales pipeline tracking
- Revenue analytics
- Customer order history
- Payment tracking

### Financial Management
- Income and expense tracking
- Profit/loss calculations
- Transaction categorization
- Financial reporting
- Account balance monitoring

### HR Management
- Employee database
- Department organization
- Salary management
- Employee status tracking
- Hiring date records

## 🎨 Customization

### Theming
Modify the theme in `src/index.js` to customize colors, fonts, and spacing:

```javascript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Your primary color
    },
    secondary: {
      main: '#dc004e', // Your secondary color
    },
  },
});
```

### Adding New Modules
1. Create a new component in `src/components/modules/`
2. Add the route in `src/App.js`
3. Update the navigation menu in `src/components/dashboard/Dashboard.js`
4. Add corresponding API services in `src/services/api.js`

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature set with sidebar navigation
- **Tablet**: Collapsible navigation with touch-friendly interface
- **Mobile**: Stack layout with mobile-optimized components

## 🔒 Security Features

- JWT-based authentication
- Protected routes
- Role-based access control
- Secure API communication
- Session management
- Automatic logout on token expiration

## 📈 Performance Optimization

- Code splitting with React.lazy()
- Memoized components with React.memo()
- Optimized re-renders with useCallback and useMemo
- Efficient state management
- Lazy loading of images and components

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Deployment Options
- **Netlify**: Connect your GitHub repo for automatic deployments
- **Vercel**: Zero-config deployment with custom domains
- **AWS S3**: Static hosting with CloudFront CDN
- **Docker**: Containerized deployment for any cloud provider

## 📝 API Documentation

The application expects the following API endpoints:

```
GET    /api/customers           # Get all customers
POST   /api/customers           # Create new customer
PUT    /api/customers/:id       # Update customer
DELETE /api/customers/:id       # Delete customer

GET    /api/inventory           # Get all inventory items
POST   /api/inventory           # Create new item
PUT    /api/inventory/:id       # Update item
DELETE /api/inventory/:id       # Delete item

GET    /api/sales               # Get all sales
POST   /api/sales               # Create new sale
PUT    /api/sales/:id           # Update sale
DELETE /api/sales/:id           # Delete sale

GET    /api/financial/transactions  # Get transactions
POST   /api/financial/transactions  # Create transaction

GET    /api/hr/employees        # Get all employees
POST   /api/hr/employees        # Create new employee
PUT    /api/hr/employees/:id    # Update employee
DELETE /api/hr/employees/:id    # Delete employee
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@yourcompany.com
- Documentation: [Wiki](https://github.com/your-repo/erp-system/wiki)

## 🚧 Roadmap

### Upcoming Features
- [ ] Advanced reporting and analytics
- [ ] Email integration
- [ ] Mobile app (React Native)
- [ ] Advanced user permissions
- [ ] Data import/export tools
- [ ] Multi-language support
- [ ] Dark theme option
- [ ] Advanced search with filters
- [ ] Audit trail and logging
- [ ] Integration with external APIs

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE 11+ (limited support)

## 👨‍💻 Author

**Aung Myint Myat Bhone**
- GitHub: [@AungMyintMyatBhone](https://github.com/AungMyintMyatBhone)
- Repository: [ERP_System](https://github.com/AungMyintMyatBhone/ERP_System)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Built with ❤️ by Totals Inc**
