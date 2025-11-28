import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  comment: string;
}

interface CheckoutDialogsProps {
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  orderSuccess: boolean;
  setOrderSuccess: (success: boolean) => void;
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmitOrder: (e: React.FormEvent) => void;
  cartItems: CartItem[];
  totalPrice: number;
}

const CheckoutDialogs = ({
  isCheckoutOpen,
  setIsCheckoutOpen,
  orderSuccess,
  setOrderSuccess,
  formData,
  handleInputChange,
  handleSubmitOrder,
  cartItems,
  totalPrice
}: CheckoutDialogsProps) => {
  return (
    <>
      <Dialog open={isCheckoutOpen} onOpenChange={setIsCheckoutOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-3xl flex items-center gap-2">
              <span className="text-3xl">📝</span>
              Оформление заказа
            </DialogTitle>
            <DialogDescription className="text-base">
              Заполните форму, и мы свяжемся с вами для подтверждения
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitOrder} className="space-y-6 mt-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-base font-semibold">Имя *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Введите ваше имя"
                  className="mt-2 text-base"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-base font-semibold">Телефон *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+7 (999) 123-45-67"
                  className="mt-2 text-base"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-base font-semibold">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@mail.ru"
                  className="mt-2 text-base"
                />
              </div>
              <div>
                <Label htmlFor="address" className="text-base font-semibold">Адрес доставки *</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Город, улица, дом, квартира"
                  className="mt-2 text-base min-h-20"
                  required
                />
              </div>
              <div>
                <Label htmlFor="comment" className="text-base font-semibold">Комментарий к заказу</Label>
                <Textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  placeholder="Укажите желаемое время доставки или другие пожелания"
                  className="mt-2 text-base min-h-20"
                />
              </div>
            </div>
            <Separator />
            <div className="bg-accent/20 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Ваш заказ:</h3>
              <div className="space-y-2 mb-3">
                {cartItems.map((item) => (
                  <div key={item.cartIndex} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="font-semibold">{item.price?.toLocaleString()} ₽</span>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Итого:</span>
                <span className="text-primary">{totalPrice.toLocaleString()} ₽</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button type="submit" className="flex-1 text-lg" size="lg">
                <Icon name="Check" className="mr-2" size={20} />
                Подтвердить заказ
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCheckoutOpen(false)}
                className="flex-1 text-lg"
                size="lg"
              >
                Отмена
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={orderSuccess} onOpenChange={setOrderSuccess}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6 space-y-4">
            <div className="text-7xl animate-bounce-subtle">🎉</div>
            <DialogTitle className="text-3xl">Заказ оформлен!</DialogTitle>
            <DialogDescription className="text-lg">
              Спасибо за заказ! Мы свяжемся с вами в ближайшее время для подтверждения.
            </DialogDescription>
            <div className="flex items-center justify-center gap-2 text-primary">
              <Icon name="Phone" size={24} />
              <span className="text-lg font-semibold">+7 (999) 123-45-67</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckoutDialogs;
