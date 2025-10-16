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
    name: z.string().min(1, language === 'ko' ? '?�름???�력?�주?�요.' : 'Name is required.'),
    email: z.string().email(language === 'ko' ? '?�효???�메?�을 ?�력?�주?�요.' : 'Invalid email address.'),
    subject: z.string().min(1, language === 'ko' ? '?�목???�력?�주?�요.' : 'Subject is required.'),
    message: z.string().min(10, language === 'ko' ? '메시지??최소 10???�상?�어???�니??' : 'Message must be at least 10 characters.'),
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
        title: language === 'ko' ? '문의 ?�수 ?�료' : 'Contact Submitted',
        description:
          language === 'ko'
            ? '문의가 ?�공?�으�??�수?�었?�니?? 빠른 ?�일 ?�에 ?�락?�리겠습?�다.'
            : 'Your inquiry has been submitted successfully. We will contact you soon.',
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: language === 'ko' ? '?�류' : 'Error',
        description:
          error.message ||
          (language === 'ko'
            ? '문의 ?�수 �??�류가 발생?�습?�다.'
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
      nameKo: '?�울 본사',
      nameEn: 'Seoul Headquarters',
      address:
        language === 'ko'
          ? '?�울?�별??강남�??�헤?��?152 강남?�이?�스?�터 빌딩'
          : '152, Teheran-ro, Gangnam-gu, Seoul, Korea',
      phone: '+82-2-3404-0000',
      email: 'info@questlegal.co.kr',
    },
    {
      nameKo: '부???�무??,
      nameEn: 'Busan Office',
      address:
        language === 'ko'
          ? '부?�광??�� ?�운?��??��?중앙�?97'
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
                {language === 'ko' ? '문의?�기' : 'Contact Us'}
              </h1>
              <p
                className="text-xl"
                data-testid="text-contact-hero-subtitle"
              >
                {language === 'ko'
                  ? '법률 ?�담???�요?�신가?? ?�제???�락 주세??'
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
                  {language === 'ko' ? '?�담 ?�청' : 'Request Consultation'}
                </h2>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ko' ? '?�름 *' : 'Name *'}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={
                                language === 'ko' ? '?�길?? : 'John Doe'
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
                            {language === 'ko' ? '?�메??*' : 'Email *'}
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
                            {language === 'ko' ? '?�화번호' : 'Phone'}
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
                            {language === 'ko' ? '?�사�? : 'Company'}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || ''}
                              placeholder={
                                language === 'ko' ? '?�사�?(?�택?�항)' : 'Company (Optional)'
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
                            {language === 'ko' ? '?�목 *' : 'Subject *'}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={
                                language === 'ko'
                                  ? '문의 ?�목???�력?�주?�요'
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
                            {language === 'ko' ? '문의 ?�용 *' : 'Message *'}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={6}
                              placeholder={
                                language === 'ko'
                                  ? '문의 ?�용???�세???�력?�주?�요'
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
                          ? '?�집 ??��: ?�름, ?�메?? ?�화번호(?�택), ?�사�??�택), ?�목, 문의?�용 | ?�집 목적: ?�담 ?�수 �??��? | 보�? 기간: 12개월 | ?????�공 �?처리 ?�탁: ?�음'
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
                          ? '?�출 �?..'
                          : 'Submitting...'
                        : language === 'ko'
                        ? '문의?�기'
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
                  {language === 'ko' ? '?�피???�치' : 'Office Locations'}
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
                            {language === 'ko' ? '?�무 ?�간' : 'Business Hours'}
                          </h4>
                          <p className="text-muted-foreground">
                            {language === 'ko'
                              ? '?�요??- 금요?? 09:00 - 18:00'
                              : 'Monday - Friday: 09:00 - 18:00'}
                          </p>
                          <p className="text-muted-foreground">
                            {language === 'ko'
                              ? '?�요?? ?�요?? 공휴?? ?�무'
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
                  {language === 'ko' ? '법적 고�?' : 'Legal Notice'}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {language === 'ko'
                    ? '�??�사?�트??ZENTA LawFirm WebSite ?�루?�으�??�작?�었?�니?? ?�제 법률 ?�담???�요?�신 경우 ?�문 변?�사?� 직접 ?�락?�시�?바랍?�다.'
                    : 'This website is built with ZENTA LawFirm WebSite solution. For actual legal consultation, please contact professional attorneys directly.'}
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
