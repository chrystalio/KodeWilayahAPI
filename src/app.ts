import express from 'express';
import kodewilayah from './data/kodewilayah.json';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/v1/api/provinsi', (req, res) => {
  const provinsi = kodewilayah.map((region) => ({
    code: region.code,
    name: region.name,
    level: region.level
  }));
  res.json(provinsi);
});

export default app;
