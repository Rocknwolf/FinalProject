// routes/router.js

// router.post('/login', (req, res, next) => {
//     db.query(
//       `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
//       (err, result) => {
//         // user does not exists
//         if (err) {
//           throw err;
//           return res.status(400).send({
//             msg: err
//           });
//         }
  
//         if (!result.length) {
//           return res.status(401).send({
//             msg: 'Username or password is incorrect!'
//           });
//         }
  
//         // check password
//         bcrypt.compare(
//           req.body.password,
//           result[0]['password'],
//           (bErr, bResult) => {
//             // wrong password
//             if (bErr) {
//               throw bErr;
//               return res.status(401).send({
//                 msg: 'Username or password is incorrect!'
//               });
//             }
  
//             if (bResult) {
//               const token = jwt.sign({
//                   username: result[0].username,
//                   userId: result[0].id
//                 },
//                 'SECRETKEY', {
//                   expiresIn: '24h'
//                 }
//               );
  
//               db.query(
//                 `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
//               );
//               return res.status(200).send({
//                 msg: 'Logged in!',
//                 token,
//                 user: result[0]
//               });
//             }
//             return res.status(401).send({
//               msg: 'Username or password is incorrect!'
//             });
//           }
//         );
//       }
//     );
//   });