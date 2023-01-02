module.exports = {
  port: 8081,
  db: {
    prod:
      process.env.DATABASE_URL || 'mongodb://localhost/react-crud',
    test: 'mongodb://localhost/react-crud_test',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'development_secret',
    expiry: '7d',
  },
  clientUrl: 'http://localhost:3000',
};
