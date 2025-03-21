'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useClientOnly from '@/hooks/useClientOnly'
import FullHeightLayout from '../../layout/FullHeightLayout'

interface OpenDiaryLayoutProps {
  leftPageContent: React.ReactNode
  rightPageContent: React.ReactNode
  prevHref: string
  nextHref?: string
  prevLabel?: string
  nextLabel?: string
  backgroundImage: string
}

export default function OpenDiaryLayout({ 
  leftPageContent, 
  rightPageContent, 
  prevHref, 
  nextHref,
  prevLabel = "Previous Page",
  nextLabel = "Next Page",
  backgroundImage
}: OpenDiaryLayoutProps) {
  const router = useRouter()
  // Use our custom hook with a custom breakpoint of 1000px
  const { isMobile, isClient } = useClientOnly(1000)

  useEffect(() => {
    // Only redirect if we're on the client AND it's a mobile device
    if (isClient && isMobile) {
      router.push('/diary')
    }
  }, [isMobile, router, isClient])

  // Show loading or nothing during SSR
  if (!isClient) {
    return <div className="min-h-screen bg-[#D8B29A]"></div>
  }

  if (isMobile) {
    return null // Will redirect via useEffect
  }

  return (
    <FullHeightLayout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#D8B29A] p-4">
        {/* Open Diary Layout with background image */}
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="w-full aspect-[3/2] relative">
            {/* Background diary image */}
            <Image 
              src={backgroundImage}
              alt="Diary background"
              fill
              className="object-contain"
              priority
            />
            
            {/* Content overlay - positioned to match the diary pages */}
            <div className="absolute inset-0 flex">
              {/* Left page content area */}
              <div className="w-1/2 pt-28 pb-20 pl-12 flex flex-col">
                {leftPageContent}
              </div>
              
              {/* Right page content area */}
              <div className="w-1/2 pt-28 pb-20 pr-12 flex flex-col">
                {rightPageContent}
              </div>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between w-full mt-4">
            <button 
              onClick={() => router.push(prevHref)}
              className="px-4 py-2 bg-amber-800 text-white rounded hover:bg-amber-700"
            >
              {prevLabel}
            </button>
            {nextHref && (
              <button 
                onClick={() => router.push(nextHref)}
                className="px-4 py-2 bg-amber-800 text-white rounded hover:bg-amber-700"
              >
                {nextLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </FullHeightLayout>
  )
}