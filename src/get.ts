import express from 'express';
const router = express.Router();
import sharp from 'sharp';
import fetch from 'node-fetch';
import axios from 'axios';

router.get('/', (req,res) => {
  if(!req.query.url) {
    res.send('chrome-compression-proxy');
  } else {
    const targetUrl = `${req.query.url}`;
    (async () => {
      try {
        const response = await axios(targetUrl, {responseType: 'arraybuffer'});
        // @ts-expect-error
        const img = sharp(new Buffer.from(response.data));
        img.webp({quality: 10});
        const out = await img.toBuffer();
        res.write(out);
        res.end();
      } catch(e) {
        //console.log(e);
        res.redirect(targetUrl);
      };
    })();
  };
});

export default router;