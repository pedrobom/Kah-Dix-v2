require('dotenv').config()

module.exports = {
  url: process.env.DB_URL,
  dialect: 'postgres',
  define: {
    timestamps: true,
    underscore: true,
  },
}