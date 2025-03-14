"use client";

//import { Button } from "@/components/ui/button";
//import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";
// Assuming you're using next-themes
//import { Lightbulb, Rocket, ShieldCheck } from "lucide-react";

//import Navbar from "./components/nav-bar";

export default function Home() {
  return (
    <div className="">
      {/* <Navbar /> */}
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}

function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4 mt-20 md:mt-36">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Unlock Your Potential with Our Innovative Solutions
      </h1>
      <p className="text-lg text-gray-600 mb-8 mx-0 md:mx-44">
        We provide cutting-edge technology and expert guidance to help you
        overcome challenges and achieve remarkable success. Our team is
        dedicated to delivering exceptional results and empowering you to reach
        your full potential. Join us on a journey of growth and transformation.
      </p>
      {/* <Button className="h-12">Explore Our Services</Button> */}
    </div>
  );
}

const FeaturesSection = () => {
  const { theme } = useTheme();
  const bgColor = theme === "dark" ? "bg-transparent" : "bg-gray-50";

  // const featureData = [
  //   {
  //     icon: <Lightbulb className="w-8 h-8 text-gray-600" />,
  //     title: "Innovative Solutions",
  //     description:
  //       "Access cutting-edge technology designed to drive growth and efficiency.",
  //   },
  //   {
  //     icon: <Rocket className="w-8 h-8 text-gray-600" />,
  //     title: "Accelerated Growth",
  //     description:
  //       "Achieve remarkable success with our proven strategies and expert guidance.",
  //   },
  //   {
  //     icon: <ShieldCheck className="w-8 h-8 text-gray-600" />,
  //     title: "Trusted Partnership",
  //     description:
  //       "Rely on our dedicated team to provide exceptional support and reliable solutions.",
  //   },
  // ];

  // const FeatureCard = ({
  //   icon,
  //   title,
  //   description,
  // }: {
  //   icon: ReactNode;
  //   title: string;
  //   description: string;
  // }) => {
  //   return (
  //     <Card className={`bg-transparent shadow-none border-none`}>
  //       <CardContent className="flex flex-col items-center p-6">
  //         <Card className="rounded-lg p-4 mb-4 border-none">{icon}</Card>
  //         <h2 className="text-xl font-semibold mb-2">{title}</h2>
  //         <p className="text-gray-600 mb-4">{description}</p>
  //         <Button variant="link" className="text-sm">
  //           Learn more
  //         </Button>
  //       </CardContent>
  //     </Card>
  //   );
  // };

  return (
    <div className={`${bgColor} py-16`}>
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl font-semibold mb-4">
          Empowering Your Journey to Success
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          We provide the tools, technology, and support you need to unlock your
          potential, overcome challenges, and achieve your goals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* {featureData.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};
