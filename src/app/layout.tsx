import Footer from '@/components/Footer';
import './globals.css';
import Navbar from '@/components/Navbar'; // Adjust if your structure differs
import { Toaster } from 'react-hot-toast';
export const metadata = {
  title: 'Candlux - Premium Handcrafted Candles',
  description: 'Buy scented candles online from Candlux. Hand-poured, eco-friendly, and luxurious.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Toaster position="top-right" reverseOrder={false} />
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
