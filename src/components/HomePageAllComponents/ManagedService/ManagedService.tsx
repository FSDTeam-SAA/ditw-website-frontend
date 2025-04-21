import {
  CoreValue,
  PoweredByMRPC,
  ServiceItem,
  WhyChooseUsItem,
} from "@/components/types/allFrontendDataType";
import Image from "next/image";
import Link from "next/link";

type ManagedServiceProps = {
  data: CoreValue;
  whyChooseUsData: WhyChooseUsItem;
  serviceFeaturesData: ServiceItem;
  poweredByMrpcData: PoweredByMRPC;
};

const ManagedService: React.FC<ManagedServiceProps> = ({
  data,
  whyChooseUsData,
  serviceFeaturesData,
  poweredByMrpcData,
}) => {
  console.log(poweredByMrpcData);
  return (
    <div className="overflow-x-hidden">
      <section className="bg-gradient-to-r from-[#fcfdfd] to-[#cce5ed] py-6 md:py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 md:gap-10">
          {/* Column 1 - Managed IT Services */}
          <div className="lg:col-span-2 rounded-lg p-4 md:p-6 flex flex-col">
            <h2
              className="z-30 text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-500 leading-normal"
              dangerouslySetInnerHTML={{ __html: data?.title || "" }}
            />
            <div className="z-30 w-full flex items-center justify-start ml-6 md:ml-8 lg:ml-10">
              <div className="w-16 md:w-24 h-1 bg-[#555be7]" />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex flex-row gap-3 md:gap-5 ">
                <div className="flex-shrink-0 z-10 -mt-[44px] md:-mt-[50px]">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/OurCoreValue/${data?.img}`}
                    alt="a person holding laptop"
                    width={400}
                    height={420}
                    className="w-[120px] sm:w-[160px] h-[297px] md:h-[435px] lg:h-[420px] object-cover"
                  />
                </div>
                <div className="w-full sm:w-[150px] -mt-7 md:mt-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/OurCoreValue/${data?.icon1}`}
                    alt="a person holding laptop"
                    width={400}
                    height={600}
                    className="w-[100px] sm:w-[100px] h-[120px] sm:h-[150px] object-cover"
                  />
                  <div className="w-full flex items-start gap-[1px] md:gap-1">
                    <p className="text-xs">{data?.description1}</p>
                    <Image
                      className="w-7 h-7"
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/OurCoreValue/${data?.icon2}`}
                      alt="blulk"
                      width={30}
                      height={30}
                    />
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm">{data?.description2}</p>
            </div>
          </div>

          {/* Column 2 - Why Choose Us */}
          <div className="lg:col-span-3 w-full h-full flex flex-col justify-center">
            <h2 className="text-xl font-medium leading-normal text-black mb-3 md:mb-4">
              {whyChooseUsData?.title}
            </h2>
            <p className="text-xs sm:text-sm font-normal leading-normal text-black">
              {whyChooseUsData?.description}
            </p>
            <div className="flex justify-end mb-4 md:mb-6 mt-3">
              <Link
                href={whyChooseUsData?.button_url || "#"}
                className="bg-[#1d0fbf] text-white px-4 sm:px-6 py-1 rounded-full text-sm font-medium transition-colors hover:bg-[#1a0da8]"
              >
                {whyChooseUsData?.button_name}
              </Link>
            </div>

            <h2 className="text-base sm:text-lg font-medium text-black leading-normal">
              {serviceFeaturesData?.heading}
            </h2>
            <div className="w-full flex items-center justify-start">
              <div className="w-36 sm:w-48 h-1 bg-[#555be7] mt-1" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-5 xl:gap-7 mt-3 md:mt-4">
              {/* first data  */}
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Services/icons/${serviceFeaturesData?.icon}`}
                    alt="service icon"
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px]"
                  />
                </div>
                <p className="text-xs">{serviceFeaturesData?.title}</p>
              </div>
              {/* first data  */}
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Services/icons/${serviceFeaturesData?.icon1}`}
                    alt="service icon"
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px]"
                  />
                </div>
                <p className="text-xs">{serviceFeaturesData?.title1}</p>
              </div>
              {/* two data  */}
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Services/icons/${serviceFeaturesData?.icon2}`}
                    alt="service icon"
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px]"
                  />
                </div>
                <p className="text-xs">{serviceFeaturesData?.title2}</p>
              </div>
              {/* three data  */}
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Services/icons/${serviceFeaturesData?.icon3}`}
                    alt="service icon"
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px]"
                  />
                </div>
                <p className="text-xs">{serviceFeaturesData?.title3}</p>
              </div>
              {/* five data  */}
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Services/icons/${serviceFeaturesData?.icon4}`}
                    alt="service icon"
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px]"
                  />
                </div>
                <p className="text-xs">{serviceFeaturesData?.title4}</p>
              </div>
              {/* six data  */}
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Services/icons/${serviceFeaturesData?.icon5}`}
                    alt="service icon"
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px]"
                  />
                </div>
                <p className="text-xs">{serviceFeaturesData?.title5}</p>
              </div>
              {/* seven data  */}
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Services/icons/${serviceFeaturesData?.icon6}`}
                    alt="service icon"
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px]"
                  />
                </div>
                <p className="text-xs">{serviceFeaturesData?.title6}</p>
              </div>
              {/* eight data  */}
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/Services/icons/${serviceFeaturesData?.icon7}`}
                    alt="service icon"
                    width={40}
                    height={40}
                    className="w-[40px] h-[40px]"
                  />
                </div>
                <p className="text-xs">{serviceFeaturesData?.title7}</p>
              </div>
            </div>
          </div>

          {/* Column 3 - Logo and Phone */}
          <div className="lg:col-span-2">
            <div className="mb-4 w-full flex flex-col items-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/mrpc/${poweredByMrpcData?.logo}`}
                alt="ditw logo"
                width={250}
                height={120}
                className="pt-[10px] w-[250px] h-[120px] mx-auto"
              />
              <h2 className="text-base sm:text-lg text-center font-semibold my-2">
                {poweredByMrpcData?.title}
              </h2>
              <p className="w-full sm:w-2/3 text-xs text-[#8ba4df] mt-2 text-center">
                {poweredByMrpcData?.description}
              </p>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/mrpc/${poweredByMrpcData?.img}`}
                alt="hand mobile"
                width={500}
                height={500}
                className="translate-z-12 w-[350px] h-[550px]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManagedService;
