import React from 'react';

export const tipButton = () => {
  return (
    <div>
      <a
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-surface text-xs font-semibold uppercase tracking-wider rounded-full hover:opacity-80 transition-opacity"
        href="https://payments.saporiti.cl/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Donar Sats con LN
      </a>
    </div>
  );
};
