// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'justinberry',
      password: 'password',
      database: 'cjswebstore',
      charset: 'utf8',
    }
  },
  test: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'justinberry',
      password: 'password',
      database: 'cjswebstoretest',
      charset: 'utf8'
    }
  },

};
