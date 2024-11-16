'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { DifficultyLevel } from '@/utils/textGenerator';
import { RiSpeedMiniFill, RiPulseLine, RiTimer2Line } from 'react-icons/ri';

interface TypingTestProps {
  text: string;
  difficulty: DifficultyLevel;
  onComplete: (wpm: number, accuracy: number) => void;
}

const TypingTest: React.FC<TypingTestProps> = ({ text, difficulty, onComplete }) => {
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    // Reset state when text changes
    setInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
    setCurrentCharIndex(0);
    setTimeElapsed(0);
  }, [text]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (startTime && !isCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime, isCompleted]);

  const calculateStats = useCallback(() => {
    if (!startTime) return;
    
    const timeInMinutes = (Date.now() - startTime) / 1000 / 60;
    const charactersTyped = input.length;
    const standardWordLength = 5;
    const currentWpm = Math.round((charactersTyped / standardWordLength) / timeInMinutes);
    
    const correctChars = input.split('').filter((char, i) => char === text[i]).length;
    const currentAccuracy = input.length > 0 ? Math.round((correctChars / input.length) * 100) : 100;

    setWpm(currentWpm);
    setAccuracy(currentAccuracy);
  }, [input, startTime, text]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newInput = e.target.value;
    if (!startTime) {
      setStartTime(Date.now());
    }
    
    setInput(newInput);
    setCurrentCharIndex(newInput.length);
    calculateStats();

    if (newInput.length === text.length) {
      setIsCompleted(true);
      onComplete(wpm, accuracy);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: DifficultyLevel) => {
    return {
      easy: 'text-green-400',
      medium: 'text-yellow-400',
      hard: 'text-red-400'
    }[difficulty];
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <motion.div 
          className={`text-lg font-semibold flex items-center gap-2 ${getDifficultyColor(difficulty)}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className={`w-2 h-2 rounded-full animate-pulse ${
            difficulty === 'easy' ? 'bg-green-400' :
            difficulty === 'medium' ? 'bg-yellow-400' :
            'bg-red-400'
          }`} />
          {difficulty.toUpperCase()} MODE
        </motion.div>
        <motion.div 
          className="flex items-center gap-2 text-cyan-400/80"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <RiTimer2Line className="text-xl" />
          {formatTime(timeElapsed)}
        </motion.div>
      </div>

      <div className="glass-panel cyber-border rounded-xl p-8">
        <div className="text-xl font-mono mb-6 leading-relaxed tracking-wide relative">
          <div 
            className="absolute w-[2px] h-[1.2em] bg-cyan-400 rounded-full transition-transform duration-75 ease-out animate-blink"
            style={{
              transform: `translateX(calc(${currentCharIndex * 1}ch - 1px))`,
              top: '0.1em',
              bottom: '0.1em'
            }}
          />
          {text.split('').map((char, i) => (
            <span
              key={i}
              className={`inline-block w-[1ch] ${
                i === currentCharIndex 
                  ? 'key-highlight'
                  : i < input.length
                  ? input[i] === char
                    ? 'text-cyan-400'
                    : 'text-red-400'
                  : 'text-gray-500'
              }`}
            >
              {char}
            </span>
          ))}
        </div>
        <textarea
          value={input}
          onChange={handleInput}
          className="w-full h-24 p-4 glass-panel rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none border border-cyan-500/20 text-lg transition-all duration-200"
          placeholder="Start typing..."
          disabled={isCompleted}
          autoFocus
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <motion.div 
          className="stat-card group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <RiSpeedMiniFill className="text-2xl text-cyan-400 group-hover:scale-110 transition-transform" />
          <div className="text-gray-400">WPM</div>
          <div className="text-3xl font-bold text-cyan-400">{wpm}</div>
        </motion.div>

        <motion.div 
          className="stat-card group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <RiPulseLine className="text-2xl text-purple-400 group-hover:scale-110 transition-transform" />
          <div className="text-gray-400">Accuracy</div>
          <div className="text-3xl font-bold text-purple-400">{accuracy}%</div>
        </motion.div>

        <motion.div 
          className="stat-card group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <RiTimer2Line className="text-2xl text-blue-400 group-hover:scale-110 transition-transform" />
          <div className="text-gray-400">Time</div>
          <div className="text-3xl font-bold text-blue-400">{formatTime(timeElapsed)}</div>
        </motion.div>
      </div>

      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel cyber-border p-8 rounded-xl text-center"
        >
          <h3 className="text-2xl font-bold text-cyan-400 mb-4 neon-text">Test Complete!</h3>
          <p className="text-gray-300 text-lg mb-6">
            You typed at <span className="text-cyan-400 font-semibold">{wpm} WPM</span> with{' '}
            <span className="text-purple-400 font-semibold">{accuracy}%</span> accuracy
          </p>
          <button
            onClick={() => onComplete(wpm, accuracy)}
            className="px-8 py-3 cyber-gradient rounded-full text-white font-semibold hover:scale-105 transition-transform"
          >
            Next Challenge
          </button>
        </motion.div>
      )}

      <style jsx>{`
        .stat-card {
          @apply glass-panel cyber-border p-6 rounded-xl flex flex-col items-center gap-2 hover:scale-105 transition-transform cursor-default;
        }
      `}</style>
    </div>
  );
};

export default TypingTest;
