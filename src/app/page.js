'use client';  

import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/secondpage");  
  };

  return (
    <main className="grid min-h-screen w-full place-items-center bg-gray-100">
      <button 
        className="group relative h-12 w-48 overflow-hidden rounded-lg bg-red-600 text-lg shadow text-white hover:bg-red-700"
        onClick={handleNavigation}
      >
        Start Quiz
      </button>
    </main>
  );
}

export default Page;
