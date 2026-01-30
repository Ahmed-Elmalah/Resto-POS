 import { MdVerified, MdRestaurantMenu, MdGroups } from "react-icons/md";
import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    // id="about" مهم جداً عشان السكرول يشتغل
    <section
      id="about"
      className="py-20 bg-white dark:bg-background-dark overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-3 transition-transform group-hover:rotate-6 duration-500"></div>
            <img
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Our Restaurant Interior"
              className="relative rounded-3xl shadow-2xl w-full object-cover h-100 lg:h-125 transform transition-transform group-hover:-translate-y-2 duration-500"
            />

            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full text-yellow-600 dark:text-yellow-400">
                  <MdVerified size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Since
                  </p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    1998
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Text Side */}
          <div className="w-full lg:w-1/2">
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
              Our Story
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              We Don't Just Cook, <br /> We Create{" "}
              <span className="text-primary">Emotions</span>.
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
              At Resto, we believe that dining is not just about food; it's
              about the experience. Our chefs use only the freshest,
              locally-sourced ingredients to craft dishes that tell a story of
              tradition and innovation.
            </p>

            {/* Stats / Features Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-primary">
                  <MdRestaurantMenu size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    Fresh Food
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    100% Organic ingredients
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 text-primary">
                  <MdGroups size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    Expert Chefs
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Masters of culinary arts
                  </p>
                </div>
              </div>
            </div>

            <Link
              to={"/menu"}
              className="bg-primary hover:bg-red-600 text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all transform hover:-translate-y-1"
            >
              Discover Our Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
