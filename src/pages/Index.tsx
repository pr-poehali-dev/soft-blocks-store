import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
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

const Index = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: ''
  });

  const products: Product[] = [
    {
      id: 1,
      name: 'Большой мягкий кубик',
      price: 1990,
      image: 'https://cdn.poehali.dev/projects/98063206-348c-4f93-b4d1-b852c99693c4/files/5368dad6-b4a1-4dbe-bdbc-e4c9ccb52767.jpg',
      size: '40×40×40 см',
      color: 'Бирюзовый'
    },
    {
      id: 2,
      name: 'Набор из 4 кубиков',
      price: 6990,
      image: 'https://cdn.poehali.dev/projects/98063206-348c-4f93-b4d1-b852c99693c4/files/94bbd2c4-8e33-44ba-88d2-be8abc9c80a6.jpg',
      size: '30×30×30 см',
      color: 'Микс'
    },
    {
      id: 3,
      name: 'Мягкий кубик средний',
      price: 1490,
      image: 'https://cdn.poehali.dev/projects/98063206-348c-4f93-b4d1-b852c99693c4/files/94bbd2c4-8e33-44ba-88d2-be8abc9c80a6.jpg',
      size: '25×25×25 см',
      color: 'Красный'
    },
    {
      id: 4,
      name: 'Гигантский кубик',
      price: 2990,
      image: 'https://cdn.poehali.dev/projects/98063206-348c-4f93-b4d1-b852c99693c4/files/5368dad6-b4a1-4dbe-bdbc-e4c9ccb52767.jpg',
      size: '50×50×50 см',
      color: 'Жёлтый'
    },
    {
      id: 5,
      name: 'Набор из 6 кубиков',
      price: 9990,
      image: 'https://cdn.poehali.dev/projects/98063206-348c-4f93-b4d1-b852c99693c4/files/94bbd2c4-8e33-44ba-88d2-be8abc9c80a6.jpg',
      size: '35×35×35 см',
      color: 'Радуга'
    },
    {
      id: 6,
      name: 'Мини кубик',
      price: 890,
      image: 'https://cdn.poehali.dev/projects/98063206-348c-4f93-b4d1-b852c99693c4/files/5368dad6-b4a1-4dbe-bdbc-e4c9ccb52767.jpg',
      size: '15×15×15 см',
      color: 'Зелёный'
    }
  ];

  const addToCart = (productId: number) => {
    setCart([...cart, productId]);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const getCartItems = () => {
    return cart.map((productId, index) => {
      const product = products.find(p => p.id === productId);
      return { ...product, cartIndex: index };
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, productId) => {
      const product = products.find(p => p.id === productId);
      return total + (product?.price || 0);
    }, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckoutOpen(false);
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setCart([]);
      setFormData({ name: '', phone: '', email: '', address: '', comment: '' });
    }, 3000);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/20">
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
                      {getCartItems().map((item) => (
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
                        <span className="text-primary">{getTotalPrice().toLocaleString()} ₽</span>
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
          </Sheet>
        </nav>
      </header>

      <section id="hero" className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Большие мягкие кубики для{' '}
                <span className="text-primary">весёлых игр!</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Безопасные, яркие и увлекательные кубики для развития малышей. Создавайте башни, домики и целые города!
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="text-lg" onClick={() => scrollToSection('catalog')}>
                  <Icon name="Sparkles" className="mr-2" size={20} />
                  Смотреть каталог
                </Button>
                <Button size="lg" variant="outline" className="text-lg">
                  <Icon name="Phone" className="mr-2" size={20} />
                  Позвонить
                </Button>
              </div>
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">100+</div>
                  <div className="text-sm text-muted-foreground">Счастливых семей</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary">5★</div>
                  <div className="text-sm text-muted-foreground">Рейтинг магазина</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent">2 года</div>
                  <div className="text-sm text-muted-foreground">На рынке</div>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl animate-bounce-subtle" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-bounce-subtle" style={{ animationDelay: '1s' }} />
              <img
                src="https://cdn.poehali.dev/projects/98063206-348c-4f93-b4d1-b852c99693c4/files/57c5a2ad-8ef4-40cb-a4bc-4a8d2c86dbf7.jpg"
                alt="Дети играют с кубиками"
                className="rounded-3xl shadow-2xl relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-2xl">🎨</span> Наш каталог
            </h2>
            <p className="text-xl text-muted-foreground">Выбирайте идеальные кубики для вашего малыша</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card 
                key={product.id} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in border-2"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="aspect-square rounded-2xl overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <CardTitle className="text-2xl">{product.name}</CardTitle>
                  <CardDescription className="text-base">
                    <div className="flex flex-col gap-1 mt-2">
                      <span className="flex items-center gap-2">
                        <Icon name="Ruler" size={16} />
                        {product.size}
                      </span>
                      <span className="flex items-center gap-2">
                        <Icon name="Palette" size={16} />
                        {product.color}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-primary">{product.price.toLocaleString()} ₽</div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full text-lg" 
                    size="lg"
                    onClick={() => addToCart(product.id)}
                  >
                    <Icon name="ShoppingBag" className="mr-2" size={20} />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              <span className="text-2xl">🌟</span> О нас
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-4">🛡️</div>
                  <CardTitle>Безопасность</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Все кубики изготовлены из гипоаллергенных материалов, прошедших сертификацию</p>
                </CardContent>
              </Card>
              <Card className="text-center border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-4">🎨</div>
                  <CardTitle>Яркие цвета</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Насыщенные цвета стимулируют развитие зрительного восприятия малыша</p>
                </CardContent>
              </Card>
              <Card className="text-center border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-5xl mb-4">💪</div>
                  <CardTitle>Прочность</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Качественная прошивка и материалы обеспечивают долгий срок службы</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="delivery" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              <span className="text-2xl">🚚</span> Доставка
            </h2>
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon name="Truck" className="text-primary" size={28} />
                    Доставка по России
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-lg">
                  <p>Отправляем заказы по всей России транспортными компаниями. Срок доставки 3-7 дней.</p>
                  <p className="mt-2 text-primary font-semibold">Бесплатная доставка при заказе от 10 000 ₽</p>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Icon name="MapPin" className="text-secondary" size={28} />
                    Самовывоз
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-lg">
                  <p>Забрать заказ можно из нашего шоурума в Москве. Адрес: ул. Весёлая, д. 15</p>
                  <p className="mt-2 text-secondary font-semibold">Самовывоз бесплатно!</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 bg-gradient-to-r from-accent/10 to-primary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="text-2xl">💬</span> Отзывы родителей
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-2xl">👩</div>
                  <CardTitle>Анна М.</CardTitle>
                </div>
                <div className="flex text-accent">
                  {'⭐'.repeat(5)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">"Отличные кубики! Сын в восторге, строит башни часами. Материал приятный, мягкий. Рекомендую!"</p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-2xl">👨</div>
                  <CardTitle>Дмитрий К.</CardTitle>
                </div>
                <div className="flex text-accent">
                  {'⭐'.repeat(5)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">"Купили набор из 6 кубиков. Качество на высоте, цвета яркие. Дочка играет каждый день!"</p>
              </CardContent>
            </Card>
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-2xl">👩</div>
                  <CardTitle>Елена П.</CardTitle>
                </div>
                <div className="flex text-accent">
                  {'⭐'.repeat(5)}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">"Безопасные и красивые! Даже новорождённый может с ними играть. Спасибо за качество!"</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              <span className="text-2xl">📞</span> Контакты
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Свяжитесь с нами</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" className="text-primary" size={24} />
                    <span>+7 (999) 123-45-67</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" className="text-primary" size={24} />
                    <span>info@kubikidetam.ru</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" className="text-primary" size={24} />
                    <span>Москва, ул. Весёлая, д. 15</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Clock" className="text-primary" size={24} />
                    <span>Пн-Пт: 9:00 - 18:00</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-2xl">Часто задаваемые вопросы</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Из чего сделаны кубики?</AccordionTrigger>
                      <AccordionContent>
                        Кубики изготовлены из мягкого поролона высокой плотности с тканевым чехлом из гипоаллергенных материалов.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Можно ли стирать кубики?</AccordionTrigger>
                      <AccordionContent>
                        Да, чехлы можно снимать и стирать в стиральной машине при температуре 30°C.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>С какого возраста можно играть?</AccordionTrigger>
                      <AccordionContent>
                        Кубики подходят для детей от 6 месяцев. Они абсолютно безопасны для малышей.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-4xl">🧊</span>
            <h3 className="text-3xl font-bold">КубикиДетям</h3>
          </div>
          <p className="text-lg mb-6">Большие мягкие кубики для весёлых игр и развития!</p>
          <div className="flex justify-center gap-6 mb-6">
            <Button variant="ghost" size="icon" className="hover:bg-primary/20">
              <Icon name="Facebook" size={24} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/20">
              <Icon name="Instagram" size={24} />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/20">
              <Icon name="MessageCircle" size={24} />
            </Button>
          </div>
          <p className="opacity-80">© 2024 КубикиДетям. Все права защищены.</p>
        </div>
      </footer>

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
                {getCartItems().map((item) => (
                  <div key={item.cartIndex} className="flex justify-between text-sm">
                    <span>{item.name}</span>
                    <span className="font-semibold">{item.price?.toLocaleString()} ₽</span>
                  </div>
                ))}
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Итого:</span>
                <span className="text-primary">{getTotalPrice().toLocaleString()} ₽</span>
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
    </div>
  );
};

export default Index;