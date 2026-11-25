import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import metadata from '@/src/lib/routeMetadata.json';
export default function SearchMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const route = pathname.replace(/\/$/, '') || '/';
    const meta = (metadata as Record<string, {title: string; description: string}>)[route] || (route.startsWith('/services/benchmarking') ? metadata['/services/benchmarking'] : {title: 'itSMF Zambia', description: 'itSMF Zambia chapter website.'});
    document.title = meta.title;
    const set = (attribute: string, key: string, value: string) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!element) { element = document.createElement('meta'); element.setAttribute(attribute,key); document.head.append(element); }
      element.content = value;
    };
    set('name', 'description', meta.description);
    set('property', 'og:title', meta.title);
    set('property', 'og:description', meta.description);
    set('property', 'og:type', 'website');
    set('property', 'og:url', `https://itsmf.org.zm${route}`);
    set('name', 'robots', route.startsWith('/admin') || route.startsWith('/portal') ? 'noindex,nofollow' : 'index,follow');
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
    canonical.href = `https://itsmf.org.zm${route}`;
  }, [pathname]);
  return null;
}
