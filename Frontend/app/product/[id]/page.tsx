import { clothingItems } from '@/lib/data';
import ProductDetailsWrapper from './ProductDetailsWrapper';

export function generateStaticParams() {
  return clothingItems.map((item) => ({
    id: item.id.toString(),
  }));
}

const getProduct = (id: string) => {
  const item = clothingItems.find((item) => item.id.toString() === id);
  if (!item) return null;

  return {
    id: item.id.toString(),
    name: item.name,
    price: item.price,
    description:
      'A timeless piece that combines style with comfort. Made from premium materials for lasting quality.',
    color: item.color,
    image: item.image,
    details: [
      'Premium Quality Materials',
      'Regular fit',
      'Machine washable',
      'Made in Portugal',
      `Available in ${item.color}`,
    ],
  };
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }

  return <ProductDetailsWrapper product={product} />;
}
