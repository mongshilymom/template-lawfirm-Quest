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
    name: z.string().min(1, language === 'ko' ? '이름을 입력해주세요.' : 'Name is required.'),
    email: z.string().email(language === 'ko' ? '유효한 이메일을 입력해주세요.' : 'Invalid email address.'),
    subject: z.string().min(1, language === 'ko' ? '제목을 입력해주세요.' : 'Subject is required.'),
    message: z.string().min(10, language === 'ko' ? '메시지는 최소 10자 이상이어야 합니다.' : 'Message must be at least 10 characters.'),
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
        title: language === 'ko' ? '문의 접수 완료' : 'Contact Submitted',
        description:
          language === 'ko'
            ? '문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.'
            : 'Your inquiry has been submitted successfully. We will contact you soon.',
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: language === 'ko' ? '오류' : 'Error',
        description:
          error.message ||
          (language === 'ko'
            ? '문의 접수 중 오류가 발생했습니다.'
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
      nameKo: '서울 본사',
      nameEn: 'Seoul Headquarters',
      address:
        language === 'ko'
          ? '서울특별시 강남구 테헤란로 152 강남파이낸스센터 빌딩'
          : '152, Teheran-ro, Gangnam-gu, Seoul, Korea',
      phone: '+82-2-3404-0000',
      email: 'info@questlegal.co.kr',
    },
    {
      nameKo: '부산 사무소',
      nameEn: 'Busan Office',
      address:
        language === 'ko'
          ? '부산광역시 해운대구 센텀중앙로 97'
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
                {language === 'ko' ? '문의하기' : 'Contact Us'}
              </h1>
              <p
                className="text-xl"
                data-testid="text-contact-hero-subtitle"
              >
                {language === 'ko'
                  ? '법률 상담이 필요하신가요? 언제든 연락 주세요.'
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
                  {language === 'ko' ? '상담 신청' : 'Request Consultation'}
                </h2>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ko' ? '이름 *' : 'Name *'}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={
                                language === 'ko' ? '홍길동' : 'John Doe'
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
                            {language === 'ko' ? '이메일 *' : 'Email *'}
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
                            {language === 'ko' ? '전화번호' : 'Phone'}
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
                            {language === 'ko' ? '회사명' : 'Company'}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || ''}
                              placeholder={
                                language === 'ko' ? '회사명 (선택사항)' : 'Company (Optional)'
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
                            {language === 'ko' ? '제목 *' : 'Subject *'}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder={
                                language === 'ko'
                                  ? '문의 제목을 입력해주세요'
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
                            {language === 'ko' ? '문의 내용 *' : 'Message *'}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={6}
                              placeholder={
                                language === 'ko'
                                  ? '문의 내용을 상세히 입력해주세요'
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
                          ? '수집 항목: 이름, 이메일, 전화번호(선택), 회사명(선택), 제목, 문의내용 | 수집 목적: 상담 접수 및 답변 | 보관 기간: 12개월 | 제3자 제공 및 처리 위탁: 없음'
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
                          ? '제출 중...'
                          : 'Submitting...'
                        : language === 'ko'
                        ? '문의하기'
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
                  {language === 'ko' ? '오피스 위치' : 'Office Locations'}
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
                            {language === 'ko' ? '업무 시간' : 'Business Hours'}
                          </h4>
                          <p className="text-muted-foreground">
                            {language === 'ko'
                              ? '월요일 - 금요일: 09:00 - 18:00'
                              : 'Monday - Friday: 09:00 - 18:00'}
                          </p>
                          <p className="text-muted-foreground">
                            {language === 'ko'
                              ? '토요일, 일요일, 공휴일: 휴무'
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
                  {language === 'ko' ? '법적 고지' : 'Legal Notice'}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {language === 'ko'
                    ? '본 웹사이트는 교육 및 시연 목적의 템플릿입니다. QUEST Legal은 데모 브랜드이며, 본 사이트는 실제 법률 서비스를 제공하지 않습니다. 문의 양식을 통해 제출된 정보는 시연 목적으로만 사용되며, 실제 법률 자문이나 상담으로 간주되지 않습니다. 실제 법률 자문이 필요한 경우 자격을 갖춘 법률 전문가와 상담하시기 바랍니다.'
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
