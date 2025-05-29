
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Globe, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { language, setLanguage, t } = useLanguage();
  const { totalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const languages = [
    { code: 'en-US', name: '🇺🇸 English (US)', flag: '🇺🇸' },
    { code: 'en-SG', name: '🇸🇬 English (SG)', flag: '🇸🇬' },
    { code: 'zh-CN', name: '🇨🇳 中文', flag: '🇨🇳' },
    { code: 'ja-JP', name: '🇯🇵 日本語', flag: '🇯🇵' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-xl font-bold text-gradient">OryMart</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder={t('search.placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 rounded-full border-gray-200 focus:border-purple-500 focus:ring-purple-500"
              />
            </div>
          </form>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/shop" className="text-gray-700 hover:text-purple-600 transition-colors">
              {t('nav.shop')}
            </Link>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  {languages.find(l => l.code === language)?.flag}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as Language)}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="sm" className="gap-2">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    {user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer hover:bg-gray-50">
                    Profile
                  </DropdownMenuItem>
                  {user?.type === 'seller' && (
                    <DropdownMenuItem onClick={() => navigate('/seller-dashboard')} className="cursor-pointer hover:bg-gray-50">
                      Seller Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer hover:bg-gray-50">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm">{t('nav.login')}</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="gradient-primary text-white">{t('nav.register')}</Button>
                </Link>
              </>
            )}

            {/* Seller Registration */}
            <Link to="/seller-register">
              <Button variant="outline" size="sm" className="border-purple-500 text-purple-600 hover:bg-purple-50">
                {t('nav.seller')}
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder={t('search.placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </form>
            <nav className="space-y-2">
              <Link to="/" className="block py-2 text-gray-700 hover:text-purple-600">
                {t('nav.home')}
              </Link>
              <Link to="/shop" className="block py-2 text-gray-700 hover:text-purple-600">
                {t('nav.shop')}
              </Link>
              <Link to="/cart" className="block py-2 text-gray-700 hover:text-purple-600">
                Cart ({totalItems})
              </Link>
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="block py-2 text-gray-700 hover:text-purple-600">
                    {t('nav.login')}
                  </Link>
                  <Link to="/register" className="block py-2 text-gray-700 hover:text-purple-600">
                    {t('nav.register')}
                  </Link>
                </>
              ) : (
                <button onClick={handleLogout} className="block py-2 text-gray-700 hover:text-purple-600 w-full text-left">
                  Logout
                </button>
              )}
              <Link to="/seller-register" className="block py-2 text-purple-600 font-medium">
                {t('nav.seller')}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
