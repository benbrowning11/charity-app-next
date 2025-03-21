import Footer from './FooterAlt';
import SlideMenu from './SlideMenu';
import LeduLogo from './LeduLogo';

interface GuestLayoutProps {
  children: React.ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
  return (
    <div className="min-h-screen">
      <div className="absolute top-2 left-2 z-40">
        <LeduLogo />
      </div>
      <SlideMenu />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
