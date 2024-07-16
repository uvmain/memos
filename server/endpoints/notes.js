import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDirPath = path.join(__dirname, '../../data');

export function createEndpoints(app) {
  // GET endpoint
  app.get('/', (req, res) => {
    fs.readdir(dataDirPath, (err, files) => {
      if (err) {
        console.error('Error reading the directory', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      const mdFiles = files.filter(file => path.extname(file) === '.md');

      const fileContents = mdFiles.map(file => {
        const filePath = path.join(dataDirPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        return { fileName: file, content };
      });

      fileContents.sort((a, b) => {
        return a.fileName > b.fileName ? -1 : 1;
      })

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(fileContents));
    });
  });

  // POST endpoint
  app.post('/', (req, res) => {
    console.log(req.body.markdown);
    const markdown = `${req.body.markdown}`;
    if (markdown.length < 1) {
      res.status(400).send('Content is required');
      return;
    }

    const date = Date.now();
    const filename = `${date}.md`;
    const filePath = path.join(dataDirPath, filename);

    fs.writeFile(filePath, markdown, (err) => {
      if (err) {
        console.error('Error writing the file', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      res.status(201).send('File created');
    });
  });
}
