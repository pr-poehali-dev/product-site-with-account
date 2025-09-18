import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import Icon from '@/components/ui/icon';

export default function CatalogPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  const categories = Array.from(new Set(products.map(p => p.category)));
  const materials = Array.from(new Set(products.map(p => p.material)));

  React.useEffect(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedMaterial !== 'all') {
      filtered = filtered.filter(p => p.material === selectedMaterial);
    }

    filtered = filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name, 'ru');
      }
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedMaterial, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedMaterial('all');
    setSortBy('name');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-light text-black mb-4">Каталог</h1>
          <p className="text-gray-600">Вся коллекция минималистичной одежды и аксессуаров</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Материал" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все материалы</SelectItem>
                {materials.map(material => (
                  <SelectItem key={material} value={material}>
                    {material}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="flex items-center gap-2"
            >
              <Icon name="X" size={16} />
              Сбросить
            </Button>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Найдено: {filteredProducts.length} товаров
            </span>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">По названию</SelectItem>
                <SelectItem value="price-asc">По цене (возрастание)</SelectItem>
                <SelectItem value="price-desc">По цене (убывание)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Search" size={32} className="text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-black mb-2">Товары не найдены</h2>
            <p className="text-gray-600 mb-4">Попробуйте изменить параметры поиска</p>
            <Button onClick={clearFilters} variant="outline">
              Сбросить фильтры
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}