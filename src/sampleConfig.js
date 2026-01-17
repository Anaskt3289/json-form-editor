export const sampleConfig = {
  appName: 'My Application',
  version: '1.0.0',
  isProduction: false,
  server: {
    host: 'localhost',
    port: 3000,
    ssl: {
      enabled: true,
      certificate: '/path/to/cert.pem',
      key: '/path/to/key.pem',
    },
  },
  database: {
    type: 'postgresql',
    connection: {
      host: 'db.example.com',
      port: 5432,
      database: 'myapp',
      username: 'admin',
      password: 'secret123',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
  features: {
    authentication: {
      enabled: true,
      providers: ['local', 'oauth2', 'saml'],
      sessionTimeout: 3600,
    },
    caching: {
      enabled: true,
      ttl: 300,
      strategy: 'redis',
    },
  },
  integrations: [
    {
      name: 'Payment Gateway',
      type: 'stripe',
      apiKey: 'sk_test_123456',
      enabled: true,
    },
    {
      name: 'Email Service',
      type: 'sendgrid',
      apiKey: 'SG.abc123',
      enabled: false,
    },
  ],
  logging: {
    level: 'info',
    destinations: ['console', 'file'],
    file: {
      path: '/var/log/app.log',
      maxSize: '10MB',
      maxFiles: 5,
    },
  },
};
