import Image from "next/image"

const OurServices = () => {
  const serviceData1 = [
    {
      id: 1,
      image: "/assets/service/service1.jpeg",
      title: "Large-Scale Project Planning & Execution",
      desc: "Managing complex low voltage installations for diverse projects",
    },
    {
      id: 2,
      image: "/assets/service/service2.jpeg",
      title: "Nationwide Project Coordination",
      desc: "Ensuring seamless communication and execution across multiple locations.",
    },
    {
      id: 3,
      image: "/assets/service/service3.jpeg",
      title: "Remote Project Management",
      desc: "Providing dedicated support and expertise throughout the project lifecycle.",
    },
  ]

  const serviceData2 = [
    {
      id: 1,
      image: "/assets/service/service4.jpeg",
      title: "Value Engineering & Design",
      desc: "Optimizing low voltage designs for cost-effectiveness and performance.",
    },
    {
      id: 2,
      image: "/assets/service/service5.jpeg",
      title: "Nationwide Procurement & Logistics",
      desc: "Efficiently sourcing and delivering materials to any location.",
    },
    {
      id: 3,
      image: "/assets/service/service6.jpeg",
      title: "Standardized Installation & Testing",
      desc: "Guaranteeing consistent quality and performance across all projects.",
    },
    {
      id: 4,
      image: "/assets/service/service7.jpeg",
      title: "As-Built Documentation & Support",
      desc: "Providing comprehensive documentation and ongoing support.",
    },
  ]

  return (
    <div id="services" className="relative overflow-hidden">
      <div
        style={{ backgroundImage: `url('/assets/service/ourService_bg.jpeg')` }}
        className="relative bg-black bg-cover bg-center bg-no-repeat w-full min-h-screen px-4 sm:px-6 lg:px-8 py-10 md:py-16"
      >
        <div className="container mx-auto max-w-7xl">
          {/* Header Section */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-yellow-400">OUR</span> <span className="text-white">NATIONWIDE</span>
              <br />
              <span className="text-yellow-400">SERVICES</span>
            </h2>

            <div className="w-full flex items-center justify-start">
              <div className="w-32 sm:w-40 md:w-60 h-1 bg-blue-600 mt-2" />
            </div>

            <p className="text-lg sm:text-xl text-white font-bold mt-4">Loyalty - Integrity - Commitment</p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">
              <div className="sm:max-w-xl">
                <p className="text-sm sm:text-base text-white">
                  We are committed to building long-term partnerships with general contractors and business owners,
                  providing the expertise and resources needed to complete projects on time and within budget.
                </p>
                <p className="text-base sm:text-lg text-white mt-4">Our nationwide services include:</p>
              </div>
              <button className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-2 px-6 rounded-full w-fit">
                Get a Quote
              </button>
            </div>
          </div>

          {/* Services Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Project Management Section */}
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">PROJECT MANAGEMENT</h4>
              <div className="w-full flex items-center justify-start mb-4 sm:mb-6">
                <div className="w-28 sm:w-36 md:w-52 h-1 bg-blue-600" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-3 md:gap-4">
                {serviceData1?.map((data) => (
                  <div key={data.id} className="flex flex-col">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                      <Image src={data?.image || "/placeholder.svg"} alt={data.title} fill className="object-cover" />
                    </div>
                    <h5 className="text-sm sm:text-base font-bold text-white mt-2 sm:mt-3">{data?.title}</h5>
                    <p className="text-xs sm:text-sm text-white mt-1">{data?.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* End-to-End Delivery Section */}
            <div>
              <h4 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">END-TO-END DELIVERY</h4>
              <div className="w-full flex items-center justify-start mb-4 sm:mb-6">
                <div className="w-28 sm:w-36 md:w-52 h-1 bg-blue-600" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-3 md:gap-4">
                {serviceData2?.map((data) => (
                  <div key={data.id} className="flex flex-col">
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                      <Image src={data?.image || "/placeholder.svg"} alt={data.title} fill className="object-cover" />
                    </div>
                    <h5 className="text-sm sm:text-base font-bold text-white mt-2 sm:mt-3">{data?.title}</h5>
                    <p className="text-xs sm:text-sm text-white mt-1">{data?.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Managed IT Support */}
          <div className="mt-10 sm:mt-12 flex flex-col items-center sm:items-start">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <h4 className="text-xl sm:text-2xl font-bold text-yellow-400 text-center sm:text-left">
                MANAGED IT SUPPORT SERVICES
              </h4>
              <div className="relative w-24 h-6 sm:w-28 md:w-32 md:h-8">
                <Image src="/assets/arrow_icon.png" alt="arrow icon" fill className="object-contain" />
              </div>
            </div>
            <div className="w-full flex items-center justify-center sm:justify-start">
              <div className="w-40 sm:w-60 h-1 bg-blue-600 mt-2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurServices
