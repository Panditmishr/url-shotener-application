import express from 'express';
import { nanoid } from 'nanoid';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post('/long-to-short', (req, res) => {
  const { longUrl } = req.body;
  const shortUrl = nanoid(6);

  const filePath = 'urls.json';
  let dataObj = {};

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    dataObj = JSON.parse(data.toString());
  }

  dataObj[shortUrl] = longUrl;

  fs.writeFileSync(filePath, JSON.stringify(dataObj, null, 2));

  res.status(200).json({
    message: "URL shortened successfully",
    shortUrl: shortUrl
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
// This is a simple URL shortener API using Express.js and nanoid for generating unique short URLs.