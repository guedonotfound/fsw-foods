import Image from "next/image";
import Search from "./search";

const MainBanner = () => {
  return (
    <div className="h-[500px] w-full bg-primary pt-[126px]">
      <div className="flex w-full justify-center gap-[5.07%]">
        <div className="space-y-8">
          <div className="text-white">
            <h1 className="text-5xl font-bold">Está com fome?</h1>
            <h3 className="text-lg">
              Com apenas alguns cliques, encontre refeições acessíveis perto de
              você!
            </h3>
          </div>
          <div className="rounded-lg bg-white p-5">
            <Search />
          </div>
        </div>

        <div className="relative mt-10 max-h-[371.03px] min-h-[371.03px] min-w-[371.03px] max-w-[371.03px]">
          <Image
            src="/home-page-banner.png"
            alt="Home Page Banner"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
