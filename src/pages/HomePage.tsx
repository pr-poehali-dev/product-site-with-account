import React from 'react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

export default function HomePage({ onPageChange }: HomePageProps) {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[70vh] flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-light text-black">
            МИНИМАЛИЗМ<br />В КАЖДОЙ ДЕТАЛИ
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Откройте для себя коллекцию одежды и аксессуаров в стиле минимализм. 
            Качество, простота, элегантность.
          </p>
          <Button 
            onClick={() => onPageChange('catalog')}
            className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg"
          >
            Смотреть каталог
          </Button>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-black mb-4">Популярные товары</h2>
            <p className="text-gray-600">Самые востребованные позиции из нашей коллекции</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              onClick={() => onPageChange('catalog')}
              className="border-black text-black hover:bg-black hover:text-white"
            >
              Смотреть все товары
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-medium text-black mb-2">Быстрая доставка</h3>
              <p className="text-gray-600">Доставляем по всей России в течение 2-5 дней</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-medium text-black mb-2">Гарантия качества</h3>
              <p className="text-gray-600">30 дней на возврат и обмен товара</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Heart" size={24} className="text-white" />
              </div>
              <h3 className="text-lg font-medium text-black mb-2">Персональный подход</h3>
              <p className="text-gray-600">Индивидуальные консультации по стилю</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}