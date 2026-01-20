import { ReactNode } from "react";

interface CustomHeadingProps {
  children: ReactNode;
}

export default function CustomHeading({ children }: CustomHeadingProps) {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-semibold mb-10">{children}</h2>
    </div>
  );
}
