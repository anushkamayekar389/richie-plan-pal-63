
import { TrendingUp, Users, FileText, Clock } from "lucide-react";

export const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      number: "500+",
      label: "CFPs Trust Richie",
      color: "text-blue-600"
    },
    {
      icon: Clock,
      number: "5 min",
      label: "Average Plan Time",
      color: "text-green-600"
    },
    {
      icon: FileText,
      number: "10,000+",
      label: "Plans Generated",
      color: "text-purple-600"
    },
    {
      icon: TrendingUp,
      number: "98%",
      label: "Client Satisfaction",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Financial Advisors Across India
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From Mumbai to Bangalore, CFPs are transforming their practice with Richie
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gray-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
