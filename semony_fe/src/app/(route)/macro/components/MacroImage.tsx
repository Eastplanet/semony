// src/app/ui/components/MacroImage.tsx

import React from 'react';
import Image from 'next/image';

interface MacroImageProps {
  src: string;
  alt?: string;
}

const MacroImage: React.FC<MacroImageProps> = ({ src, alt = "Macro BMP Example" }) => {
  return (
    <div className="rounded-3xl shadow-lg w-64 h-64 overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={100}
        height={100}
        className="object-center w-full h-full"
      />
    </div>
  );
};

export default MacroImage;
