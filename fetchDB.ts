import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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
  const sectionsRef = collection(db, 'pages', 'partners', 'sections');
  const snapshot = await getDocs(sectionsRef);
  snapshot.forEach(docSnap => {
    console.log(`Section: ${docSnap.id}`);
    console.log(JSON.stringify(docSnap.data(), null, 2));
  });
}

run().catch(console.error);
