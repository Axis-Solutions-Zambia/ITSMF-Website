/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { db } from '@/src/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Navbar, Footer } from '@/src/components/Layout';
import Home from '@/src/pages/Home';
import About from '@/src/pages/About';
import Membership from '@/src/pages/Membership';
import Events from '@/src/pages/Events';
import Resources from '@/src/pages/Resources';
import Partners from '@/src/pages/Partners';
import Portal from '@/src/pages/Portal';
import Services from '@/src/pages/Services';
import Benchmarking from '@/src/pages/services/Benchmarking';
import Admin from '@/src/pages/Admin';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

function LayoutWrapper() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdmin && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/events" element={<Events />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/benchmarking/*" element={<Benchmarking />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

function VisitTracker() {
  useEffect(() => {
    const sessionLogged = sessionStorage.getItem('visit_logged');
    if (sessionLogged) return;

    const trackVisit = async () => {
      try {
        const storedDeviceId = localStorage.getItem('device_id');
        const isReturnVisit = !!storedDeviceId;
        const deviceId = storedDeviceId || crypto.randomUUID();

        if (!storedDeviceId) {
          localStorage.setItem('device_id', deviceId);
        }

        await addDoc(collection(db, 'visits'), {
          deviceId,
          isReturnVisit,
          timestamp: serverTimestamp(),
          userAgent: navigator.userAgent,
          path: window.location.pathname
        });

        sessionStorage.setItem('visit_logged', 'true');
      } catch (err) {
        console.error("Failed to log visit:", err);
      }
    };

    // Give the app a moment to render before tracking
    setTimeout(trackVisit, 1000);
  }, []);

  return null;
}

export default function App() {
  return (
    <Router>
      <VisitTracker />
      <ScrollToTop />
      <LayoutWrapper />
    </Router>
  );
}
