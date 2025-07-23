import { Router } from 'express';
import authRoutes from './auth';
import productRoutes from './products';
import orderRoutes from './orders';

const router = Router();

// Health check route
router.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'E-commerce API'
  });
});

// API Routes
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

// API documentation endpoint
router.get('/docs', (req, res) => {
  res.json({
    message: 'E-commerce API Documentation',
    version: '1.0.0',
    endpoints: {
      auth: {
        'POST /api/auth/register': 'Register a new user',
        'POST /api/auth/login': 'Login user',
        'GET /api/auth/profile': 'Get user profile (Protected)',
        'PUT /api/auth/profile': 'Update user profile (Protected)'
      },
      products: {
        'GET /api/products': 'Get all products with pagination and filtering',
        'GET /api/products/:id': 'Get single product',
        'POST /api/products': 'Create product (Admin only)',
        'PUT /api/products/:id': 'Update product (Admin only)',
        'DELETE /api/products/:id': 'Delete product (Admin only)',
        'GET /api/products/top/rated': 'Get top rated products',
        'GET /api/products/categories/all': 'Get all categories'
      },
      orders: {
        'POST /api/orders': 'Create new order (Protected)',
        'GET /api/orders/:id': 'Get order by ID (Protected)',
        'PUT /api/orders/:id/pay': 'Update order to paid (Protected)',
        'PUT /api/orders/:id/deliver': 'Update order to delivered (Admin only)',
        'GET /api/orders/my/orders': 'Get user orders (Protected)',
        'GET /api/orders': 'Get all orders (Admin only)'
      }
    }
  });
});

export default router;
