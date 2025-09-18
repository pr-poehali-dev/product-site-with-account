import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { useCart } from '@/context/CartContext';

interface CartPageProps {
  onPageChange: (page: string) => void;
}

export default function CartPage({ onPageChange }: CartPageProps) {
  const { items, updateQuantity, removeFromCart, total, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="ShoppingBag" size={32} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-light text-black mb-2">Корзина пуста</h2>
            <p className="text-gray-600 mb-6">Добавьте товары из каталога</p>
            <Button 
              onClick={() => onPageChange('catalog')}
              className="bg-black text-white hover:bg-gray-800"
            >
              Перейти в каталог
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-light text-black">Корзина</h1>
          <Button 
            variant="ghost" 
            onClick={clearCart}
            className="text-red-600 hover:text-red-700"
          >
            Очистить корзину
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-black mb-1">{item.product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.selectedColor} • {item.selectedSize}
                      </p>
                      <p className="text-lg font-medium text-black">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Icon name="Minus" size={14} />
                      </Button>
                      
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.product.id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center"
                        min="1"
                      />
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Icon name="Plus" size={14} />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-medium text-black mb-2">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl font-medium">Итого</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Товары ({items.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Доставка</span>
                  <span className="font-medium">Бесплатно</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium">Всего</span>
                    <span className="text-lg font-medium">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button className="w-full bg-black text-white hover:bg-gray-800 mt-6">
                  Оформить заказ
                </Button>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => onPageChange('catalog')}
                >
                  Продолжить покупки
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}