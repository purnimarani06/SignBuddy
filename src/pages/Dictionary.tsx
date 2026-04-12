import { useState } from "react";
import { BookOpen, Search } from "lucide-react";

const DICTIONARY = [
  { word: "Hello", emoji: "👋", category: "Greetings" },
  { word: "Goodbye", emoji: "🤚", category: "Greetings" },
  { word: "Thank you", emoji: "🙏", category: "Greetings" },
  { word: "Please", emoji: "🤲", category: "Greetings" },
  { word: "Sorry", emoji: "✊", category: "Greetings" },
  { word: "Yes", emoji: "👍", category: "Basics" },
  { word: "No", emoji: "👎", category: "Basics" },
  { word: "Help", emoji: "🆘", category: "Emergency" },
  { word: "Water", emoji: "💧", category: "Daily" },
  { word: "Food", emoji: "🍽️", category: "Daily" },
  { word: "Doctor", emoji: "🩺", category: "Hospital" },
  { word: "Pain", emoji: "😣", category: "Hospital" },
  { word: "Medicine", emoji: "💊", category: "Hospital" },
  { word: "Family", emoji: "👨‍👩‍👧", category: "Daily" },
  { word: "Friend", emoji: "🤝", category: "Daily" },
  { word: "Love", emoji: "🤟", category: "Emotions" },
  { word: "Happy", emoji: "😊", category: "Emotions" },
  { word: "Sad", emoji: "😢", category: "Emotions" },
  { word: "Angry", emoji: "😠", category: "Emotions" },
  { word: "Scared", emoji: "😨", category: "Emotions" },
  { word: "School", emoji: "🏫", category: "Education" },
  { word: "Teacher", emoji: "👩‍🏫", category: "Education" },
  { word: "Book", emoji: "📖", category: "Education" },
  { word: "Money", emoji: "💰", category: "Daily" },
  { word: "Home", emoji: "🏠", category: "Daily" },
];

const CATEGORIES = ["All", ...Array.from(new Set(DICTIONARY.map((d) => d.category)))];

export default function Dictionary() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = DICTIONARY.filter((d) => {
    const matchSearch = d.word.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || d.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-accent" /> Gesture Dictionary
        </h1>
        <p className="text-sm text-muted-foreground">Search and learn any sign gesture</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search signs..."
          className="w-full h-10 rounded-xl border border-input bg-background pl-10 pr-4 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              category === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Results */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {filtered.map((d) => (
          <div key={d.word} className="bg-card border border-border rounded-xl p-3 text-center hover:border-primary/30 transition-colors cursor-pointer">
            <div className="text-3xl mb-1">{d.emoji}</div>
            <div className="text-xs font-medium text-foreground">{d.word}</div>
            <div className="text-[10px] text-muted-foreground">{d.category}</div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">No signs found for "{search}"</p>
      )}
    </div>
  );
}
