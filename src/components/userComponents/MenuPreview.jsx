
import MenuCard from "./MenuCard";
export default function MenuPreview() {
  const dishes = [
    {
      title: "Green Harvest Bowl",
      price: "18.00",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuChGUQi6P2IsC5K17Tq6Ou-vBC8RPJlUo0gXq1Q_FNN1L6JNiD2T0EWJDsP9G5k2CGBpeH9jExlu8nz66TivylSeU02GEiQvOCKMsho4sJDpd-m5irD6dDiK_P8-5uf3Vzwu0aA2xCv3DvFJvrB0bCXTHq7m4FjsUD9T4Ws5G4t9TUh6FUH8JiKs6NsToLuHzFXbCQTQ3JBhgUUKB7g9n2ZkI_wrqxgVg6he1G2c_E1VqIP22ioC2zrz4PxkkC3V2H-k2uHGnR0c2Co",
      desc: "A vibrant mix of organic quinoa, kale, sliced avocado, and chickpeas.",
    },
    {
      title: "Truffle Margherita",
      price: "24.00",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDxZuAmnoc73NkHVPV-4jCRN6SxCc3R9cnLUgZJ6U40YzUPjtEC8LF8qRSMF1LlhvdWcYkncvnuME-vqgKoRNur8-hQ7o_sE5bcsNzE7ygNjoT8BhAHR_OB-SxuolKyFs5Uy39ZuP8J5bJ0RYVPGsgmsznkcxQeqfMXwUAjv3QOBzFIBGAd66RncXNHphZwzthceemAaYSJ7fw4epEUFsaWNQ1dw991O2NJXs026INunqs1_ariDQ-IJyMTX2JYltR-EQBVDzE29Zou",
      desc: "Wood-fired crust topped with buffalo mozzarella, fresh basil, and truffle oil.",
    },
    {
      title: "Southern Fried Burger",
      price: "16.50",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2N9IwT_SdDREq1H77TVX93wTMCAf7Mfq1ZCrCLbchAKZLLsr9-5LC5DV5D-oLdXFuItCQEm88yGp2foxsLbGaSJgMHAKJr7_WhLWehgtggoHYD7f9HbISkH8_Hm3NUTnhY6dP0ZldisvefKncI8zxXLw6B6vaErG_nLPBuBuN_XDC8NIG9lrUXtMDkcuKCtE5TOcPoEodX5L-_EF0wMPpiWTY4rODYFlMB7sIKXNovGOi_GJB2Pi4_FiwsX0Lcwdt_1zLwX-SLITz",
      desc: "Buttermilk marinated chicken thigh, spicy slaw, and chipotle mayo.",
    },
  ];

  return (
    <section className="py-12 px-4 max-w-[1280px] mx-auto w-full mb-12">
      <div className="text-center mb-12">
        <span className="text-primary font-bold text-sm uppercase tracking-widest mb-2 block">
          Our Menu
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-text-main dark:text-white">
          Signature Dishes
        </h2>
        <p className="mt-4 text-text-muted dark:text-gray-400 max-w-2xl mx-auto text-sm">
          Hand-picked by our master chefs, these dishes represent the pinnacle
          of our culinary journey.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {dishes.map((dish, index) => (
          <MenuCard key={index} {...dish} />
        ))}
      </div>
      <div className="flex justify-center">
        <button className="h-12 px-8 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold transition-all">
          View Full Digital Menu
        </button>
      </div>
    </section>
  );
}
