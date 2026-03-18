import './globals.css';
import type { Metadata } from 'next';
import { CartProvider } from './context/CartContext';

export const metadata: Metadata = {
  title: 'VaastraTrendz — Luxury Fashion',
  description: 'Discover premium fashion pieces curated for the modern wardrobe. Shop tops, bottoms, dresses and more.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
