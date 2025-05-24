'use client'

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
        <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" className="animate-ping" />
      </div>
    </div>
  )
}

