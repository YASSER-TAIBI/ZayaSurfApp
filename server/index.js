const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config();

const app = express();
const port = process.env.PORT || 5050;
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:4200';

app.use(cors({ origin: allowedOrigin }));

app.get('/api/reviews', async (_req, res) => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    res.status(500).json({ error: 'Missing GOOGLE_PLACES_API_KEY or GOOGLE_PLACE_ID' });
    return;
  }

  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
  url.searchParams.set('place_id', placeId);
  url.searchParams.set('fields', 'rating,user_ratings_total,reviews');
  url.searchParams.set('reviews_sort', 'newest');
  url.searchParams.set('key', apiKey);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      res.status(500).json({ error: 'Google API error' });
      return;
    }

    const payload = await response.json();
    if (payload.status !== 'OK') {
      res.status(500).json({ error: payload.status || 'Google API error' });
      return;
    }

    const result = payload.result || {};
    res.json({
      rating: result.rating ?? 0,
      user_ratings_total: result.user_ratings_total ?? 0,
      reviews: result.reviews ?? []
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

app.listen(port, () => {
  console.log(`Reviews API listening on http://localhost:${port}`);
});
