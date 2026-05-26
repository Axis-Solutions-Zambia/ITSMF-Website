import * as dotenv from 'dotenv';
dotenv.config();

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCpODlHlm-J7TZYsP3_kCY129waP9ymKcw",
  authDomain: "itsmf-website.firebaseapp.com",
  projectId: "itsmf-website",
  storageBucket: "itsmf-website.firebasestorage.app",
  messagingSenderId: "57963893926",
  appId: "1:57963893926:web:83f0f60a90c84390481067",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TOP_ROW_IMAGES = [
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
  'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  'https://images.unsplash.com/photo-1531297172867-622c4314c1e6?w=800&q=80',
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
  'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=80',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80'
];

const BOTTOM_ROW_IMAGES = [
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
  'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&q=80',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
  'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=800&q=80',
  'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&q=80'
];

const EVENT_IMAGES = [
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
  'https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=800&q=80'
];

async function uploadUrlToCloudinary(url: string): Promise<string> {
  const cloudName = process.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error('Missing Cloudinary config in .env');
  }

  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const formData = new FormData();
  formData.append('file', url);
  formData.append('upload_preset', uploadPreset);

  console.log(`Uploading ${url}...`);
  const res = await fetch(uploadUrl, {
    method: 'POST',
    body: formData as any,
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`Upload failed for ${url}: ${err}`);
    return url;
  }

  const data = await res.json();
  return data.secure_url;
}

async function run() {
  console.log('Starting migration to Cloudinary...');

  const newTopImages = [];
  for (const url of TOP_ROW_IMAGES) {
    const secureUrl = await uploadUrlToCloudinary(url);
    newTopImages.push({ image: secureUrl });
  }

  const newBottomImages = [];
  for (const url of BOTTOM_ROW_IMAGES) {
    const secureUrl = await uploadUrlToCloudinary(url);
    newBottomImages.push({ image: secureUrl });
  }

  console.log('Saving hero_media to Firestore...');
  const heroMediaRef = doc(db, 'pages', 'home', 'sections', 'hero_media');
  await setDoc(heroMediaRef, {
    content: {
      top_images: newTopImages,
      bottom_images: newBottomImages
    }
  }, { merge: true });

  const newEventImages = [];
  for (const url of EVENT_IMAGES) {
    const secureUrl = await uploadUrlToCloudinary(url);
    newEventImages.push(secureUrl);
  }

  console.log('Saving events to Firestore...');
  const eventsRef = doc(db, 'pages', 'home', 'sections', 'events');
  await setDoc(eventsRef, {
    content: {
      event1_image: newEventImages[0],
      event2_image: newEventImages[1],
      event3_image: newEventImages[2]
    }
  }, { merge: true });

  console.log('Done!');
  process.exit(0);
}

run().catch(console.error);
