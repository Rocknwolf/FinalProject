db.createUser({
    user: 'master',
    pwd: 'desater',
    roles: [
      {
        role: 'readWrite',
        db: 'admin',
      }
    ]
  });