import { usePageContent } from '@/src/hooks/usePageContent';
import EditableSection from '@/src/components/EditableSection';
export default function Privacy() {
  const { content } = usePageContent('site', 'privacy', {
    headline: 'Website privacy notice',
    body: 'When you submit an enquiry, this website stores the details you provide, your consent and the submission time in the chapter’s Firebase database so the chapter can handle your request. Newsletter enquiries include a request to receive the monthly briefing.\n\nContact hello@itsmf.org.zm about your information, to request a correction or deletion, or to withdraw your newsletter consent.\n\nThis site loads content from Firebase and media from external services, including Cloudinary and image providers. Your browser connects to those services to display that content. The theme preference and a local cache of site content may be stored in your browser. For site analytics, the website creates a browser identifier and records visit time, page path, browser user-agent and whether the browser has visited before in Firebase.\n\nPlease do not send confidential organisational data through public forms.'
  });
  return <EditableSection pageId="site" sectionId="privacy"><article className="max-w-3xl mx-auto px-6 pt-36 pb-24"><h1 className="text-4xl mb-8">{String(content.headline)}</h1>{String(content.body).split('\n\n').map((p, i) => <p key={i} className="mb-6 leading-relaxed">{p}</p>)}</article></EditableSection>;
}
