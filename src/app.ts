import express from 'express';
interface Region {
  code: string;
  name: string;
  level: string;
}

const kodewilayah: Region[] = require('./data/kodewilayah.json');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/v1/api/provinsi', (req, res) => {
  try {
    const provinsi = kodewilayah.map((region: Region) => ({
      code: region.code,
      name: region.name,
      level: region.level
    }));
    
    res.status(200).json({
      message: 'Provinces retrieved successfully',
      data: provinsi
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error',
      error: (error as Error).message
    });
  }
});


export default app;
