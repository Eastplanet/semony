// src/app/ui/components/MacroImage.tsx

import React from 'react';
import Image from 'next/image';

interface MacroImageProps {
  src: string;
  alt?: string;
}

const MacroImage: React.FC<MacroImageProps> = ({ src, alt = "Macro BMP Example" }) => {
  return (
    <div className="rounded-3xl shadow-lg w-[80%] h-[80%] overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={10000}
        height={1000}
        className="object-center w-full h-full"
      />
    </div>
  );
};

export default MacroImage;
