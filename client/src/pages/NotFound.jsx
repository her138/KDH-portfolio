import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function NotFound() {
  return (
    <main className="section-padding pt-32 min-h-[75vh] flex items-center">
      <div className="container-custom text-center space-y-6">
        <span className="section-title block">PAGE NOT FOUND</span>
        <h1 className="font-playfair text-5xl md:text-6xl font-semibold text-[#252422] dark:text-[#EDEDED]">404</h1>
        <p className="text-[#403D39] dark:text-[#B0B0B0]">That page doesn't exist or has moved.</p>
        <Link className="inline-flex gap-2 items-center text-[#EB5E28] hover:underline" to="/"><FiArrowLeft /> Return to homepage</Link>
      </div>
    </main>
  );
}
