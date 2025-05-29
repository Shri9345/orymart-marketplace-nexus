
import React, { createContext, useContext, useState } from 'react';

export type Language = 'en-US' | 'en-SG' | 'zh-CN' | 'ja-JP';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  'en-US': {
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.cart': 'Cart',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.seller': 'Become a Seller',
    'hero.title': 'Shop the Best of OryMart',
    'hero.subtitle': 'Discover amazing products from trusted sellers worldwide',
    'hero.cta': 'Shop Now',
    'categories.electronics': 'Electronics',
    'categories.fashion': 'Fashion',
    'categories.home': 'Home & Garden',
    'categories.sports': 'Sports',
    'seller.register': 'Start Selling',
    'cart.add': 'Add to Cart',
    'search.placeholder': 'Search products...',
  },
  'en-SG': {
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.cart': 'Cart',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.seller': 'Become a Seller',
    'hero.title': 'Shop the Best of OryMart',
    'hero.subtitle': 'Discover amazing products from trusted sellers worldwide',
    'hero.cta': 'Shop Now',
    'categories.electronics': 'Electronics',
    'categories.fashion': 'Fashion',
    'categories.home': 'Home & Garden',
    'categories.sports': 'Sports',
    'seller.register': 'Start Selling',
    'cart.add': 'Add to Cart',
    'search.placeholder': 'Search products...',
  },
  'zh-CN': {
    'nav.home': '首页',
    'nav.shop': '商店',
    'nav.cart': '购物车',
    'nav.login': '登录',
    'nav.register': '注册',
    'nav.seller': '成为卖家',
    'hero.title': '购买OryMart最优质商品',
    'hero.subtitle': '发现来自全球可信卖家的精品商品',
    'hero.cta': '立即购买',
    'categories.electronics': '电子产品',
    'categories.fashion': '时尚',
    'categories.home': '家居园艺',
    'categories.sports': '运动',
    'seller.register': '开始销售',
    'cart.add': '加入购物车',
    'search.placeholder': '搜索产品...',
  },
  'ja-JP': {
    'nav.home': 'ホーム',
    'nav.shop': 'ショップ',
    'nav.cart': 'カート',
    'nav.login': 'ログイン',
    'nav.register': '登録',
    'nav.seller': '出品者になる',
    'hero.title': 'OryMartのベスト商品をショッピング',
    'hero.subtitle': '信頼できる世界中の出品者から素晴らしい商品を発見',
    'hero.cta': '今すぐショッピング',
    'categories.electronics': '電子機器',
    'categories.fashion': 'ファッション',
    'categories.home': 'ホーム＆ガーデン',
    'categories.sports': 'スポーツ',
    'seller.register': '販売開始',
    'cart.add': 'カートに追加',
    'search.placeholder': '商品を検索...',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en-US');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
