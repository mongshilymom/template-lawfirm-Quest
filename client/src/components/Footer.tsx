import React from 'react';

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">QUEST Legal</h3>
            <p className="text-sm text-gray-600 leading-6">
              전문 법률 서비스를 제공하는 로펌 웹사이트 데모입니다. 이 사이트는 시연 목적의 템플릿으로 실제 법률 자문을 제공하지 않습니다.
            </p>
          </div>

          <nav aria-label="빠른 링크">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">빠른 링크</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a className="hover:text-gray-900" href="#practices">업무 분야</a></li>
              <li><a className="hover:text-gray-900" href="#news">뉴스</a></li>
              <li><a className="hover:text-gray-900" href="#insights">인사이트</a></li>
              <li><a className="hover:text-gray-900" href="/about">회사 소개</a></li>
              <li><a className="hover:text-gray-900" href="/contact">문의</a></li>
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">문의</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>서울 강남구 언주로00길 00</li>
              <li>+82-2-3404-0000</li>
              <li><a className="hover:text-gray-900" href="mailto:info@questlegal.co.kr">info@questlegal.co.kr</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">글로벌 오피스</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>서울 (Headquarters)</li>
              <li>베이징  상하이  홍콩</li>
              <li>하노이  호치민  싱가포르  두바이</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
             {new Date().getFullYear()} QUEST Legal. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <a className="hover:text-gray-900" href="#">개인정보처리방침</a>
            <a className="hover:text-gray-900" href="#">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
