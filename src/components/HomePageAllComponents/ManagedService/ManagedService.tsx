import Image from "next/image"
import Link from "next/link"

export default function ManagedService() {
  return (
    <div className="overflow-x-hidden">
      <section className="bg-gradient-to-r from-[#fcfdfd] to-[#cce5ed] py-6 md:py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 md:gap-10">
          {/* Column 1 - Managed IT Services */}
          <div className="lg:col-span-2 rounded-lg p-4 md:p-6 flex flex-col">
            <h2 className="z-30 text-3xl md:text-4xl lg:text-5xl font-bold text-yellow-500 leading-normal">
              MANAGED <span className="text-gray-800">IT</span> <br /> SERVICES
            </h2>
            <div className="z-30 w-full flex items-center justify-start ml-6 md:ml-8 lg:ml-10">
              <div className="w-16 md:w-24 h-1 bg-[#555be7]" />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex flex-row gap-3 md:gap-5 ">
                <div className="flex-shrink-0 z-10 -mt-[44px] md:-mt-[50px]">
                  <Image
                    src="/assets/service/serviceMan.jpeg"
                    alt="a person holding laptop"
                    width={400}
                    height={420}
                    className="w-[120px] sm:w-[160px] h-[297px] md:h-[435px] lg:h-[420px] object-cover"
                  />
                </div>
                <div className="w-full sm:w-[150px] -mt-7 md:mt-0">
                  <Image
                    src="/assets/service/tab_pen.png"
                    alt="a person holding laptop"
                    width={400}
                    height={600}
                    className="w-[100px] sm:w-[100px] h-[120px] sm:h-[150px] object-cover"
                  />
                  <div className="w-full flex items-start gap-[1px] md:gap-1">
                  <p className="text-xs">
                    Transform your IT operations into a powerhouse with our nationwide managed IT services. Imagine
                    expert support, remote management, and on-site solutions all working in harmony to keep your
                    business running effortlessly. Our
                  </p>
                  <Image className=" w-7 h-7 " src="/assets/service/serviceIcon9.png" alt="blulk" width={30} height={30}/>
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm">
                dedicated team ensures flawless performance and rapid issue resolution, covering everything from network agents to elite security measures. With DITW, you get scalable, secure, and cost-effective services that feel just like having your own in-house IT team. Ready to elevate your business? Let&apos;s make it happen!
              </p>
            </div>
          </div>

          {/* Column 2 - Why Choose Us */}
          <div className="lg:col-span-3 w-full h-full flex flex-col justify-center">
            <h2 className="text-xl font-medium leading-normal text-black mb-3 md:mb-4">WHY CHOOSE US?</h2>
            <p className="text-xs sm:text-sm font-normal leading-normal text-black">
              In today&apos;s fast-paced business world, choosing the right managed services provider is key to staying
              competitive. Our comprehensive solutions are tailored to your unique needs, offering proactive support,
              cost efficiency, scalability, and top-notch security. Let us handle your IT, so you can focus on growing
              your business. Ready to elevate your operations?
            </p>
            <div className="flex justify-end mb-4 md:mb-6 mt-3">
              <Link
                href="#"
                className="bg-[#1d0fbf] text-white px-4 sm:px-6 py-1 rounded-full text-sm font-medium transition-colors hover:bg-[#1a0da8]"
              >
                Get a Quote
              </Link>
            </div>

            <h2 className="text-base sm:text-lg font-medium text-black leading-normal">WHAT YOU GET WITH DITW</h2>
            <div className="w-full flex items-center justify-start">
              <div className="w-36 sm:w-48 h-1 bg-[#555be7] mt-1" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-5 xl:gap-7 mt-3 md:mt-4">
              {/* Benefits Grid */}
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <Image
                    src="/assets/service/serviceIcon1.png"
                    alt="service icon"
                    width={90}
                    height={60}
                    className="w-[50px] sm:w-[65px] h-[35px] sm:h-[45px]"
                  />
                </div>
                <p className="text-xs">No long-term contracts and no cancellation fees</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <Image
                    src="/assets/service/serviceIcon2.png"
                    alt="service icon"
                    width={90}
                    height={60}
                    className="w-[50px] sm:w-[65px] h-[35px] sm:h-[45px]"
                  />
                </div>
                <p className="text-xs">Solutions customized to fit your business</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <Image
                    src="/assets/service/serviceIcon3.png"
                    alt="service icon"
                    width={90}
                    height={60}
                    className="w-[50px] sm:w-[65px] h-[35px] sm:h-[45px]"
                  />
                </div>
                <p className="text-xs">Options to fit businesses of all sizes</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <Image
                    src="/assets/service/serviceIcon4.png"
                    alt="service icon"
                    width={90}
                    height={60}
                    className="w-[50px] sm:w-[65px] h-[35px] sm:h-[45px]"
                  />
                </div>
                <p className="text-xs">Support from IT Experts both centralized and local-based</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <Image
                    src="/assets/service/serviceIcon5.png"
                    alt="service icon"
                    width={90}
                    height={60}
                    className="w-[50px] sm:w-[65px] h-[35px] sm:h-[45px]"
                  />
                </div>
                <p className="text-xs">Predictable costs with flat rate pricing</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <Image
                    src="/assets/service/serviceIcon6.png"
                    alt="service icon"
                    width={90}
                    height={60}
                    className="w-[50px] sm:w-[65px] h-[35px] sm:h-[45px]"
                  />
                </div>
                <p className="text-xs">A dedicated support team just for your company</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <Image
                    src="/assets/service/serviceIcon7.png"
                    alt="service icon"
                    width={90}
                    height={60}
                    className="w-[50px] sm:w-[65px] h-[35px] sm:h-[45px]"
                  />
                </div>
                <p className="text-xs">Easy access 24/7/365 in 15 minutes or less</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <Image
                    src="/assets/service/serviceIcon8.png"
                    alt="service icon"
                    width={90}
                    height={60}
                    className="w-[50px] sm:w-[65px] h-[35px] sm:h-[45px]"
                  />
                </div>
                <p className="text-xs">Proactive IT Support that fixes issues before they happen</p>
              </div>
            </div>
          </div>

          {/* Column 3 - Logo and Phone */}
          <div className="lg:col-span-2">
            <div className="mb-4 w-full flex flex-col items-center">
              <Image
                src="/assets/service/ditw_logo.png"
                alt="ditw logo"
                width={250}
                height={120}
                className="pt-[10px] w-[250px] h-[120px] mx-auto"
              />
              <h2 className="text-base sm:text-lg text-center font-semibold my-2">INTEGRITY IN TECH</h2>
              <p className="w-full sm:w-2/3 text-xs text-[#8ba4df] mt-2 text-center">
                With our expert managed IT services, we guarantee your IT infrastructure is not only secure but also
                optimized for maximum efficiency and profitability.
              </p>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div className=" ">
                <Image src="/assets/service/hand__phone.png" alt="hand mobile" width={500} height={500} className="translate-z-12 w-[350px] h-[550px]" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
