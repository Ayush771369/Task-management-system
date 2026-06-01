import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import authRoutes from './routes/index.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger.js';


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use('/api/v1', authRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API Running Successfully'
    })
});

export default app;