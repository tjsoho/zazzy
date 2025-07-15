'use client';
import LinkLarge from '@/components/LinkLarge';
import LinkMedium from '@/components/LinkMedium';
import MyWorks from '@/components/LinkExtraLarge';
import Profile from '@/components/Profile';
import SocialLinkBlog from '@/components/SocialLinkBlog';
import LinkSmall from '@/components/LinkSmall';
import { useLinks } from '@/context/LinksContext';
import { LinkData } from '@/types/links';

const profileData = {
  name: "Your Name",
  subtitle: "Your Bio or Tagline",
  imageUrl: "/avatar.jpg"
};

export default function Home() {
  const { links, isLoading } = useLinks();

  // Filter and sort links by type and order
  const largeLinks = links
    .filter((link) => link.type === 'large')
    .sort((a, b) => a.order - b.order);

  const mediumLinks = links
    .filter((link) => link.type === 'medium')
    .sort((a, b) => a.order - b.order);

  const extraLargeLinks = links
    .filter((link) => link.type === 'extraLarge')
    .sort((a, b) => a.order - b.order);

  // Filter small links by their specific titles
  const blogLinks = links
    .filter((link) => link.type === 'small' && link.title.includes('Blog'))
    .sort((a, b) => a.order - b.order);

  const smallLinks = links
    .filter((link) => link.type === 'small' && !link.title.includes('Blog'))
    .sort((a, b) => a.order - b.order);

  const newsletterLink: LinkData = {
    id: 'newsletter',
    title: 'Ai Newsletter - Stay Informed',
    url: 'https://unique-rain-56040.myflodesk.com/owpqfmbfo2',
    imageUrl: '/images/profile.png',
    type: 'small',
    order: 999, // or a value to place it at the end
    isActive: true,
    clicks: 0,
    clickHistory: {},
  };

  if (isLoading) {
    return (
      <main className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
        {/* GIF Background */}
        <div className="fixed inset-0 flex justify-center items-center z-0 pointer-events-none">
          <video src="/images/movieBG.mp4" autoPlay loop muted playsInline style={{ width: '100vw', height: '100vh' }} />
        </div>
        {/* dark overlay on top of background */}
        <div className="fixed inset-0 bg-black opacity-60 z-10" />

        {/* Profile absolutely positioned in top left */}
        <div className="fixed top-4 left-4 z-20">
          <Profile {...profileData} />
        </div>

        {/* Loading Spinner */}
        <div className="relative z-10 flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* GIF Background */}
      <div className="fixed inset-0 flex justify-center items-center z-0 pointer-events-none">
        <video src="/images/movieBG.mp4" autoPlay loop muted playsInline style={{ width: '100vw', height: '100vh' }} />
      </div>
      {/* dark overlay on top of background */}
      <div className="fixed inset-0 bg-black opacity-60 z-10" />

      {/* Profile absolutely positioned in top left */}
      <div className="fixed top-4 left-4 z-20">
        <Profile {...profileData} />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center w-full h-full mt-62 gap-6">
        {/* Newsletter Button as a LinkSmall */}
        <LinkSmall data={newsletterLink} />
        {mediumLinks.map((link) => (
          <LinkMedium key={link.id} data={link} />
        ))}
        {smallLinks.map((link) => (
          <LinkSmall key={link.id} data={link} />
        ))}
        {extraLargeLinks.map((link) => (
          <MyWorks key={link.id} data={link} />
        ))}
        {blogLinks.map((link) => (
          <SocialLinkBlog key={link.id} data={link} />
        ))}
        {largeLinks.map((link) => (
          <LinkLarge key={link.id} data={link} />
        ))}
      </div>
    </main>
  );
}
