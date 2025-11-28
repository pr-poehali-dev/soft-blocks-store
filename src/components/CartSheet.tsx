import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
}

interface CartItem extends Partial<Product> {
  cartIndex?: number;
}

interface CartSheetProps {
  cart: number[];
  cartItems: CartItem[];
  totalPrice: number;
  removeFromCart: (index: number) => void;
  handleCheckout: () => void;
  setIsCartOpen: (open: boolean) => void;
}

const CartSheet = ({ cart, cartItems, totalPrice, removeFromCart, handleCheckout, setIsCartOpen }: CartSheetProps) => {
  return (
    <SheetContent className="w-full sm:max-w-lg">
      <SheetHeader>
        <SheetTitle className="text-2xl flex items-center gap-2">
          <span className="text-3xl">🛒</span>
          Ваша корзина
        </SheetTitle>
        <SheetDescription>
          {cart.length === 0 ? 'Корзина пуста' : `Товаров в корзине: ${cart.length}`}
        </SheetDescription>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🧊</div>
            <p className="text-lg text-muted-foreground">Добавьте кубики в корзину</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              {cartItems.map((item) => (
                <Card key={item.cartIndex} className="border-2">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.size}</p>
                        <p className="text-lg font-bold text-primary mt-1">
                          {item.price?.toLocaleString()} ₽
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.cartIndex!)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Icon name="Trash2" size={20} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Итого:</span>
                <span className="text-primary">{totalPrice.toLocaleString()} ₽</span>
              </div>
              <Button className="w-full text-lg" size="lg" onClick={handleCheckout}>
                <Icon name="CreditCard" className="mr-2" size={20} />
                Оформить заказ
              </Button>
              <Button
                variant="outline"
                className="w-full text-lg"
                size="lg"
                onClick={() => setIsCartOpen(false)}
              >
                Продолжить покупки
              </Button>
            </div>
          </>
        )}
      </div>
    </SheetContent>
  );
};

export default CartSheet;
