import { CarMagnetOrderBuilder } from '../features/car-magnets/CarMagnetOrderBuilder';

export function CarMagnetOrderPage() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-charcoal-50/20 bg-charcoal-400/50 px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-heading text-2xl font-bold tracking-wide text-white md:text-3xl">
            Car Magnets Order Builder
          </h1>
          <p className="mt-2 text-gray-400">
            Magnetic signs for vehicles — starting at $85. Fast turnaround available.
          </p>
        </div>
      </div>
      <CarMagnetOrderBuilder />
    </div>
  );
}
