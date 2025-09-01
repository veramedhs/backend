import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from "path"

import cors from 'cors';
import { ENV } from './config/ENV.js';
import connectDB from './config/db.js';

const app = express();

//Veramed routes imports
import contactRoutes from './routes/veramed_routes/contact.routes.js';
import collaborationRoutes from './routes/veramed_routes/collaborate.routes.js';
import hospitalRoutes from './routes/medical_assistant_routes/hospital.routes.js';
import authRoutes from './routes/dashboard_routes/auth.routes.js';
import servicesRotes from "./routes/veramed_routes/services.route.js"
import consultationRoute from "./routes/veramed_routes/consultation.route.js"
import reviewRoutes from "./routes/veramed_routes/review.routes.js"
import galleryRoutes from "./routes/veramed_routes/gallery.routes.js"
import arahmContactRoutes from "./routes/arahm/contact.routes.js"
import embassyContactRoutes from "./routes/arahm/embassyContact.route.js"
import emergencyContactRoutes from "./routes/arahm/EmergencyContact.routes.js"
import blogRoutes from "./routes/dashboard_routes/blogs.routes.js"

import careerRoutes from "./routes/veramed_it_routes/career.routes.js"
import consultationRoutes from './routes/veramed_it_routes/consultation.routes.js';
import estimateRoutes from './routes/veramed_it_routes/estimate.routes.js';
import itContactRoutes from './routes/veramed_it_routes/contact.routes.js';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
  res.send("✅ Veramed Health API is running.");
});

app.use('/api/v1/veramed', contactRoutes);
app.use('/api/v1/veramed', collaborationRoutes);
app.use('/api/v1/veramed', servicesRotes);
app.use('/api/v1/veramed', consultationRoute);
app.use('/api/v1/veramed', reviewRoutes);
app.use('/api/v1/veramed', galleryRoutes);


app.use('/api/v1/medical_assistant', hospitalRoutes);


app.use('/api/v1/dashboard', authRoutes);
app.use('/api/v1/dashboard', blogRoutes);



app.use('/api/v1/arahm', arahmContactRoutes)
app.use('/api/v1/arahm', embassyContactRoutes)
app.use('/api/v1/arahm', emergencyContactRoutes)


app.use('/api/v1/veramed-it', careerRoutes)
app.use('/api/v1/veramed-it', consultationRoutes)
app.use('/api/v1/veramed-it', estimateRoutes)
app.use('/api/v1/veramed-it', itContactRoutes)



// Connect to MongoDB first, then start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`🚀 Server started on PORT: ${ENV.PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB. Server not started.');
  }
};

startServer();
