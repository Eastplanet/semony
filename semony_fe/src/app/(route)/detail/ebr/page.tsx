'use client'
import Image from 'next/image';
const DetailPage: React.FC = () => {

  return (
      <div className="rounded-3xl shadow-lg w-[100%] flex items-center justify-center overflow-hidden h-[80vh]">
        <Image
          src="/mocks/ebr/EBR_RESULT.BMP"
          alt="ebr"
          width={2000}
          height={1000}
          className="object-center"
        />
      </div>
  );
};

export default DetailPage;
