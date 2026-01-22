import Header from "../../components/userComponents/Header";
import CategoryTabs from "../../components/userComponents/CategoryTabs";

export default function MenuHeaderSection() {
  return (
    <header className="flex flex-col gap-4 p-4 md:p-6 pb-2 bg-background-soft/90 dark:bg-background-dark/95 backdrop-blur-md z-30 sticky top-0 transition-colors">
      <Header />
      <CategoryTabs />
    </header>
  );
}