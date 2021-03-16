// const express = require('express');
// const app = express();
// const session = require('express-session');
// const fs = require('fs');

// app.use(
//   session({
//     secret: 'secret code',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false,
//       maxAge: 1000 * 60 * 60, //쿠기 유효시간 1시간
//     },
//   })
// );

// app.use(
//   express.json({
//     limit: '50mb',
//   })
// );

// const server = app.listen(3000, () => {
//   console.log('Server started. port 3000.');
// });

// let sql = require('./sql.js');

// fs.watchFile(__dirname + '/sql.js', (curr, prev) => {
//   console.log('sql 변경시 재시작 없이 반영되도록 함.');
//   delete require.cache[require.resolve('./sql.js')];
//   sql = require('./sql.js');
// });

// const db = {
//   database: 'dev_class',
//   connectionLimit: 10,
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'mariadb',
// };

// const dbPool = require('mysql').createPool(db);

// app.post('/api/login', async (request, res) => {
//   // request.session['email'] = 'seungwon.go@gmail.com';
//   // res.send('ok');
//   try {
//     await req.db('signUp', request.body.param);
//     if (request.body.param.length > 0) {
//       for (let key in request.body.param[0]) request.session[key] = request.body.param[0][key];
//       res.send(request.body.param[0]);
//     } else {
//       res.send({
//         error: 'Please try again or contact system manager.',
//       });
//     }
//   } catch (err) {
//     res.send({
//       error: 'DB access error',
//     });
//   }
// });

// app.post('/api/logout', async (request, res) => {
//   request.session.destroy();
//   res.send('ok');
// });

// app.post('/upload/:productId/:type/:fileName', async (request, res) => {
//   let { productId, type, fileName } = request.params;
//   const dir = `${__dirname}/uploads/${productId}`;
//   const file = `${dir}/${fileName}`;
//   if (!request.body.data)
//     return fs.unlink(file, async (err) =>
//       res.send({
//         err,
//       })
//     );
//   const data = request.body.data.slice(request.body.data.indexOf(';base64,') + 8);
//   if (!fs.existsSync(dir)) fs.mkdirSync(dir);
//   fs.writeFile(file, data, 'base64', async (error) => {
//     await req.db('productImageInsert', [
//       {
//         product_id: productId,
//         type: type,
//         path: fileName,
//       },
//     ]);

//     if (error) {
//       res.send({
//         error,
//       });
//     } else {
//       res.send('ok');
//     }
//   });
// });

// app.get('/download/:productId/:fileName', (request, res) => {
//   const { productId, type, fileName } = request.params;
//   const filepath = `${__dirname}/uploads/${productId}/${fileName}`;
//   res.header('Content-Type', `image/${fileName.substring(fileName.lastIndexOf('.'))}`);
//   if (!fs.existsSync(filepath))
//     res.send(404, {
//       error: 'Can not found file.',
//     });
//   else fs.createReadStream(filepath).pipe(res);
// });

// app.post('/apirole/:alias', async (request, res) => {
//   if (!request.session.email) {
//     return res.status(401).send({
//       error: 'You need to login.',
//     });
//   }

//   try {
//     res.send(await req.db(request.params.alias));
//   } catch (err) {
//     res.status(500).send({
//       error: err,
//     });
//   }
// });

// app.post('/api/:alias', async (request, res) => {
//   try {
//     res.send(await req.db(request.params.alias, request.body.param, request.body.where));
//   } catch (err) {
//     res.status(500).send({
//       error: err,
//     });
//   }
// });

// const req = {
//   async db(alias, param = [], where = '') {
//     return new Promise((resolve, reject) =>
//       dbPool.query(sql[alias].query + where, param, (error, rows) => {
//         if (error) {
//           if (error.code != 'ER_DUP_ENTRY') console.log(error);
//           resolve({
//             error,
//           });
//         } else resolve(rows);
//       })
//     );
//   },
// };

const express = require('express');
const app = express();
const session = require('express-session');
const fs = require('fs');

app.use(
  session({
    secret: 'secret code',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60, // 쿠키 유효시간 1시간
    },
  })
);

app.use(
  express.json({
    limit: '50mb',
  })
);

const server = app.listen(3000, () => {
  console.log('Server started. port 3000.');
});

let sql = require('./sql.js');

fs.watchFile(__dirname + '/sql.js', (curr, prev) => {
  console.log('sql 변경시 재시작 없이 반영되도록 함.');
  delete require.cache[require.resolve('./sql.js')]; // fs 모듈을 통해서 sql.js 파일을 watchFile로 감시하고, 변경이 일어나면 기존에 캐시에 올라가 있는 sql.js를 삭제하고 변경된 파일을 다시 담아줌
  sql = require('./sql.js');
}); // 실무에서 많이 쓰는 코드

const db = {
  database: 'dev_class',
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: 'mariadb',
};

const dbPool = require('mysql').createPool(db); //db 연동

app.post('/api/login', async (request, res) => {
  // request.session['email'] = 'kei02012@naver.com';
  // res.send('ok');
  try {
    await req.db('signUp', request.body.param);
    if (request.body.param.length > 0) {
      for (let key in request.body.param[0]) request.session[key] = request.body.param[0][key];
      res.send(request.body.param[0]);
    } else {
      res.send({
        error: 'Please try again or contact system manager.',
      });
    }
  } catch (err) {
    res.send({
      error: 'DB access error',
    });
  }
});

app.post('/api/logout', async (request, res) => {
  request.session.destroy();
  res.send('ok');
});

// 클라이언트에서 서버로 데이터를 넣거나 받기위한 요청이 들어올때, 실제로 아까 만든 sql.js에 이 쿼리를 어떻게 불러와서 데이터를 받아오는지 구현해본다

app.post('/api/:alias', async (request, res) => {
  // if (!request.session.email) {
  //   return res.status(401).send({ error: 'You need to login.' });
  // }
  try {
    res.send(await req.db(request.params.alias, request.body.param));
  } catch (err) {
    res.status(500).send({
      error: err,
    });
  }
});

const req = {
  async db(alias, param = [], where = '') {
    return new Promise((resolve, reject) =>
      dbPool.query(sql[alias].query + where, param, (error, rows) => {
        if (error) {
          if (error.code != 'ER_DUP_ENTRY') console.log(error);
          resolve({
            error,
          });
        } else resolve(rows);
      })
    );
  },
};
