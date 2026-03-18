import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Question } from '../types/game';
import { prizeAmounts } from '../data/questions';
import { Trophy, DollarSign } from 'lucide-react';
import { shuffleArray } from '../utils/shuffle';
import confetti from 'canvas-confetti';

interface GameScreenProps {
  question: Question;
  questionNumber: number;
  currentPrize: number;
  onAnswer: (isCorrect: boolean, prize: number) => void;
}

interface ShuffledAnswer {
  text: string;
  originalIndex: number;
}

export function GameScreen({ question, questionNumber, currentPrize, onAnswer }: GameScreenProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState<ShuffledAnswer[]>([]);
  const [correctShuffledIndex, setCorrectShuffledIndex] = useState<number>(0);

  // Размесваме отговорите при всеки нов въпрос
  useEffect(() => {
    const answersWithIndex: ShuffledAnswer[] = question.answers.map((text, index) => ({
      text,
      originalIndex: index
    }));
    
    const shuffled = shuffleArray(answersWithIndex);
    setShuffledAnswers(shuffled);
    
    // Намираме новата позиция на правилния отговор
    const correctIndex = shuffled.findIndex(
      answer => answer.originalIndex === question.correctAnswer
    );
    setCorrectShuffledIndex(correctIndex);
    
    // Нулираме състоянието при нов въпрос
    setSelectedAnswer(null);
    setShowResult(false);
  }, [question]);

  const handleAnswerClick = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);

    setTimeout(() => {
      const isCorrect = index === correctShuffledIndex;
      
      // Пускаме конфети при правилен отговор! 🎉
      if (isCorrect) {
        // Ляв изстрел
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff6b35', '#f7931e', '#fdc830', '#4ecdc4', '#44a5ff']
        });
        
        // Десен изстрел
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff6b35', '#f7931e', '#fdc830', '#4ecdc4', '#44a5ff']
        });
      }
      
      onAnswer(isCorrect, question.prize);
      setSelectedAnswer(null);
      setShowResult(false);
    }, 2000);
  };

  const getAnswerClass = (index: number) => {
    if (!showResult) {
      return selectedAnswer === index
        ? 'bg-amber-500 text-white border-amber-600'
        : 'bg-white hover:bg-amber-50 border-amber-300 hover:border-amber-400';
    }

    if (index === correctShuffledIndex) {
      return 'bg-green-500 text-white border-green-600';
    }

    if (selectedAnswer === index && index !== correctShuffledIndex) {
      return 'bg-red-500 text-white border-red-600';
    }

    return 'bg-gray-200 text-gray-500 border-gray-300';
  };

  return (
    <div className="w-full max-w-5xl space-y-6">
      {/* Парична стълбица */}
      <Card className="p-4 bg-white/95 backdrop-blur shadow-xl border-4 border-amber-600">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🎯</div>
            <span className="font-bold text-lg">Въпрос {questionNumber} от 15</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-2xl">💰</div>
            <span className="font-bold text-xl text-amber-700">
              {currentPrize.toLocaleString()} лв
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-5 gap-2">
          {prizeAmounts.map((amount, index) => (
            <div
              key={index}
              className={`text-center py-2 px-1 rounded text-xs font-semibold border-2 ${
                index + 1 === questionNumber
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white border-amber-600 animate-pulse'
                  : index + 1 < questionNumber
                  ? 'bg-green-100 text-green-800 border-green-300'
                  : 'bg-gray-100 text-gray-600 border-gray-300'
              }`}
            >
              {amount.toLocaleString()} лв
            </div>
          ))}
        </div>
      </Card>

      {/* Въпрос */}
      <Card className="p-8 bg-white/95 backdrop-blur shadow-xl border-4 border-amber-600">
        <div className="mb-8">
          <div className="text-center text-5xl mb-4">🤔</div>
          <h2 className="text-2xl font-bold text-center text-gray-800 leading-relaxed">
            {question.question}
          </h2>
        </div>

        {/* Отговори */}
        <div className="grid md:grid-cols-2 gap-4">
          {shuffledAnswers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              disabled={showResult}
              className={`p-6 rounded-xl border-4 text-lg font-semibold transition-all transform hover:scale-105 disabled:transform-none ${getAnswerClass(
                index
              )}`}
            >
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-black/10 font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1 text-left">{answer.text}</span>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}