
import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import HomePage from "@/pages/HomePage";
import CatalogPage from "@/pages/CatalogPage";
import AccountPage from "@/pages/AccountPage";
import CartPage from "@/pages/CartPage";

const queryClient = new QueryClient();

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'catalog':
        return <CatalogPage />;
      case 'account':
        return <AccountPage />;
      case 'cart':
        return <CartPage onPageChange={setCurrentPage} />;
      case 'about':
        return (
          <div className="min-h-screen bg-white py-16">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-3xl font-light text-black mb-8">О нас</h1>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-6">
                  MINIMAL — это философия минимализма, воплощенная в одежде. Мы создаем 
                  вещи, которые не выходят из моды, сочетая качественные материалы с 
                  чистым дизайном.
                </p>
                <p className="text-gray-600">
                  Каждая деталь продумана до мелочей, чтобы вы чувствовали комфорт 
                  и уверенность в любой ситуации.
                </p>
              </div>
            </div>
          </div>
        );
      case 'delivery':
        return (
          <div className="min-h-screen bg-white py-16">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-3xl font-light text-black mb-8">Доставка и оплата</h1>
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-medium mb-3">Способы доставки</h2>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Курьерская доставка по Москве — 300₽</li>
                    <li>• Доставка по России — от 500₽</li>
                    <li>• Самовывоз из магазина — бесплатно</li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-medium mb-3">Способы оплаты</h2>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Банковской картой онлайн</li>
                    <li>• Наличными при получении</li>
                    <li>• Банковским переводом</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'contacts':
        return (
          <div className="min-h-screen bg-white py-16">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-3xl font-light text-black mb-8">Контакты</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-medium mb-4">Связаться с нами</h2>
                  <div className="space-y-3 text-gray-600">
                    <p>📧 info@minimal.ru</p>
                    <p>📞 +7 (495) 123-45-67</p>
                    <p>📍 г. Москва, ул. Тверская, д. 15</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-medium mb-4">Режим работы</h2>
                  <div className="space-y-2 text-gray-600">
                    <p>Пн-Пт: 10:00 — 21:00</p>
                    <p>Сб-Вс: 11:00 — 20:00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'faq':
        return (
          <div className="min-h-screen bg-white py-16">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-3xl font-light text-black mb-8">Часто задаваемые вопросы</h1>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Как выбрать размер?</h3>
                  <p className="text-gray-600">Воспользуйтесь таблицей размеров на странице товара или обратитесь к консультанту.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Можно ли вернуть товар?</h3>
                  <p className="text-gray-600">Да, в течение 30 дней с момента покупки при сохранении товарного вида.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Как ухаживать за вещами?</h3>
                  <p className="text-gray-600">Следуйте рекомендациям на ярлыке изделия. Большинство вещей можно стирать в машине при 30°C.</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <div className="min-h-screen bg-white">
            <Header currentPage={currentPage} onPageChange={setCurrentPage} />
            {renderPage()}
          </div>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;