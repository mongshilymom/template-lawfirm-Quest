import {
  type PracticeArea,
  type InsertPracticeArea,
  type NewsItem,
  type InsertNewsItem,
  type Newsletter,
  type InsertNewsletter,
  type Attorney,
  type InsertAttorney,
  type Office,
  type InsertOffice,
  type Event,
  type InsertEvent,
  type Subscription,
  type InsertSubscription,
  type Contact,
  type InsertContact,
  type Consultation,
  type InsertConsultation,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getPracticeAreas(): Promise<PracticeArea[]>;
  getNewsItems(): Promise<NewsItem[]>;
  getNewsletters(): Promise<Newsletter[]>;
  getAttorneys(): Promise<Attorney[]>;
  getOffices(): Promise<Office[]>;
  getEvents(): Promise<Event[]>;
  createSubscription(data: InsertSubscription): Promise<Subscription>;
  getSubscriptionByEmail(email: string): Promise<Subscription | undefined>;
  createContact(data: InsertContact): Promise<Contact>;
  createConsultation(data: InsertConsultation): Promise<Consultation>;
  getConsultationByToken(token: string): Promise<Consultation | undefined>;
  confirmConsultation(token: string): Promise<Consultation>;
}

export class MemStorage implements IStorage {
  private practiceAreas: Map<string, PracticeArea>;
  private newsItems: Map<string, NewsItem>;
  private newsletters: Map<string, Newsletter>;
  private attorneys: Map<string, Attorney>;
  private offices: Map<string, Office>;
  private events: Map<string, Event>;
  private subscriptions: Map<string, Subscription>;
  private contacts: Map<string, Contact>;
  private consultations: Map<string, Consultation>;

  constructor() {
    this.practiceAreas = new Map();
    this.newsItems = new Map();
    this.newsletters = new Map();
    this.attorneys = new Map();
    this.offices = new Map();
    this.events = new Map();
    this.subscriptions = new Map();
    this.contacts = new Map();
    this.consultations = new Map();

    this.seedData();
  }

  private seedData() {
    const practiceAreasData: InsertPracticeArea[] = [
      {
        titleKo: '기업법',
        titleEn: 'Corporate Law',
        descriptionKo: '기업 설립, M&A, 지배구조 자문',
        descriptionEn: 'Incorporation, M&A, governance advisory',
        imageUrl: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1600',
        order: 1,
      },
      {
        titleKo: '분쟁/소송',
        titleEn: 'Litigation',
        descriptionKo: '복잡한 상사/민사/행정소송',
        descriptionEn: 'Complex commercial/civil/administrative disputes',
        imageUrl: 'https://images.unsplash.com/photo-1488998427799-e3362cec87c3?q=80&w=1600',
        order: 2,
      },
      {
        titleKo: '국제거래',
        titleEn: 'International Transactions',
        descriptionKo: '계약/규제/통상 이슈',
        descriptionEn: 'Contracts, compliance and trade matters',
        imageUrl: 'https://images.unsplash.com/photo-1499914485622-a88fac536970?q=80&w=1600',
        order: 3,
      },
    ];

    practiceAreasData.forEach((data) => {
      const id = randomUUID();
      this.practiceAreas.set(id, { id, ...data });
    });

    const newsItemsData: InsertNewsItem[] = [
      {
        titleKo: '퀘스트, 스타트업 M&A 자문',
        titleEn: 'QUEST advises startup M&A',
        descriptionKo: '모빌리티 스타트업 인수 자문을 성공적으로 마쳤습니다.',
        descriptionEn: 'Successfully advised on a mobility startup acquisition.',
        category: 'Awards',
        date: '2025-10-01',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      },
      {
        titleKo: '국제중재 세미나 개최',
        titleEn: 'International Arbitration Seminar',
        descriptionKo: '해외 중재 트렌드와 전략을 공유했습니다.',
        descriptionEn: 'Shared trends and strategies in cross-border arbitration.',
        category: 'Firm',
        date: '2025-09-15',
        imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
      },
    ];

    newsItemsData.forEach((data) => {
      const id = randomUUID();
      this.newsItems.set(id, { 
        id, 
        ...data,
        descriptionKo: data.descriptionKo ?? null,
        descriptionEn: data.descriptionEn ?? null,
      });
    });

    const newslettersData: InsertNewsletter[] = [
      {
        titleKo: '공정거래 이슈 브리핑',
        titleEn: 'Antitrust Briefing',
        contentKo: '대규모유통업법 개정 포인트 요약.',
        contentEn: 'Key points from recent antitrust amendments.',
        date: '2025-10-01',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      },
      {
        titleKo: '세무/조세 인사이트',
        titleEn: 'Tax Insights',
        contentKo: '해외원천소득 과세 이슈 점검.',
        contentEn: 'Overview of cross-border withholding matters.',
        date: '2025-10-02',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
      },
    ];

    newslettersData.forEach((data) => {
      const id = randomUUID();
      this.newsletters.set(id, { id, ...data });
    });

    const attorneysData: InsertAttorney[] = [
      {
        nameKo: '배명인',
        nameEn: 'Myung-In Bae',
        titleKo: '대표변호사',
        titleEn: 'Managing Partner',
        practiceAreasKo: ['기업지배구조', 'M&A', '자본시장'],
        practiceAreasEn: ['Corporate Governance', 'M&A', 'Capital Markets'],
        imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop',
        office: 'Seoul',
      },
      {
        nameKo: '김인섭',
        nameEn: 'In-Seob Kim',
        titleKo: '대표변호사',
        titleEn: 'Managing Partner',
        practiceAreasKo: ['국제중재', '소송', '분쟁해결'],
        practiceAreasEn: ['International Arbitration', 'Litigation', 'Dispute Resolution'],
        imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop',
        office: 'Seoul',
      },
      {
        nameKo: '이정훈',
        nameEn: 'Jeong-Hoon Lee',
        titleKo: '대표변호사',
        titleEn: 'Managing Partner',
        practiceAreasKo: ['지식재산권', '기업자문', '공정거래'],
        practiceAreasEn: ['Intellectual Property', 'Corporate Advisory', 'Antitrust'],
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
        office: 'Seoul',
      },
      {
        nameKo: '박지영',
        nameEn: 'Ji-Young Park',
        titleKo: '파트너변호사',
        titleEn: 'Partner',
        practiceAreasKo: ['노동', '인사', '컴플라이언스'],
        practiceAreasEn: ['Labor', 'HR', 'Compliance'],
        imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop',
        office: 'Seoul',
      },
      {
        nameKo: '최민호',
        nameEn: 'Min-Ho Choi',
        titleKo: '파트너변호사',
        titleEn: 'Partner',
        practiceAreasKo: ['관세', '국제통상', 'FTA'],
        practiceAreasEn: ['Customs', 'International Trade', 'FTA'],
        imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
        office: 'Seoul',
      },
      {
        nameKo: '정수진',
        nameEn: 'Su-Jin Jung',
        titleKo: '파트너변호사',
        titleEn: 'Partner',
        practiceAreasKo: ['디지털금융', '핀테크', '데이터보호'],
        practiceAreasEn: ['Digital Finance', 'Fintech', 'Data Protection'],
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop',
        office: 'Seoul',
      },
      {
        nameKo: '강태준',
        nameEn: 'Tae-Jun Kang',
        titleKo: '파트너변호사',
        titleEn: 'Partner',
        practiceAreasKo: ['세무', '조세', '이전가격'],
        practiceAreasEn: ['Tax', 'Transfer Pricing'],
        imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
        office: 'Seoul',
      },
      {
        nameKo: '윤서연',
        nameEn: 'Seo-Yeon Yoon',
        titleKo: '파트너변호사',
        titleEn: 'Partner',
        practiceAreasKo: ['환경', 'ESG', '에너지'],
        practiceAreasEn: ['Environment', 'ESG', 'Energy'],
        imageUrl: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop',
        office: 'Seoul',
      },
    ];

    attorneysData.forEach((data) => {
      const id = randomUUID();
      this.attorneys.set(id, { id, ...data });
    });

    const officesData: InsertOffice[] = [
      {
        nameKo: '서울',
        nameEn: 'Seoul',
        addressKo: '서울특별시 강남구 영동대로 511 센트로폴리스',
        addressEn: '511 Yeongdong-daero, Gangnam-gu, Seoul, Korea (Centropolis)',
        type: 'Headquarters',
      },
      {
        nameKo: '판교',
        nameEn: 'Pangyo',
        addressKo: '경기도 성남시 분당구 판교역로146번길 20',
        addressEn: '20 Pangyoyeok-ro 146beon-gil, Bundang-gu, Seongnam-si, Gyeonggi-do',
        type: 'Domestic',
      },
      {
        nameKo: '베이징',
        nameEn: 'Beijing',
        addressKo: '중국 베이징시',
        addressEn: 'Beijing, China',
        type: 'International',
      },
      {
        nameKo: '상하이',
        nameEn: 'Shanghai',
        addressKo: '중국 상하이시',
        addressEn: 'Shanghai, China',
        type: 'International',
      },
      {
        nameKo: '홍콩',
        nameEn: 'Hong Kong',
        addressKo: '중국 홍콩',
        addressEn: 'Hong Kong, China',
        type: 'International',
      },
      {
        nameKo: '하노이',
        nameEn: 'Hanoi',
        addressKo: '베트남 하노이',
        addressEn: 'Hanoi, Vietnam',
        type: 'International',
      },
      {
        nameKo: '호치민',
        nameEn: 'Ho Chi Minh',
        addressKo: '베트남 호치민',
        addressEn: 'Ho Chi Minh, Vietnam',
        type: 'International',
      },
      {
        nameKo: '두바이',
        nameEn: 'Dubai',
        addressKo: 'UAE 두바이',
        addressEn: 'Dubai, UAE',
        type: 'International',
      },
      {
        nameKo: '양곤',
        nameEn: 'Yangon',
        addressKo: '미얀마 양곤',
        addressEn: 'Yangon, Myanmar',
        type: 'International',
      },
      {
        nameKo: '자카르타',
        nameEn: 'Jakarta',
        addressKo: '인도네시아 자카르타',
        addressEn: 'Jakarta, Indonesia',
        type: 'International',
      },
      {
        nameKo: '싱가포르',
        nameEn: 'Singapore',
        addressKo: '싱가포르',
        addressEn: 'Singapore',
        type: 'International',
      },
    ];

    officesData.forEach((data) => {
      const id = randomUUID();
      this.offices.set(id, { id, ...data });
    });

    const eventsData: InsertEvent[] = [
      {
        titleKo: 'AI와 법률: 생성형 AI 시대의 기업 법무',
        titleEn: 'AI and Law: Corporate Legal in the Age of Generative AI',
        descriptionKo:
          '생성형 AI가 기업 법무에 미치는 영향과 대응 전략을 논의하는 세미나입니다. AI 규제, 데이터 보호, 책임 소재 등 핵심 이슈를 다룹니다.',
        descriptionEn:
          'A seminar discussing the impact of generative AI on corporate legal affairs and response strategies. Covers key issues including AI regulation, data protection, and liability.',
        date: '2025-11-15',
        time: '14:00 - 17:00',
        location: '센트로폴리스 Conference Hall A',
        type: 'Seminar',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
        registrationUrl: '#register',
      },
      {
        titleKo: 'M&A 실무 워크숍',
        titleEn: 'M&A Practical Workshop',
        descriptionKo:
          '국내외 M&A 거래의 최신 동향과 실무 전략을 공유하는 워크숍입니다. Due diligence부터 계약 체결까지의 전 과정을 실습합니다.',
        descriptionEn:
          'Workshop sharing latest trends and practical strategies in domestic and international M&A transactions. Hands-on practice from due diligence to contract execution.',
        date: '2025-11-28',
        time: '09:30 - 16:00',
        location: '센트로폴리스 Seminar Room B',
        type: 'Workshop',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
        registrationUrl: '#register',
      },
      {
        titleKo: '2025 자본시장 법률 컨퍼런스',
        titleEn: '2025 Capital Markets Legal Conference',
        descriptionKo:
          '자본시장 규제 변화와 ESG 공시, 지배구조 개선 등 최신 이슈를 다루는 연례 컨퍼런스입니다.',
        descriptionEn:
          'Annual conference covering capital market regulatory changes, ESG disclosure, and corporate governance improvements.',
        date: '2025-12-05',
        time: '13:00 - 18:00',
        location: '서울 그랜드 호텔',
        type: 'Conference',
        imageUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=600&fit=crop',
        registrationUrl: '#register',
      },
      {
        titleKo: '국제중재 실무 세미나',
        titleEn: 'International Arbitration Practice Seminar',
        descriptionKo:
          'ICC, SIAC 등 주요 국제중재기관의 절차와 실무 경험을 공유하는 세미나입니다.',
        descriptionEn:
          'Seminar sharing procedures and practical experience of major international arbitration institutions including ICC and SIAC.',
        date: '2026-01-18',
        time: '15:00 - 17:30',
        location: '센트로폴리스 Conference Hall B',
        type: 'Seminar',
        imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop',
        registrationUrl: '#register',
      },
      {
        titleKo: '스타트업 법무 지원 프로그램',
        titleEn: 'Startup Legal Support Program',
        descriptionKo:
          '초기 스타트업을 위한 법률 자문 및 투자 유치 전략을 제공하는 프로그램입니다.',
        descriptionEn:
          'Program providing legal consultation and investment strategies for early-stage startups.',
        date: '2026-02-14',
        time: '10:00 - 12:00',
        location: '판교 분사무소',
        type: 'Program',
        imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
        registrationUrl: '#register',
      },
      {
        titleKo: '개인정보보호법 개정 설명회',
        titleEn: 'Personal Data Protection Law Amendment Briefing',
        descriptionKo:
          '개인정보보호법 개정안의 주요 내용과 기업 대응 방안을 설명하는 브리핑입니다.',
        descriptionEn:
          'Briefing on key provisions of the Personal Data Protection Law amendments and corporate response measures.',
        date: '2026-03-22',
        time: '14:30 - 16:30',
        location: 'Online Webinar',
        type: 'Webinar',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        registrationUrl: '#register',
      },
    ];

    eventsData.forEach((data) => {
      const id = randomUUID();
      this.events.set(id, { 
        id, 
        ...data,
        registrationUrl: data.registrationUrl ?? null,
      });
    });
  }

  async getPracticeAreas(): Promise<PracticeArea[]> {
    return Array.from(this.practiceAreas.values()).sort((a, b) => a.order - b.order);
  }

  async getNewsItems(): Promise<NewsItem[]> {
    return Array.from(this.newsItems.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getNewsletters(): Promise<Newsletter[]> {
    return Array.from(this.newsletters.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async getAttorneys(): Promise<Attorney[]> {
    return Array.from(this.attorneys.values());
  }

  async getOffices(): Promise<Office[]> {
    return Array.from(this.offices.values());
  }

  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values()).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }

  async createSubscription(data: InsertSubscription): Promise<Subscription> {
    const existing = await this.getSubscriptionByEmail(data.email);
    if (existing) {
      throw new Error('Email already subscribed');
    }

    const id = randomUUID();
    const subscribedAt = new Date().toISOString();
    const subscription: Subscription = { id, ...data, subscribedAt };
    this.subscriptions.set(id, subscription);
    return subscription;
  }

  async getSubscriptionByEmail(email: string): Promise<Subscription | undefined> {
    return Array.from(this.subscriptions.values()).find((sub) => sub.email === email);
  }

  async createContact(data: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const submittedAt = new Date().toISOString();
    const contact: Contact = { 
      id, 
      ...data, 
      phone: data.phone ?? null,
      company: data.company ?? null,
      submittedAt 
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async createConsultation(data: InsertConsultation): Promise<Consultation> {
    const id = randomUUID();
    const token = randomUUID();
    const submittedAt = new Date().toISOString();
    const consultation: Consultation = {
      id,
      ...data,
      phone: data.phone ?? null,
      company: data.company ?? null,
      status: 'pending',
      token,
      submittedAt,
      confirmedAt: null,
    };
    this.consultations.set(id, consultation);
    return consultation;
  }

  async getConsultationByToken(token: string): Promise<Consultation | undefined> {
    return Array.from(this.consultations.values()).find((c) => c.token === token);
  }

  async confirmConsultation(token: string): Promise<Consultation> {
    const consultation = await this.getConsultationByToken(token);
    if (!consultation) {
      throw new Error('Invalid confirmation token');
    }
    
    if (consultation.status === 'confirmed') {
      throw new Error('Consultation already confirmed');
    }

    const confirmedAt = new Date().toISOString();
    const updated: Consultation = {
      ...consultation,
      status: 'confirmed',
      confirmedAt,
    };
    this.consultations.set(consultation.id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
