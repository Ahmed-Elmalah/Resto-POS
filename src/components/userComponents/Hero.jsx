import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section className="relative w-full h-125 md:h-150 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBN8CARmE2ACohVCc29I3s96umr3TwcE5poZ0ljpz8fP0inMALD79BTsc5zxjGxhkgSNzxG4fE2b0QPWZTmn4Mix0p2ufpH2IBCce0dfUJ5NEWZkFu81N1GZA5Mmn70y6CZzNXII-pTEU5F3XgL5PDC7KnnWGsW0_FmqFK9f0783ryPbKRuJYqkjzr2yfS-KFVISEH5ShwY2yo-QACXfu7PyH0niVSVHqAy4ekwnKdI4m4UwFtnlvXq6bjCcwhEsnCst0u0CtDmmiyz')`,
        }}
      />
      <div
        className="relative z-10 container mx-auto px-4 text-center"
        data-aos="fade-right"
        data-aos-duration="1100"
      >
        <h1 className="text-white text-4xl md:text-6xl font-black leading-tight mb-4 drop-shadow-lg">
          Experience the Best Taste
        </h1>
        <p className="text-gray-200 text-base md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
          Authentic flavors, unforgettable moments. Join us for an evening of
          culinary excellence.
        </p>
        <button
          onClick={() => navigate("/reservations")}
          className="h-14 px-8 rounded-lg bg-primary hover:bg-red-600 text-white font-bold transition-all shadow-lg transform hover:-translate-y-0.5"
        >
          Book a Table
        </button>
      </div>
    </section>
  );
}
