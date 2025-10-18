import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { apiRequest } from '@/lib/queryClient';
import { api } from '@/lib/api';
import { insertContactSchema } from '@shared/schema';

export default function ContactPage() {
  const { language } = useLanguage();
  const { toast } = useToast();

  const formSchema = insertContactSchema.extend({
    name: z.string().min(1, language === 'ko' ? '?대쫫???낅젰?댁＜?몄슂.' : 'Name is required.'),
    email: z.string().email(language === 'ko' ? '?좏슚???대찓?쇱쓣 ?낅젰?댁＜?몄슂.' : 'Invalid email address.'),
    subject: z.string().min(1, language === 'ko' ? '?쒕ぉ???낅젰?댁＜?몄슂.' : 'Subject is required.'),
    message: z.string().min(10, language === 'ko' ? '硫붿떆吏??理쒖냼 10???댁긽?댁뼱???⑸땲??' : 'Message must be at least 10 characters.'),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      subject: '',
      message: '',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await api.post('/contacts', data);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit contact form');
      }
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: language === 'ko' ? '臾몄쓽 ?묒닔 ?꾨즺' : 'Contact Submitted',
        description:
          language === 'ko'
            ? '臾몄쓽媛 ?깃났?곸쑝濡??묒닔?섏뿀?듬땲?? 鍮좊Ⅸ ?쒖씪 ?댁뿉 ?곕씫?쒕━寃좎뒿?덈떎.'
            : 'Your inquiry has been submitted successfully. We will contact you soon.',
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: language === 'ko' ? '?ㅻ쪟' : 'Error',
        description:
          error.message ||
          (language === 'ko'
            ? '臾몄쓽 ?묒닔 以??ㅻ쪟媛 諛쒖깮?덉뒿?덈떎.'
            : 'An error occurred while submitting your inquiry.'),
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  const officeLocations = [
    {
      nameKo: '?쒖슱 蹂몄궗',
      nameEn: 'Seoul Headquarters',
      address:
        language === 'ko'
          ? '?쒖슱?밸퀎??媛뺣궓援??뚰뿤?濡?152 媛뺣궓?뚯씠?몄뒪?쇳꽣 鍮뚮뵫'
          : '152, Teheran-ro, Gangnam-gu, Seoul, Korea',
      phone: '+82-2-3404-0000',
      email: 'info@questlegal.co.kr',
    },
    {
      nameKo: '遺???щТ??,
      nameEn: 'Busan Office',
      address:
        language === 'ko'
          ? '遺?곌킅??떆 ?댁슫?援??쇳?以묒븰濡?97'
          : '97, Centum jungang-ro, Haeundae-gu, Busan, Korea',
      phone: '+82-51-742-0505',
      email: 'busan@questlegal.co.kr',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-20">
        <div
          className="relative h-96 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=600&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-foreground/70" />
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h1
                className="text-5xl md:text-6xl font-serif font-bold mb-4"
                data-testid="text-contact-hero-title"
              >
                {language === 'ko' ? '臾몄쓽?섍린' : 'Contact Us'}
              </h1>
              <p
                className="text-xl"
                data-testid="text-contact-hero-subtitle"
              >
                {language === 'ko'
                  ? '踰뺣쪧 ?곷떞???꾩슂?섏떊媛?? ?몄젣???곕씫 二쇱꽭??'
                  : 'Need legal consultation? Contact us anytime.'}
              </p>
            </div>
          </div>
        </div>

        <section className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2
                  className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-8"
                  data-testid="text-contact-form-title"
                >
                  {language === 'ko' ? '?곷떞 ?좎껌' : 'Request Consultation'}
                </h2>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ko' ? '?대쫫 *' : 'Name *'}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={
                                language === 'ko' ? '?띻만?? : 'John Doe'
                              }
                              data-testid="input-contact-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ko' ? '?대찓??*' : 'Email *'}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder={
                                language === 'ko'
                                  ? 'hong@questlegal.co.kr'
                                  : 'john@questlegal.co.kr'
                              }
                              data-testid="input-contact-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ko' ? '?꾪솕踰덊샇' : 'Phone'}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || ''}
                              placeholder={
                                language === 'ko' ? '010-1234-5678' : '+82-10-1234-5678'
                              }
                              data-testid="input-contact-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ko' ? '?뚯궗紐? : 'Company'}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || ''}
                              placeholder={
                                language === 'ko' ? '?뚯궗紐?(?좏깮?ы빆)' : 'Company (Optional)'
                              }
                              data-testid="input-contact-company"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ko' ? '?쒕ぉ *' : 'Subject *'}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={
                                language === 'ko'
                                  ? '臾몄쓽 ?쒕ぉ???낅젰?댁＜?몄슂'
                                  : 'Enter inquiry subject'
                              }
                              data-testid="input-contact-subject"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ko' ? '臾몄쓽 ?댁슜 *' : 'Message *'}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={6}
                              placeholder={
                                language === 'ko'
                                  ? '臾몄쓽 ?댁슜???곸꽭???낅젰?댁＜?몄슂'
                                  : 'Please describe your inquiry in detail'
                              }
                              data-testid="input-contact-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="mb-4 p-4 bg-muted/50 rounded-md">
                      <p className="text-xs text-muted-foreground leading-relaxed" data-testid="text-privacy-notice">
                        {language === 'ko' 
                          ? '?섏쭛 ??ぉ: ?대쫫, ?대찓?? ?꾪솕踰덊샇(?좏깮), ?뚯궗紐??좏깮), ?쒕ぉ, 臾몄쓽?댁슜 | ?섏쭛 紐⑹쟻: ?곷떞 ?묒닔 諛??듬? | 蹂닿? 湲곌컙: 12媛쒖썡 | ?????쒓났 諛?泥섎━ ?꾪긽: ?놁쓬'
                          : 'Collection: Name, Email, Phone (optional), Company (optional), Subject, Message | Purpose: Consultation processing and response | Retention: 12 months | Third-party provision/outsourcing: None'}
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={mutation.isPending}
                      data-testid="button-submit-contact"
                    >
                      {mutation.isPending
                        ? language === 'ko'
                          ? '?쒖텧 以?..'
                          : 'Submitting...'
                        : language === 'ko'
                        ? '臾몄쓽?섍린'
                        : 'Submit Inquiry'}
                    </Button>
                  </form>
                </Form>
              </div>

              <div>
                <h2
                  className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-8"
                  data-testid="text-office-locations-title"
                >
                  {language === 'ko' ? '?ㅽ뵾???꾩튂' : 'Office Locations'}
                </h2>

                <div className="space-y-6">
                  {officeLocations.map((office, index) => (
                    <Card
                      key={index}
                      className="hover-elevate active-elevate-2"
                      data-testid={`card-office-${index}`}
                    >
                      <CardContent className="p-6">
                        <h3
                          className="text-xl font-semibold text-foreground mb-4"
                          data-testid={`text-office-name-${index}`}
                        >
                          {language === 'ko' ? office.nameKo : office.nameEn}
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <p className="text-muted-foreground">{office.address}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                            <p className="text-muted-foreground">{office.phone}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                            <p className="text-muted-foreground">{office.email}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">
                            {language === 'ko' ? '?낅Т ?쒓컙' : 'Business Hours'}
                          </h4>
                          <p className="text-muted-foreground">
                            {language === 'ko'
                              ? '?붿슂??- 湲덉슂?? 09:00 - 18:00'
                              : 'Monday - Friday: 09:00 - 18:00'}
                          </p>
                          <p className="text-muted-foreground">
                            {language === 'ko'
                              ? '?좎슂?? ?쇱슂?? 怨듯쑕?? ?대Т'
                              : 'Saturday, Sunday, Holidays: Closed'}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <Card className="border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {language === 'ko' ? '踰뺤쟻 怨좎?' : 'Legal Notice'}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {language === 'ko'
                    ? '蹂??뱀궗?댄듃??援먯쑁 諛??쒖뿰 紐⑹쟻???쒗뵆由우엯?덈떎. QUEST Legal? ?곕え 釉뚮옖?쒖씠硫? 蹂??ъ씠?몃뒗 ?ㅼ젣 踰뺣쪧 ?쒕퉬?ㅻ? ?쒓났?섏? ?딆뒿?덈떎. 臾몄쓽 ?묒떇???듯빐 ?쒖텧???뺣낫???쒖뿰 紐⑹쟻?쇰줈留??ъ슜?섎ŉ, ?ㅼ젣 踰뺣쪧 ?먮Ц?대굹 ?곷떞?쇰줈 媛꾩＜?섏? ?딆뒿?덈떎. ?ㅼ젣 踰뺣쪧 ?먮Ц???꾩슂??寃쎌슦 ?먭꺽??媛뽰텣 踰뺣쪧 ?꾨Ц媛? ?곷떞?섏떆湲?諛붾엻?덈떎.'
                    : 'This website is a demonstration template for educational purposes only. QUEST Legal is a demo brand, and this site does not provide actual legal services. Information submitted through contact forms is used for demonstration purposes only and does not constitute legal advice or consultation. For actual legal counsel, please consult with qualified legal professionals.'}
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
