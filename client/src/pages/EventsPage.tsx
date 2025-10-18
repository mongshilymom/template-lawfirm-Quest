import React, { useMemo, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

type EventType = 'Seminar' | 'Workshop' | 'Conference';
type EventItem = {
  id: number;
  titleKo: string;
  titleEn: string;
  type: EventType;
  date: string; // YYYY-MM-DD
};

const EVENT_TYPES = [
  { value: 'all',        labelKo: '전체',     labelEn: 'All' },
  { value: 'Seminar',    labelKo: '세미나',   labelEn: 'Seminar' },
  { value: 'Workshop',   labelKo: '워크숍',   labelEn: 'Workshop' },
  { value: 'Conference', labelKo: '컨퍼런스', labelEn: 'Conference' },
] as const;

const ALL_EVENTS: EventItem[] = [
  { id: 1, titleKo: '기업지배구조 세미나', titleEn: 'Corporate Governance Seminar', type: 'Seminar',    date: '2025-11-01' },
  { id: 2, titleKo: 'ESG 워크숍',          titleEn: 'ESG Workshop',                  type: 'Workshop',   date: '2025-11-10' },
  { id: 3, titleKo: '핀테크 컨퍼런스',     titleEn: 'Fintech Conference',            type: 'Conference', date: '2025-11-22' },
];

export default function EventsPage() {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<(typeof EVENT_TYPES)[number]['value']>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return ALL_EVENTS;
    return ALL_EVENTS.filter((e) => e.type === filter);
  }, [filter]);

  return (
    <main className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
      <div className="flex items-end justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-serif font-semibold">
          {language === 'ko' ? '이벤트' : 'Events'}
        </h1>

        <label className="text-sm text-muted-foreground">
          <span className="mr-2">{language === 'ko' ? '분류' : 'Type'}</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="border rounded-md px-2 py-1 text-sm"
          >
            {EVENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {language === 'ko' ? t.labelKo : t.labelEn}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((ev) => (
          <li key={ev.id} className="rounded-lg border p-4 bg-white">
            <h3 className="font-semibold text-foreground mb-1">
              {language === 'ko' ? ev.titleKo : ev.titleEn}
            </h3>
            <p className="text-sm text-muted-foreground">
              {language === 'ko' ? '일정' : 'Date'}: {ev.date}  {language === 'ko' ? '유형' : 'Type'}: {ev.type}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
