import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  cart: number[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  scrollToSection: (id: string) => void;
  cartSheetContent: React.ReactNode;
}

const Header = ({ cart, isCartOpen, setIsCartOpen, scrollToSection, cartSheetContent }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-4xl">🧊</span>
          <h1 className="text-3xl font-bold text-primary">КубикиДетям</h1>
        </div>
        <div className="hidden md:flex gap-6">
          <button onClick={() => scrollToSection('hero')} className="hover:text-primary transition-colors font-semibold">Главная</button>
          <button onClick={() => scrollToSection('catalog')} className="hover:text-primary transition-colors font-semibold">Каталог</button>
          <button onClick={() => scrollToSection('about')} className="hover:text-primary transition-colors font-semibold">О нас</button>
          <button onClick={() => scrollToSection('delivery')} className="hover:text-primary transition-colors font-semibold">Доставка</button>
          <button onClick={() => scrollToSection('reviews')} className="hover:text-primary transition-colors font-semibold">Отзывы</button>
          <button onClick={() => scrollToSection('contacts')} className="hover:text-primary transition-colors font-semibold">Контакты</button>
        </div>
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <Button className="relative">
              <Icon name="ShoppingCart" size={20} />
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-secondary">
                  {cart.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          {cartSheetContent}
        </Sheet>
      </nav>
    </header>
  );
};

export default Header;
