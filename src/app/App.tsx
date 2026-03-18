import { useState } from 'react';
import { CategoryMenu } from './components/CategoryMenu';
import { GameScreen } from './components/GameScreen';
import { ResultScreen } from './components/ResultScreen';
import { Question, Category } from './types/game';
import { historyQuestions, geographyQuestions, prizeAmounts } from './data/questions';
import { getRandomElements } from './utils/shuffle';

type GameState = 'menu' | 'playing' | 'result';

function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentPrize, setCurrentPrize] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    
    // Избираме 15 случайни въпроса от категорията
    const allQuestions = category === 'history' ? historyQuestions : geographyQuestions;
    const selectedQuestions = getRandomElements(allQuestions, 15);
    
    // Добавяме правилните награди към всеки въпрос
    const questionsWithPrizes = selectedQuestions.map((q, index) => ({
      ...q,
      prize: prizeAmounts[index]
    }));
    
    setQuestions(questionsWithPrizes);
    setCurrentQuestionIndex(0);
    setCurrentPrize(0);
    setIsGameWon(false);
    setGameState('playing');
  };

  const handleAnswer = (isCorrect: boolean, prize: number) => {
    if (isCorrect) {
      setCurrentPrize(prize);
      
      if (currentQuestionIndex === questions.length - 1) {
        // Победа!
        setIsGameWon(true);
        setGameState('result');
      } else {
        // Следващ въпрос
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    } else {
      // Грешен отговор
      setIsGameWon(false);
      setGameState('result');
    }
  };

  const handlePlayAgain = () => {
    setGameState('menu');
    setSelectedCategory(null);
    setCurrentQuestionIndex(0);
    setCurrentPrize(0);
    setIsGameWon(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-blue-100 relative overflow-hidden">
      {/* Тематични декоративни елементи за история и география */}
      <div className="absolute top-10 left-10 text-6xl opacity-20">🏛️</div>
      <div className="absolute top-20 right-20 text-5xl opacity-20">🗺️</div>
      <div className="absolute bottom-20 left-20 text-6xl opacity-20">📚</div>
      <div className="absolute bottom-10 right-10 text-5xl opacity-20">🌍</div>
      <div className="absolute top-1/2 left-5 text-4xl opacity-20">⚔️</div>
      <div className="absolute top-1/3 right-10 text-4xl opacity-20">🧭</div>
      <div className="absolute top-2/3 left-1/4 text-5xl opacity-20">👑</div>
      <div className="absolute bottom-1/3 right-1/4 text-5xl opacity-20">🗿</div>
      <div className="absolute top-1/4 left-1/3 text-4xl opacity-20">📖</div>
      <div className="absolute bottom-1/4 right-1/3 text-4xl opacity-20">🏔️</div>
      
      {/* Допълнителни декоративни линии и форми */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-1/4 w-64 h-64 border-4 border-amber-800 rounded-full"></div>
        <div className="absolute bottom-20 right-1/4 w-48 h-48 border-4 border-blue-800 rotate-45"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-4 border-orange-800 rounded-full"></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {gameState === 'menu' && (
          <CategoryMenu onSelectCategory={handleCategorySelect} />
        )}
        
        {gameState === 'playing' && questions.length > 0 && (
          <GameScreen
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            currentPrize={currentPrize}
            onAnswer={handleAnswer}
          />
        )}
        
        {gameState === 'result' && (
          <ResultScreen
            isWon={isGameWon}
            prize={currentPrize}
            category={selectedCategory!}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </div>
    </div>
  );
}

export default App;