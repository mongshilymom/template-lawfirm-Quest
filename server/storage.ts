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

  constructor() {
    this.practiceAreas = new Map();
    this.newsItems = new Map();
    this.newsletters = new Map();
    this.attorneys = new Map();
    this.offices = new Map();
    this.events = new Map();
    this.subscriptions = new Map();
    this.contacts = new Map();

    this.seedData();
  }

  private seedData() {
    const practiceAreasData: InsertPracticeArea[] = [
      {
        titleKo: 'Corporate Governance',
        titleEn: 'Corporate Governance',
        descriptionKo:
          '지배구조 확립부터 경영권 분쟁 대응에 이르기까지 기업지배구조 전반에 대해 고객 맞춤형 통합 자문과 실행 전략을 제시합니다.',
        descriptionEn:
          'We provide customized integrated advice and implementation strategies for all aspects of corporate governance, from establishing governance structures to responding to management disputes.',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
        order: 1,
      },
      {
        titleKo: 'Customs & International Trade',
        titleEn: 'Customs & International Trade',
        descriptionKo:
          '관세·국제통상 그룹은 FTA, 이전가격, 신상품, 조사 강화, 보호주의 등 국내외적 관세·통상 환경의 변화·위협에 대해 고객의 요구를 충족시킬 수 있는 통합적인 솔루션을 제공하고 있습니다.',
        descriptionEn:
          'Our Customs & International Trade group provides integrated solutions to meet client needs amid changes and threats in the domestic and international customs and trade environment.',
        imageUrl: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&h=600&fit=crop',
        order: 2,
      },
      {
        titleKo: 'Antitrust & Competition',
        titleEn: 'Antitrust & Competition',
        descriptionKo:
          '공정거래그룹은 탁월한 전문성을 바탕으로 공정거래 관련 규제 대응, 행정 및 민∙형사소송, 기업결합신고, 컴플라이언스 및 입법자문 등 공정거래 관련 업무 전반을 진행하고 있습니다.',
        descriptionEn:
          'Our Antitrust & Competition group handles all antitrust-related matters including regulatory compliance, administrative and civil/criminal litigation, merger notifications, and legislative advice.',
        imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
        order: 3,
      },
      {
        titleKo: 'Regulatory & Compliance',
        titleEn: 'Regulatory & Compliance',
        descriptionKo:
          '컴플라이언스 그룹은 컴플라이언스 업무에 대한 풍부한 자문 경험과 고도의 전문성을 바탕으로 고객이 당면한 문제는 물론 잠재적인 이슈들까지 최적의 솔루션을 제공하고 있습니다.',
        descriptionEn:
          'Our Compliance group provides optimal solutions for both current issues and potential problems based on extensive advisory experience and high-level expertise.',
        imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop',
        order: 4,
      },
      {
        titleKo: 'Digital Finance',
        titleEn: 'Digital Finance',
        descriptionKo:
          '디지털금융은 금융과 IT 기술이 융합된 분야로서 최근 각종 규제와 지침, 정보보안, AML 등 금융규제와 IT 기술 및 비지니스가 교차하는 복합적인 문제들을 다룰 것이 요구되고 있습니다.',
        descriptionEn:
          'Digital finance is a field where finance and IT technology converge, requiring handling of complex issues where financial regulations, IT technology, and business intersect.',
        imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop',
        order: 5,
      },
      {
        titleKo: 'International Arbitration',
        titleEn: 'International Arbitration',
        descriptionKo:
          '국제중재 분야에서 오랜 경험과 전문성을 보유하고 있으며, ICC, SIAC, HKIAC 등 주요 국제중재기관에서 다양한 사건을 수행하고 있습니다.',
        descriptionEn:
          'We have extensive experience and expertise in international arbitration, handling various cases at major international arbitration institutions including ICC, SIAC, and HKIAC.',
        imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop',
        order: 6,
      },
    ];

    practiceAreasData.forEach((data) => {
      const id = randomUUID();
      this.practiceAreas.set(id, { id, ...data });
    });

    const newsItemsData: InsertNewsItem[] = [
      {
        titleKo: 'QUEST Legal \'거버넌스 솔루션 센터\' 출범',
        titleEn: 'QUEST Legal Launches \'Governance Solution Center\'',
        descriptionKo:
          'QUEST Legal이 기업 지배구조 이슈와 주주간 분쟁, 자본시장 규제 등에 종합적으로 대응하는 \'거버넌스 솔루션 센터(Governance Solution Center)를\' 출범했습니다.',
        descriptionEn:
          'QUEST Legal has launched the Governance Solution Center to comprehensively address corporate governance issues, shareholder disputes, and capital market regulations.',
        category: 'Select Topics',
        date: '2025-07-04',
        imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      },
      {
        titleKo: '2년 연속 전 분야 상위권 최고 평가',
        titleEn: '2 Years Consecutive Top Rankings Across All Fields',
        descriptionKo:
          'QUEST Legal이 \'2025 로펌 컨수머 리포트\'(법률신문·IHCF·한국사내변호사회 공동기획)에서 전 분야 상위권을 기록하며 2년 연속 최고 평가를 받았습니다.',
        descriptionEn:
          'QUEST Legal received top rankings across all fields in the 2025 Law Firm Consumer Report for the second consecutive year.',
        category: 'Awards',
        date: '2025-05-12',
        imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
      },
      {
        titleKo: 'QUEST Legal, 17년 연속 ALB \'일하기 좋은 로펌\' 선정',
        titleEn: 'QUEST Legal Selected as ALB Employer of Choice for 17th Consecutive Year',
        descriptionKo:
          'QUEST Legal이 아시아·태평양 지역 법률 전문지 ALB(Asian Legal Business)가 선정한 \'올해의 일하기 좋은 로펌\'(Employer of Choice 2025)에 17년 연속 선정됐습니다.',
        descriptionEn:
          'QUEST Legal has been selected as Employer of Choice 2025 by Asian Legal Business (ALB) for the 17th consecutive year.',
        category: 'Awards',
        date: '2025-04-18',
        imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop',
      },
      {
        titleKo: '글로벌 로펌 \'A&O\'서 크리스 테일러 외국변호사 영입',
        titleEn: 'QUEST Legal Recruits Chris Taylor from Global Firm A&O',
        descriptionKo:
          'QUEST Legal은 영국 5대 로펌을 뜻하는 \'매직서클\' 중 하나인 글로벌 로펌 Allen & Overy의 크리스 테일러 외국변호사를 영입했습니다.',
        descriptionEn:
          'QUEST Legal has recruited foreign attorney Chris Mainwaring-Taylor from Allen & Overy, one of the UK\'s Magic Circle law firms.',
        category: 'Select Topics',
        date: '2025-01-02',
        imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
      },
      {
        titleKo: 'QUEST Legal, 7년 연속 \'글로벌 200대 로펌\'',
        titleEn: 'QUEST Legal Named to Global 200 for 7th Consecutive Year',
        descriptionKo:
          'QUEST Legal이 아메리칸 로이어(The American Lawyer, ALM)가 선정하는 \'글로벌 200대 로펌\'에 7년 연속으로 이름을 올렸습니다.',
        descriptionEn:
          'QUEST Legal has been named to The American Lawyer\'s Global 200 list for the 7th consecutive year.',
        category: '법인소식',
        date: '2024-09-20',
        imageUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=600&fit=crop',
      },
      {
        titleKo: '미래금융전략센터 출범',
        titleEn: 'Launch of Future Finance Strategy Center',
        descriptionKo:
          'QUEST Legal은 생성형 AI의 등장으로 금융권 디지털 혁신이 가속화하는 가운데 미래금융 분야의 전문성을 총집결하여 \'미래금융전략센터(Future Finance Strategy Center)\'를 출범했습니다.',
        descriptionEn:
          'QUEST Legal has launched the Future Finance Strategy Center, consolidating expertise in future finance as digital innovation accelerates in the financial sector with the emergence of generative AI.',
        category: 'Select Topics',
        date: '2024-07-24',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
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
        titleKo: '美 상무부, 수출통제 기업 목록 관련 법인 전반에 \'50% 지분율\' 규정 도입',
        titleEn: 'US Commerce Dept. Introduces 50% Ownership Rule for Export Control Entity List',
        contentKo:
          '미국 상무부가 수출통제 기업 목록과 관련하여 법인 전반에 50% 지분율 규정을 새롭게 도입했습니다. 이는 수출통제 대상 기업의 범위를 확대하고 규제를 강화하기 위한 조치입니다.',
        contentEn:
          'The US Commerce Department has introduced a new 50% ownership rule for the export control entity list, expanding the scope of regulated entities and strengthening controls.',
        date: '2025-10-01',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      },
      {
        titleKo: 'AI기본법 가이드라인 해설 시리즈 (5) : 인공지능 영향평가 가이드라인',
        titleEn: 'AI Basic Law Guideline Series (5): AI Impact Assessment Guidelines',
        contentKo:
          'AI기본법에 따른 인공지능 영향평가 가이드라인에 대한 상세한 해설을 제공합니다. 기업들이 AI 시스템 도입 시 고려해야 할 사항들을 정리했습니다.',
        contentEn:
          'Detailed explanation of the AI Impact Assessment Guidelines under the AI Basic Law, outlining key considerations for companies implementing AI systems.',
        date: '2025-10-02',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
      },
      {
        titleKo: '한미 비자 관련 워킹그룹 회의 개최의 시사점',
        titleEn: 'Implications of Korea-US Visa Working Group Meeting',
        contentKo:
          '최근 개최된 한미 비자 관련 워킹그룹 회의의 주요 내용과 기업들에게 미치는 영향을 분석합니다.',
        contentEn:
          'Analysis of key outcomes from the recent Korea-US visa working group meeting and implications for businesses.',
        date: '2025-10-01',
        imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
      },
      {
        titleKo: '상법 추가 개정안 통과',
        titleEn: 'Additional Commercial Act Amendment Passed',
        contentKo:
          '상법 추가 개정안이 국회를 통과하면서 기업들의 지배구조와 경영에 중요한 변화가 예상됩니다.',
        contentEn:
          'With the passage of additional Commercial Act amendments, significant changes are expected in corporate governance and management.',
        date: '2025-08-25',
        imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop',
      },
      {
        titleKo: '노란봉투법 국회 본회의 통과',
        titleEn: 'Yellow Envelope Act Passes National Assembly',
        contentKo:
          '노동조합의 쟁의행위 중 손해배상 책임을 제한하는 이른바 \'노란봉투법\'이 국회 본회의를 통과했습니다.',
        contentEn:
          'The so-called Yellow Envelope Act, which limits liability for damages during labor union disputes, has passed the National Assembly plenary session.',
        date: '2025-08-24',
        imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
      },
      {
        titleKo: '배임죄 폐지 추진',
        titleEn: 'Push to Abolish Breach of Trust Crime',
        contentKo:
          '형법상 배임죄를 폐지하려는 움직임이 본격화되고 있습니다. 이는 기업 경영진의 경영 판단에 큰 영향을 미칠 것으로 예상됩니다.',
        contentEn:
          'Efforts to abolish the crime of breach of trust under criminal law are gaining momentum, expected to significantly impact corporate management decisions.',
        date: '2025-09-30',
        imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop',
      },
      {
        titleKo: 'QUEST Legal - 최신 인사노무 동향 Vol.4',
        titleEn: 'QUEST Legal - Latest Labor & Employment Trends Vol.4',
        contentKo:
          '최신 인사노무 관련 판례와 규제 동향을 정리한 네 번째 보고서를 발간했습니다.',
        contentEn:
          'Published the fourth report summarizing the latest labor and employment case law and regulatory trends.',
        date: '2025-09-30',
        imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop',
      },
      {
        titleKo: 'AI기본법 가이드라인 해설 시리즈 (4) : 고영향 인공지능사업자의 책무 관련 고시 및 가이드라인',
        titleEn: 'AI Basic Law Series (4): High-Impact AI Operator Responsibilities',
        contentKo:
          '고영향 인공지능사업자의 책무에 관한 고시 및 가이드라인을 상세히 해설합니다.',
        contentEn:
          'Detailed explanation of notices and guidelines regarding the responsibilities of high-impact AI operators.',
        date: '2025-09-30',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
      },
      {
        titleKo: '국회증언감정법 개정, 기업 고발 리스크 증대',
        titleEn: 'National Assembly Testimony Act Amendment Increases Corporate Prosecution Risk',
        contentKo:
          '국회증언감정법 개정으로 기업들의 고발 리스크가 증대되고 있습니다.',
        contentEn:
          'Amendment to the National Assembly Testimony Act increases the risk of corporate prosecutions.',
        date: '2025-09-30',
        imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop',
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
}

export const storage = new MemStorage();
