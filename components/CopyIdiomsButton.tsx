import React, { useState } from 'react';
import type { Idiom } from '../types';
import ClipboardIcon from './icons/ClipboardIcon';
import CheckIcon from './icons/CheckIcon';

interface CopyIdiomsButtonProps {
  idioms: Idiom[];
}

const CopyIdiomsButton: React.FC<CopyIdiomsButtonProps> = ({ idioms }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    const germanIdiomsText = idioms.map(idiom => idiom.german).join('\n');
    navigator.clipboard.writeText(germanIdiomsText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 border-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
        isCopied
          ? 'bg-emerald-500 border-emerald-600 text-white'
          : 'bg-white border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white'
      }`}
    >
      {isCopied ? (
        <>
          <CheckIcon className="w-5 h-5" />
          <span>کپی شد!</span>
        </>
      ) : (
        <>
          <ClipboardIcon className="w-5 h-5" />
          <span>کپی عناوین آلمانی (۱-۱۰۰)</span>
        </>
      )}
    </button>
  );
};

export default CopyIdiomsButton;
