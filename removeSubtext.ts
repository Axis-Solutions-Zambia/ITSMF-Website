import { initializeApp } from 'firebase/app';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

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

async function run() {
  const heroRef = doc(db, 'pages', 'partners', 'sections', 'hero');
  await updateDoc(heroRef, {
    'content._hide_body': 'true'
  });
  console.log('Successfully hid the body text.');
}

run().catch(console.error);
