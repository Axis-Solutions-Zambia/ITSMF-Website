import { motion } from 'motion/react';

export function PageSkeleton() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto w-full flex flex-col gap-16">
      {/* Hero Section Skeleton */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
        <div className="w-full lg:w-2/3 space-y-4">
          <div className="h-16 md:h-24 bg-brand-text/5 animate-pulse rounded-md w-3/4"></div>
          <div className="h-16 md:h-24 bg-brand-text/5 animate-pulse rounded-md w-5/6"></div>
          <div className="h-16 md:h-24 bg-brand-text/5 animate-pulse rounded-md w-2/3"></div>
        </div>
        <div className="w-full lg:w-1/3 space-y-4 pt-4 hidden lg:block">
          <div className="h-4 bg-brand-text/5 animate-pulse rounded-md w-1/3 mb-8"></div>
          <div className="h-4 bg-brand-text/5 animate-pulse rounded-md w-full"></div>
          <div className="h-4 bg-brand-text/5 animate-pulse rounded-md w-5/6"></div>
          <div className="h-4 bg-brand-text/5 animate-pulse rounded-md w-4/5"></div>
        </div>
      </div>

      {/* Buttons Skeleton */}
      <div className="flex gap-6">
        <div className="h-14 w-40 bg-brand-text/5 animate-pulse rounded-sm"></div>
        <div className="h-14 w-48 bg-brand-text/5 animate-pulse rounded-sm"></div>
      </div>

      {/* Stats/Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-3">
            <div className="h-10 w-24 bg-brand-text/5 animate-pulse rounded-md"></div>
            <div className="h-4 w-full bg-brand-text/5 animate-pulse rounded-md"></div>
            <div className="h-4 w-2/3 bg-brand-text/5 animate-pulse rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
