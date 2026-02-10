# React CRUD App

A modern, full-featured User Management application built with React, Tailwind CSS, and JSON Server. Features a sleek card-based interface, smooth animations, and real-time validation.

## 🌟 Features

### Core Functionality
- **Complete CRUD Operations**: Create, Read, Update, and Delete users with ease
- **Dynamic Form System**: Configuration-driven forms (`DynamicForm`) that allow adding new fields without code changes
- **Real-time Validation**: Regex-based validation for emails, phone numbers, and names with instant feedback 
- **Toast Notifications**: User-friendly success/error messages using `react-toastify`

### UI/UX Excellence
- **Modern Card Design**: Elegant card-style user add/edit forms with shadow effects and hover states
- **Smooth Animations**: Page transitions and loading states powered by `tailwindcss-animated`
- **Loading Indicators**: Professional loading animations during data fetch and submission
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile
- **Clean Interface**: Minimalist design with Tailwind CSS v4 for optimal user experience

### Technical Highlights
- **Component Architecture**: Reusable, modular components for maintainability
- **Extensible Configuration**: Easy to add new form fields via configuration objects
- **API Integration**: RESTful API communication with JSON Server backend
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Performance Optimized**: Efficient rendering and state management

## 🚀 Live Demo

- **Frontend**: [crud-operations-self-eight.vercel.app](https://crud-operations-self-eight.vercel.app)
- **Backend API**: [crud-operation-json-server.onrender.com](https://crud-operation-json-server.onrender.com)  

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/krishnaraj-fsd/react-crud-app.git
cd react-crud-app
```

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```

The backend will run on `http://localhost:5000`

**Backend Dependencies:**
- `json-server`: Mock REST API
- `cors`: Cross-origin resource sharing
- `nodemon`: Auto-restart on file changes

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend will run on `http://localhost:5173` (Vite default)

**Frontend Dependencies:**
- `react`: UI library
- `react-dom`: React DOM rendering
- `tailwindcss`: Utility-first CSS framework
- `tailwindcss-animated`: Animation utilities
- `react-toastify`: Toast notifications
- `axios`: HTTP client
- `vite`: Build tool and dev server

## 🌐 Deployment

### Frontend Deployment (Vercel)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure build settings:
     - **Framework Preset**: Vite
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
   - Add environment variable (now directly used in api/users.js):
     - `API_BASE_URL`: Your Render backend URL
   - Click "Deploy"

3. **Update API URL in Frontend**
   ```javascript
   // frontend/src/api/users.js
   API_BASE_URL=https://your-backend.onrender.com
   ```

### Backend Deployment (Render)

1. **Prepare backend for deployment**
   ```bash
   cd backend
   ```

2. **Update package.json**
   ```json
   {
     "scripts": {
       "start": "nodemon server.js"
     }
   }
   ```

3. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure service:
     - **Name**: your-app-backend
     - **Root Directory**: `backend`
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free (or paid for production)
   - Click "Create Web Service"

4. **Configure CORS**
   ```javascript
   // backend/server.js
   const cors = require('cors');
   app.use(cors({
     origin: ['https://your-app.vercel.app', 'http://localhost:5173']
   }));
   ```

## 📁 Project Structure

```
react-crud-app/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── users.js             # API service
│   │   ├── core/
│   │   │   └── Footer.jsx           # Header/Footer
│   │   ├── components/
│   │   │   └── DynamicForm.jsx      # Reusable form component
│   │   ├── pages/
│   │   │   └── UserPage.jsx         # Main user listing (Page)
│   │   ├── router/
│   │   │   └── Router.jsx           # router
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/
│   ├── db.json                       # JSON Server database
│   ├── server.js                     # Custom server setup
│   └── package.json
└── README.md
```

## 🎨 UI Components

### Card-Style Forms
Forms are presented in elegant cards with:
- Subtle shadow effects
- Smooth hover transitions
- Clear visual hierarchy
- Responsive padding and spacing

### Loading Animations
- Spinner animations during API calls
- Skeleton loaders for content
- Smooth fade-in transitions
- Progress indicators for operations

### Toast Notifications
- Success messages (green)
- Error alerts (red)
- Info notifications (blue)
- Auto-dismiss with custom duration

## 🔧 Configuration

### Adding New Form Fields

Edit `frontend/src/config/formConfig.js`:

```javascript
export const userSchema = [
 {
      name: 'firstName',
      label: 'First Name',
      required: true,
      placeholder: 'Enter first name',
      pattern: "^[A-Za-z]+$",
      errorMessage: "First name should only contain letters"
},
  // Add new fields here
{
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      required: true,
      placeholder: 'Enter phone number',
      pattern: "^\\d{10}$",
      errorMessage: "Phone number must be 10 digits"
}
];
```

### Custom Validation Rules

Add to `frontend/src/utils/validation.js`:

```javascript
export const validationRules = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\d\s\-\+\(\)]{10,}$/,
  name: /^[A-Za-z\s]{2,30}$/,
  // Add custom rules
  zipCode: /^\d{5}(-\d{4})?$/
};
```


## 📦 Building for Production

### Frontend
```bash
cd frontend
npm run build
```
Output will be in `frontend/dist/`

### Backend
```bash
cd backend
npm install
```

## 🐛 Troubleshooting

### CORS Issues
- Ensure backend CORS is configured with frontend URL
- Check environment variables are set correctly

### API Connection Failed
- Verify backend is running
- Check `VITE_API_URL` environment variable
- Ensure network requests aren't blocked

### Build Failures
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Verify all environment variables are set


## 👨‍💻 Author

Krishnaraj
- GitHub: [@krishnaraj-fsd](https://github.com/krishnaraj-fsd)
- LinkedIn: [krishnaraj-fsd](https://linkedin.com/in/krishnaraj-fsd)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- JSON Server for the quick backend solution
- Vercel and Render for hosting platforms

## 📧 Support

For support, email krishnarajs2802@gmail.com or open an issue in the GitHub repository.

---

**Made with ❤️ using React and Tailwind CSS**
