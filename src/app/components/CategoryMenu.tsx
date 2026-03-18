import { Card } from './ui/card';
import { Button } from './ui/button';
import { BookOpen, Globe } from 'lucide-react';
import { Category } from '../types/game';

interface CategoryMenuProps {
  onSelectCategory: (category: Category) => void;
}

export function CategoryMenu({ onSelectCategory }: CategoryMenuProps) {
  return (
    <Card className="w-full max-w-2xl p-8 bg-white/95 backdrop-blur shadow-2xl border-4 border-amber-600">
      <div className="text-center mb-8">
        <div className="text-7xl mb-2">😂</div>
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 mb-4 animate-pulse">
          Стани за смях!
        </h1>
        <p className="text-lg text-gray-700 font-semibold">
          Избери категория и отговори на 15 въпроса! 🤪
        </p>
        <p className="text-md text-gray-600 mt-2">
          Нека проверим колко знаеш! 😆
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <button
          onClick={() => onSelectCategory('history')}
          className="group relative overflow-hidden rounded-xl p-8 bg-gradient-to-br from-orange-600 to-amber-700 hover:from-orange-700 hover:to-amber-800 transition-all transform hover:scale-105 hover:rotate-1 shadow-lg hover:shadow-xl border-4 border-amber-800"
        >
          <div className="flex flex-col items-center text-white">
            <div className="text-5xl mb-3 group-hover:rotate-12 transition-transform">🏛️</div>
            <h2 className="text-2xl font-bold mb-2">История</h2>
            <p className="text-sm opacity-90">Исторически факти и събития</p>
          </div>
        </button>

        <button
          onClick={() => onSelectCategory('geography')}
          className="group relative overflow-hidden rounded-xl p-8 bg-gradient-to-br from-blue-600 to-cyan-700 hover:from-blue-700 hover:to-cyan-800 transition-all transform hover:scale-105 hover:-rotate-1 shadow-lg hover:shadow-xl border-4 border-blue-800"
        >
          <div className="flex flex-col items-center text-white">
            <div className="text-5xl mb-3 group-hover:rotate-12 transition-transform">🌍</div>
            <h2 className="text-2xl font-bold mb-2">География</h2>
            <p className="text-sm opacity-90">Географски знания и открития</p>
          </div>
        </button>
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-4 border-amber-300">
        <p className="text-center text-sm text-gray-800 font-semibold">
          😜 <strong>Как се играе:</strong> Отговаряй на въпросите! 
          При всеки правилен отговор печалбата ти расте! Но внимавай - един грешен отговор и всички ще се смеят! 🤣
        </p>
      </div>
    </Card>
  );
}