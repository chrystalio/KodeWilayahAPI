import express from 'express';

interface Kabupaten {
  code: string;
  name: string;
  level: string;
  kecamatan?: any[]; // Assuming each kabupaten has kecamatan as an optional array
}

interface Provinsi {
  code: string;
  name: string;
  level: string;
  kabupaten?: Kabupaten[]; // Optional kabupaten property in case it’s not defined for all regions
}


const kodewilayah: Provinsi[] = require('./data/kodewilayah.json');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/v1/api/provinsi', (req, res) => {
  try {
    const provinsi = kodewilayah.map((region: Provinsi) => ({
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

app.get('/v1/api/provinsi/:provinsiCode/kabupaten', (req, res) => {
  try {
    const { provinsiCode } = req.params;
    const provinsi = kodewilayah.find((region: Provinsi) => region.code === provinsiCode);

    if (!provinsi) {
      // Return 404 if the provinsi is not found
      return res.status(404).json({
        message: `Provinsi with code ${provinsiCode} not found`
      });
    }

    if (!provinsi.kabupaten || provinsi.kabupaten.length === 0) {
      return res.status(404).json({
        message: `No kabupaten found for provinsi with code ${provinsiCode}`
      });
    }

    const kabupatenList = provinsi.kabupaten.map((kab) => ({
      code: kab.code,
      name: kab.name,
    }));

    res.status(200).json({
      message: `Kabupaten retrieved successfully for provinsi with code ${provinsiCode}`,
      data: kabupatenList
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
