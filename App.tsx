import { Navbar } from "./components/Navbar";
import { HeroPanel } from "./components/HeroPanel";
import { SummaryCards } from "./components/SummaryCards";
import { EntriesTable } from "./components/EntriesTable";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Hero Panel */}
        <HeroPanel />
        
        {/* Summary Cards */}
        <SummaryCards />
        
        {/* Entries Table */}
        <EntriesTable />
      </main>
    </div>
  );
}