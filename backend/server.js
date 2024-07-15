const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const notesDir = path.join(__dirname, 'notes');
if (!fs.existsSync(notesDir)) {
  fs.mkdirSync(notesDir);
}

const SECRET_KEY = 'your_secret_key';

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

app.post('/notes', authenticate, (req, res) => {
  const note = req.body;
  const notePath = path.join(notesDir, `${note.id}.md`);
  fs.writeFileSync(notePath, note.content, 'utf8');
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
