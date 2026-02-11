const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const nodemailer = require('nodemailer');

dotenv.config();

const app = express();
const port = process.env.PORT || 5050;
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:4200';

app.use(cors({ origin: allowedOrigin }));
app.use(express.json());

const mailTransport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const buildBookingEmail = (payload) => {
  const lines = [
    'New booking request received:',
    '--------------------------------',
    `Guest: ${payload.firstName} ${payload.lastName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    '',
    `Arrival: ${payload.arrival}`,
    `Departure: ${payload.departure}`,
    `Package: ${payload.package}`,
    `Accommodation: ${payload.accommodation}`,
    `Guests: ${payload.guests}`,
    `Referral: ${payload.referral || '-'}`,
    `Diet: ${payload.diet || '-'}`,
    '',
    'Message:',
    payload.message || '-'
  ];

  return lines.join('\n');
};

app.post('/api/contact', async (req, res) => {
  const contact = req.body;
  const requiredFields = ['firstName', 'lastName', 'email', 'message'];
  const missing = requiredFields.filter((field) => !contact?.[field]);

  if (missing.length) {
    res.status(400).json({ error: `Missing fields: ${missing.join(', ')}` });
    return;
  }

  if (!process.env.BOOKING_TO_EMAIL || !process.env.SMTP_USER) {
    res.status(500).json({ error: 'Missing email configuration' });
    return;
  }

  try {
    await mailTransport.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.BOOKING_TO_EMAIL,
      replyTo: contact.email,
      subject: `Contact message - ${contact.firstName} ${contact.lastName}`,
      text: buildContactEmail(contact)
    });

    res.json({ ok: true });
  } catch (error) {
    console.error('Contact email send failed:', error);
    res.status(500).json({ error: 'Failed to send contact message' });
  }
});

const buildContactEmail = (payload) => {
  const lines = [
    'New contact message received:',
    '-----------------------------',
    `Name: ${payload.firstName} ${payload.lastName}`,
    `Email: ${payload.email}`,
    `Subject: ${payload.subject || '-'}`,
    '',
    'Message:',
    payload.message || '-'
  ];

  return lines.join('\n');
};

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

app.post('/api/booking', async (req, res) => {
  const booking = req.body;
  const requiredFields = [
    'firstName',
    'lastName',
    'email',
    'phone',
    'arrival',
    'departure',
    'package',
    'accommodation',
    'guests'
  ];

  const missing = requiredFields.filter((field) => !booking?.[field]);
  if (missing.length) {
    res.status(400).json({ error: `Missing fields: ${missing.join(', ')}` });
    return;
  }

  if (!process.env.BOOKING_TO_EMAIL || !process.env.SMTP_USER) {
    res.status(500).json({ error: 'Missing email configuration' });
    return;
  }

  try {
    await mailTransport.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.BOOKING_TO_EMAIL,
      replyTo: booking.email,
      subject: `New Booking Request - ${booking.firstName} ${booking.lastName}`,
      text: buildBookingEmail(booking)
    });

    res.json({ ok: true });
  } catch (error) {
    console.error('Booking email send failed:', error);
    res.status(500).json({ error: 'Failed to send booking email' });
  }
});


app.listen(port, () => {
  console.log(`Reviews API listening on http://localhost:${port}`);
});
