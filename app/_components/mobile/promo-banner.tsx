import Image, { ImageProps } from "next/image";

const PromoBanner = (props: ImageProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      height={0}
      width={0}
      className="h-[250px] w-[582px] object-contain"
      sizes="100vw"
      {...props}
    />
  );
};

export default PromoBanner;
