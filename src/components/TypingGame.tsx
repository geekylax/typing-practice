'use client';

import { useState, useEffect } from 'react';
import TypingTest from '@/components/TypingTest';
import { generateText, DifficultyLevel } from '@/utils/textGenerator';

export default function TypingGame() {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [currentText, setCurrentText] = useState('');
  const [key, setKey] = useState(0);
  const [results, setResults] = useState<{ wpm: number; accuracy: number } | null>(null);

  // Generate initial text after component mounts
  useEffect(() => {
    setCurrentText(generateText('medium'));
  }, []);

  const handleDifficultyChange = (newDifficulty: DifficultyLevel) => {
    setDifficulty(newDifficulty);
    setCurrentText(generateText(newDifficulty));
    setResults(null);
    setKey(prev => prev + 1);
  };

  const handleComplete = (wpm: number, accuracy: number) => {
    setResults({ wpm, accuracy });
    setCurrentText(generateText(difficulty));
    setKey(prev => prev + 1);
  };

  // Don't render TypingTest until we have text
  if (!currentText) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center gap-4 mb-8">
        {(['easy', 'medium', 'hard'] as DifficultyLevel[]).map((level) => (
          <button
            key={level}
            onClick={() => handleDifficultyChange(level)}
            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
              difficulty === level
                ? level === 'easy' 
                  ? 'bg-green-500 text-white scale-105'
                  : level === 'medium'
                  ? 'bg-yellow-500 text-white scale-105'
                  : 'bg-red-500 text-white scale-105'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

      {results && (
        <div className="mb-8 text-center">
          <div className="inline-block bg-gray-800/50 backdrop-blur-lg rounded-lg p-4 border border-gray-700/50">
            <h3 className="text-xl font-semibold text-gray-300 mb-2">Previous Result</h3>
            <div className="flex gap-8">
              <div>
                <span className="text-blue-400 font-bold text-2xl">{results.wpm}</span>
                <span className="text-gray-400 ml-2">WPM</span>
              </div>
              <div>
                <span className="text-green-400 font-bold text-2xl">{results.accuracy}%</span>
                <span className="text-gray-400 ml-2">Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <TypingTest 
        key={key} 
        text={currentText} 
        difficulty={difficulty} 
        onComplete={handleComplete}
      />
    </>
  );
}
