import { PropsWithChildren } from "react";

export default function CustomHeading({ children }: PropsWithChildren) {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-semibold mb-6">{children}</h2>
    </div>
  );
}
