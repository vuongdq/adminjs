require('dotenv').config();
const express = require('express');
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const formidableMiddleware = require('express-formidable');

// Import models
const User = require('./models/User');
const Category = require('./models/Category');
const Game = require('./models/Game');
const Score = require('./models/Score');
const PlayHistory = require('./models/PlayHistory');

// Đăng ký adapter cho AdminJS
AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
});

// Kết nối MongoDB với thông tin từ biến môi trường
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gamejs';

// Cấu hình kết nối MongoDB
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4
})
.then(() => {
  console.log('Successfully connected to MongoDB.');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1);
});

// Xử lý sự kiện kết nối
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// Xử lý khi ứng dụng kết thúc
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed through app termination');
  process.exit(0);
});

// Cấu hình AdminJS
const uploadFeature = {
  // Define upload settings
  upload: {
    mimeTypes: ['application/javascript', 'text/javascript', 'image/png', 'image/jpeg', 'image/gif'],
    maxSize: 5 * 1024 * 1024, // 5MB
  }
};

const adminJs = new AdminJS({
  resources: [
    {
      resource: User,
      options: {
        navigation: {
          name: 'User Management',
          icon: 'User',
        },
        properties: {
          password_hash: {
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: false,
            },
          },
        },
      },
    },
    {
      resource: Category,
      options: {
        navigation: {
          name: 'Category Management',
          icon: 'Category',
        },
      },
    },
    {
      resource: Game,
      options: {
        navigation: {
          name: 'Game Management',
          icon: 'Game',
        },
        properties: {
          title: {
            isTitle: true,
            isRequired: true,
          },
          description: {
            type: 'richtext',
          },
          category_id: {
            reference: 'Category',
            isRequired: true,
          },
          file_url: {
            type: 'mixed',
            isVisible: {
              list: true,
              edit: true,
              filter: false,
              show: true,
            },
            components: {
              edit: AdminJS.bundle('./components/upload-file'),
              list: AdminJS.bundle('./components/upload-file-list'),
            },
            custom: {
              uploadPath: '/uploads',
              mimeTypes: ['application/javascript', 'text/javascript'],
              maxSize: 5 * 1024 * 1024, // 5MB
            },
          },
          thumbnail_url: {
            type: 'mixed',
            isVisible: {
              list: true,
              edit: true,
              filter: false,
              show: true,
            },
            components: {
              edit: AdminJS.bundle('./components/upload-image'),
              list: AdminJS.bundle('./components/upload-image-list'),
            },
            custom: {
              uploadPath: '/uploads',
              mimeTypes: ['image/png', 'image/jpeg', 'image/gif'],
              maxSize: 5 * 1024 * 1024, // 5MB
            },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload.file_url) {
                request.payload.file_url = request.payload.file_url.path;
              }
              if (request.payload.thumbnail_url) {
                request.payload.thumbnail_url = request.payload.thumbnail_url.path;
              }
              return request;
            },
          },
          edit: {
            before: async (request) => {
              if (request.payload.file_url) {
                request.payload.file_url = request.payload.file_url.path;
              }
              if (request.payload.thumbnail_url) {
                request.payload.thumbnail_url = request.payload.thumbnail_url.path;
              }
              return request;
            },
          },
        },
      },
    },
    {
      resource: Score,
      options: {
        navigation: {
          name: 'Score Management',
          icon: 'Score',
        },
        properties: {
          user_id: {
            reference: 'User',
          },
          game_id: {
            reference: 'Game',
          },
        },
      },
    },
    {
      resource: PlayHistory,
      options: {
        navigation: {
          name: 'Play History',
          icon: 'History',
        },
        properties: {
          user_id: {
            reference: 'User',
          },
          game_id: {
            reference: 'Game',
          },
        },
      },
    },
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'Game Admin Panel',
    logo: false,
    softwareBrothers: false,
  },
});

// Tạo router cho AdminJS
const router = AdminJSExpress.buildRouter(adminJs);

// Khởi tạo Express app
const app = express();

// Cấu hình session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: parseInt(process.env.SESSION_COOKIE_MAX_AGE) || 86400000, // 24 hours
    },
  })
);

// Cấu hình upload directory
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
app.use('/uploads', express.static(path.join(__dirname, uploadDir)));

// Add formidable middleware for file uploads
app.use(formidableMiddleware({
  uploadDir: path.join(__dirname, uploadDir),
  keepExtensions: true,
  multiples: true,
}));

// Sử dụng AdminJS router
app.use(adminJs.options.rootPath, router);

// Khởi động server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`AdminJS is running at http://localhost:${PORT}/admin`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
}); 