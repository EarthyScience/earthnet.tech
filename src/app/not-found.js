import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="h-128 flex items-center justify-center">
      <div className="text-center max-w-lg px-4">
        <h1 className="text-2xl font-bold mb-3">404 - A Moment of Insight</h1>
        <p className="text-gray-600 mb-4 text-lg">
          Like science seeking truth before utility,
          we&apos;ve wandered into uncharted territory.
          Let insight guide us back to familiar ground.
        </p>
        <div>
          <Link href="/" className="underline">
          Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}