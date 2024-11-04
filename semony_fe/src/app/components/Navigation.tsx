'use client'

// components/Navigation.tsx
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"; // 아이콘 임포트
import Link from "next/link"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* 네비게이션 열기/닫기 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-2 bg-gray-800 text-white fixed z-50 rounded-full shadow-md transition-all duration-300 hover:bg-gray-700 focus:outline-none  ${
          isOpen ? "top-4 left-[230px] bg-gray-900" : "top-4 left-4"
        }`}
      >
        {isOpen ? (
          <FontAwesomeIcon icon={faTimes} className="h-4" /> // 닫기 아이콘
        ) : (
          <FontAwesomeIcon icon={faBars} className="h-4" /> // 메뉴 아이콘
        )}
      </button>

      {/* 네비게이션 바 */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-in-out z-40 shadow-2xl`}
        style={{ width: "280px" }}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold mb-10 border-b border-gray-700 pb-4 tracking-wide">
           <Link href="/" onClick={() => setIsOpen(!isOpen)}> SEmony 
          </Link></h2>
          <ul className="space-y-8">
            <li>
              <Link onClick={() => setIsOpen(!isOpen)}
                href="/main"
                className="text-lg font-medium hover:text-blue-400 transition duration-300"
              >
                wafer map 조회
              </Link>
            </li>
            <li>
              <Link onClick={() => setIsOpen(!isOpen)}
                href="/macro"
                className="text-lg font-medium hover:text-blue-400 transition duration-300"
              >
                macro 조회
              </Link>
            </li>
            <li>
              <Link onClick={() => setIsOpen(!isOpen)}
                href="#"
                className="text-lg font-medium hover:text-blue-400 transition duration-300"
              >
                Services
              </Link>
            </li>
            <li>
              <Link onClick={() => setIsOpen(!isOpen)}
                href="#"
                className="text-lg font-medium hover:text-blue-400 transition duration-300"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* 배경 오버레이 - 네비게이션이 열렸을 때 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-60 z-30 backdrop-blur-sm transition-opacity duration-500 ease-in-out"
          onClick={() => setIsOpen(false)} // 네비게이션 외부 클릭 시 닫기
        />
      )}
    </div>
  );
}
