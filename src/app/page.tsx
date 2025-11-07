'use client';
import { Suspense } from 'react';
import { Catalog } from './components/catalog/Catalog';

export default function Home() {
  return (
    <main>
      <Suspense>
        <Catalog />
      </Suspense>
    </main>
  );
}
