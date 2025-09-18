import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [showOptions, setShowOptions] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      setShowOptions(true);
      return;
    }
    addToCart(product, selectedSize, selectedColor);
    setShowOptions(false);
    setSelectedSize('');
    setSelectedColor('');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg border-0 bg-white">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className="p-6">
          <div className="space-y-2 mb-4">
            <h3 className="text-lg font-medium text-black">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.material}</p>
            <p className="text-lg font-medium text-black">{formatPrice(product.price)}</p>
          </div>

          {showOptions && (
            <div className="space-y-3 mb-4">
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите размер" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите цвет" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button 
            onClick={handleAddToCart}
            className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
          >
            {showOptions ? 'Добавить в корзину' : 'Выбрать размер'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}