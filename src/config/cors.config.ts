const whitelist = ['http://localhost:3000', 'https://yourfrontend.com'];

export const CorsConfig = {
  origin: (
    origin: ['https://nestkit-backend.onrender.com'],
    callback: (err: Error | null, allow?: boolean) => void,
  ) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Accept, Authorization',
};
