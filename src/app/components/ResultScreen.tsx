import { Card } from './ui/card';
import { Button } from './ui/button';
import { Trophy, XCircle, Sparkles, Share2 } from 'lucide-react';
import { Category } from '../types/game';

interface ResultScreenProps {
  isWon: boolean;
  prize: number;
  category: Category;
  onPlayAgain: () => void;
}

export function ResultScreen({ isWon, prize, category, onPlayAgain }: ResultScreenProps) {
  const categoryName = category === 'history' ? 'История' : 'География';

  const handleShare = async () => {
    const shareText = isWon 
      ? `🎉 Спечелих играта "Стани за смях"!\n💰 Печалба: ${prize.toLocaleString()} лв\n📚 Категория: ${categoryName}\n🏆 Всички въпроси правилни! Никой няма да се смее на мен! 😎`
      : `😂 Играх "Стани за смях" и станах за смях!\n💰 Печалба: ${prize.toLocaleString()} лв\n📚 Категория: ${categoryName}\n🤣 Но беше весело!`;

    // Проверяваме дали браузърът поддържа Web Share API
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Стани за смях!',
          text: shareText,
        });
      } catch (error) {
        // Ако потребителят отмени споделянето, не правим нищо
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error sharing:', error);
          copyToClipboard(shareText);
        }
      }
    } else {
      // Fallback: копираме в clipboard
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('📋 Резултатът е копиран! Можеш да го споделиш където искаш! 😊');
    }).catch((error) => {
      console.error('Error copying to clipboard:', error);
    });
  };

  return (
    <Card className="w-full max-w-2xl p-8 bg-white/95 backdrop-blur text-center shadow-2xl border-4 border-amber-600">
      {isWon ? (
        <>
          <div className="mb-6">
            <div className="text-8xl animate-bounce">🎉</div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
            Браво! Шампион! 🏆
          </h1>
          <p className="text-2xl text-gray-700 mb-2">
            Спечелихте играта!
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Никой няма да се смее на теб! 😎
          </p>
        </>
      ) : (
        <>
          <div className="mb-6">
            <div className="text-8xl animate-bounce">😂</div>
          </div>
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-4">
            Ха-ха-ха! 🤣
          </h1>
          <p className="text-2xl text-gray-700 mb-2">
            Грешен отговор!
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Всички се смеят на теб сега! 😜
          </p>
        </>
      )}

      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white rounded-2xl p-8 mb-8 border-4 border-amber-700">
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="text-5xl">💰</div>
          <div className="text-left">
            <p className="text-sm opacity-90">Твоята печалба</p>
            <p className="text-5xl font-bold">
              {prize.toLocaleString()} лв
            </p>
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-4 border-amber-300">
        <p className="text-gray-700 font-semibold">
          Категория: <span className="font-bold text-gray-800">{categoryName}</span> {category === 'history' ? '🏛️' : '🌍'}
        </p>
      </div>

      <Button
        onClick={onPlayAgain}
        size="lg"
        className="w-full text-lg py-6 bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 border-4 border-amber-700 transform hover:scale-105 transition-all"
      >
        Играй отново! 🎮
      </Button>

      <Button
        onClick={handleShare}
        size="lg"
        variant="outline"
        className="w-full text-lg py-6 mt-4 bg-white hover:bg-amber-50 text-amber-700 border-4 border-amber-600 hover:border-amber-700 transform hover:scale-105 transition-all"
      >
        <Share2 className="mr-2 h-5 w-5" />
        Сподели резултата! 📤
      </Button>

      {!isWon && prize > 0 && (
        <p className="mt-4 text-sm text-gray-600 font-semibold">
          Поне спечели {prize.toLocaleString()} лв преди да стане за смях! 😅
        </p>
      )}
      
      {!isWon && prize === 0 && (
        <p className="mt-4 text-sm text-gray-600 font-semibold">
          Не спечели нищо! По-голям смях няма! 🤪
        </p>
      )}
    </Card>
  );
}