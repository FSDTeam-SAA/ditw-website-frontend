import { Phone } from "lucide-react"
import Image from "next/image"
import { PiMapPinLine } from "react-icons/pi"
import { TfiEmail } from "react-icons/tfi"
import ContactForm from "./ContactForm"
import ReviewCart from "./ReviewCart"

const ContactUs = () => {
  

  return (
    <div id="contact_us">
      {/* Header Section */}
      <div className="bg-black">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 pb-5">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-left pt-8 sm:pt-[45px]">
            <span className="text-yellow-400 z-40">CONTACT </span>
            US
          </h2>

          <div className="w-full flex items-center justify-start">
            <div className="w-32 sm:w-60 h-1 bg-[#555be7] mt-2 ml-4 sm:ml-14" />
          </div>

          <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mt-4">
            <p className="text-sm sm:text-base font-normal leading-normal text-white text-left">
              Trusted by America&apos;s Leading Builders and Businesses
            </p>
            <button className="text-sm sm:text-base font-semibold text-white leading-normal bg-[#1d0fbf] hover:bg-[#2a1cc7] py-1 px-4 rounded-full">
              Get a Quote
            </button>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-gradient-to-r from-[#c8c8c8] to-[#8badba]">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
            <div className="md:col-span-1 w-full flex flex-col justify-center items-center md:items-start">
              <h4 className="text-xl sm:text-2xl font-bold text-black text-center md:text-left leading-normal">
                WE MAKE HAPPY CUSTOMERS
              </h4>
              <div className="w-full flex items-center justify-center md:justify-start mt-2">
                <Image
                  src="/assets/contactUs/contact_right_icon.png"
                  alt="arrow icon"
                  width={100}
                  height={15}
                  className="w-24 sm:w-auto"
                />
              </div>
            </div>

            <div className="md:col-span-3">
            <ReviewCart/>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-black pb-8">
          <div className="container mx-auto px-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
              {/* Contact Form */}
              <div className="lg:col-span-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-normal pt-6 sm:pt-[18px] pb-2">
                  DROP US A LINE
                </h2>
                <div className="w-full flex items-center justify-start">
                  <div className="w-32 sm:w-48 h-1 bg-[#3847af] ml-3" />
                </div>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base font-medium text-gray-300 pt-3">
                  Our team is ready to help! Give us a call or email us anytime - we&#39;re happy to answer any
                  questions you have. No pressure, no obligations.
                </p>
                <ContactForm />
              </div>

              {/* Contact Information */}
              <div className="lg:col-span-2">
                <div>
                  <div className="mb-8 sm:mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white pt-4 sm:pt-[18px] pb-2">OUR ADDRESS</h2>
                    <div className="w-full flex items-center justify-start">
                      <div className="w-24 sm:w-36 h-1 bg-[#3847af] ml-6 sm:ml-9" />
                    </div>
                    <div className="flex items-start mt-4 sm:mt-[18px]">
                      <PiMapPinLine className="w-6 h-6 sm:w-8 sm:h-8 text-white mr-3 sm:mr-4 flex-shrink-0 mt-1" />
                      <p className="text-white font-medium leading-normal text-base sm:text-lg">
                        3948 LEGACY DRIVE | STE 106
                        <br />
                        PLANO, TEXAS 75023
                      </p>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white pb-2">OUR CONTACT</h2>
                    <div className="w-full flex items-center justify-start">
                      <div className="w-16 sm:w-20 h-1 bg-[#3847af] ml-12 sm:ml-16" />
                    </div>
                    <div className="flex items-center mt-4 sm:mt-6">
                      <TfiEmail className="w-6 h-6 sm:w-8 sm:h-8 text-white mr-3 sm:mr-4 flex-shrink-0" />
                      <p className="text-white font-medium leading-normal text-sm sm:text-base md:text-lg break-all sm:break-normal">
                        CONTACT@DYSONITWORKS.COM
                      </p>
                    </div>
                    <div className="flex items-center mt-4 sm:mt-6">
                      <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-white mr-3 sm:mr-4 flex-shrink-0" />
                      <p className="text-white font-medium leading-normal text-sm sm:text-base md:text-lg">
                        888-348-9552
                      </p>
                    </div>
                    <p className="text-xs font-medium leading-normal text-white pt-5">
                      Copyright © 2025 Dyson IT Works. America&lsquo;s Low Voltage Company. All Rights Reserved.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
