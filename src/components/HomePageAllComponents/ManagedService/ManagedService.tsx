import Image from "next/image";
import Link from "next/link";

export default function ManagedService() {
  return (
    <div className="overflow-x-hidden">
      <section className="bg-gradient-to-r from-[#fcfdfd] to-[#cce5ed]">
        <div className="container grid grid-cols-1 md:grid-cols-7 gap-10">
          {/* Column 1 - Managed IT Services */}
          <div className="md:col-span-2 rounded-lg p-6 flex flex-col">
            <h2 className="text-3xl font-bold text-yellow-500 mb-4">
              MANAGED <span className="text-gray-800">IT</span> <br /> SERVICES
            </h2>
            <div className="flex-1 flex flex-col">
              <div className="relative h-48 mb-4">
                <Image
                  src="/assets/service/serviceMan.jpeg"
                  alt="service man"
                  width={150}
                  height={300}
                  className="w-[150px] h-[300px]"
                />
              </div>
              <div className="flex mb-4">
                <div className="mr-2">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt="Tablet"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex items-center">
                  <Image
                    src="/placeholder.svg?height=30&width=30"
                    alt="Light bulb"
                    width={30}
                    height={30}
                  />
                </div>
              </div>
              <p className="text-sm">
                Transform your IT operations into a powerhouse with our
                nationwide managed IT services. Imagine expert support, remote
                management, and on-site solutions all working in harmony to keep
                your business running effortlessly. Our dedicated team ensures
                flawless performance and rapid issue resolution, covering
                everything from network agents to elite security measures. With
                DITW, you get scalable, secure, and cost-effective services that
                feel just like having your own in-house IT team. Ready to
                elevate your business? Let&apos;s make it happen!
              </p>
            </div>
          </div>

          {/* Column 2 - Why Choose Us */}
          <div className="md:col-span-3 w-full h-full flex flex-col justify-center">
            <h2 className="text-xl font-medium leading-normal text-black mb-4">
              WHY CHOOSE US?
            </h2>
            <p className="text-sm font-normal leading-normal text-black">
              In today&apos;s fast-paced business world, choosing the right
              managed services provider is key to staying competitive. Our
              comprehensive solutions are tailored to your unique needs,
              offering proactive support, cost efficiency, scalability, and
              top-notch security. Let us handle your IT, so you can focus on
              growing your business. Ready to elevate your operations?
            </p>
            <div className="flex justify-end mb-6">
              <Link
                href="#"
                className="bg-[#1d0fbf] text-white px-6 py-1 rounded-full font-medium transition-colors"
              >
                Get a Quote
              </Link>
            </div>

            <h2 className="text-lg font-medium text-black leading-normal">
              WHAT YOU GET WITH DITW
            </h2>
            <div className="w-full flex items-center justify-start">
              <div className="w-48 h-1 bg-[#555be7] mt-1 " />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {/* Benefits Grid */}
              <div className="flex items-center gap-2">
                <div className="">
                  <Image
                    src="/assets/service/serviceIcon1.png"
                    alt="service icon"
                    width={90}
                    height={60}
                    className="w-[90px] h-[60px]"
                  />
                </div>
                <p className="text-xs">
                  No long-term contracts and no cancellation fees
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="">
                  <Image
                    src="/assets/service/serviceIcon2.png"
                    alt="service icon"
                    width={90}
                    height={60}
                    className="w-[90px] h-[60px]"
                  />
                </div>
                <p className="text-xs">
                  Solutions customized to fit your business
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="">
                  <Image
                    src="/assets/service/serviceIcon6.png"
                    alt="service icon"
                    width={90}
                    height={60}
                    className="w-[90px] h-[60px]"
                  />
                </div>
                <p className="text-xs">
                  Options to fit businesses of all sizes
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="">
                  <Image
                    src="/assets/service/serviceIcon4.png"
                    alt="service icon"
                    width={90}
                    height={60}
                    className="w-[90px] h-[60px]"
                  />
                </div>
                <p className="text-xs">
                  Support from IT Experts both centralized and local-based
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="">
                  <Image
                    src="/assets/service/serviceIcon5.png"
                    alt="service icon"
                    width={90}
                    height={60}
                    className="w-[90px] h-[60px]"
                  />
                </div>
                <p className="text-xs">
                  Predictable costs with flat rate pricing
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="">
                  <Image
                    src="/assets/service/serviceIcon6.png"
                    alt="service icon"
                    width={90}
                    height={60}
                    className="w-[90px] h-[60px]"
                  />
                </div>
                <p className="text-xs">
                  A dedicated support team just for your company
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="">
                  <Image
                    src="/assets/service/serviceIcon7.png"
                    alt="service icon"
                    width={90}
                    height={60}
                    className="w-[90px] h-[60px]"
                  />
                </div>
                <p className="text-xs">
                  Easy access 24/7/365 in 15 minutes or less
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="">
                  <Image
                    src="/assets/service/serviceIcon8.png"
                    alt="service icon"
                    width={90}
                    height={60}
                    className="w-[90px] h-[60px]"
                  />
                </div>
                <p className="text-xs">
                  Proactive IT Support that fixes issues before they happen
                </p>
              </div>
            </div>
          </div>

          {/* Column 3 - Logo and Phone */}
          <div className="md:col-span-2">
            <div className="mb-4 w-full flex flex-col items-center text-center">
              <Image
                src="/assets/logo.png"
                alt="logo"
                width={300}
                height={120}
                className="pt-[10px] w-[300px] h-[120px] mx-auto"
              />
              <p className="text-xs font-normal text-right text-black">
                Powered by NIPC
              </p>
              <h2 className="text-lg text-center font-semibold my-2">
                INTEGRITY IN TECH
              </h2>
              <p className="w-2/3 text-xs text-[#8ba4df] mt-2 text-center">
                With our expert managed IT services, we guarantee your IT
                infrastructure is not only secure but also optimized for maximum
                efficiency and profitability.
              </p>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-48 h-80">
                <Image
                  src="/assets/service/hand_mobile.jpeg"
                  alt="hand mobile"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mt-4 text-center text-xs">
              <p>Adobe Express</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
