"use client";

interface PlantProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Plant({ className, size = "md" }: PlantProps) {
  const sizes = {
    sm: { pot: "w-4 h-5", leaf: "w-6 h-6" },
    md: { pot: "w-5 h-6", leaf: "w-8 h-8" },
    lg: { pot: "w-6 h-7", leaf: "w-10 h-10" },
  };
  const s = sizes[size];

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* Leaves */}
      <div className="relative">
        <div className={`${s.leaf} bg-green-500 rounded-full border border-green-700 relative`}>
          <div className="absolute top-1 left-1 w-2 h-2 bg-green-400 rounded-full opacity-60" />
        </div>
        <div className="absolute -top-1 -left-1 w-3 h-4 bg-green-600 rounded-full rotate-[-20deg] border border-green-800" />
        <div className="absolute -top-1 -right-1 w-3 h-4 bg-green-600 rounded-full rotate-[20deg] border border-green-800" />
      </div>
      {/* Pot */}
      <div className={`${s.pot} bg-amber-800 rounded-b-md rounded-t-sm -mt-1 border border-amber-900`} />
    </div>
  );
}
