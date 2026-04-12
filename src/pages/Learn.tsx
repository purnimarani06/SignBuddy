import { useState } from "react";
import { GraduationCap, ChevronRight, Star, Lock, CheckCircle2 } from "lucide-react";

type Lesson = {
  id: number;
  title: string;
  category: string;
  signs: { word: string; emoji: string }[];
  completed: boolean;
  locked: boolean;
};

const CATEGORIES = ["Basics", "Greetings", "Hospital", "School", "Daily Life", "Workplace"];

const LESSONS: Lesson[] = [
  { id: 1, title: "Alphabets A-F", category: "Basics", signs: [
    { word: "A", emoji: "✊" }, { word: "B", emoji: "🤚" }, { word: "C", emoji: "🤏" },
    { word: "D", emoji: "☝️" }, { word: "E", emoji: "✊" }, { word: "F", emoji: "👌" },
  ], completed: true, locked: false },
  { id: 2, title: "Alphabets G-L", category: "Basics", signs: [
    { word: "G", emoji: "👈" }, { word: "H", emoji: "🤞" }, { word: "I", emoji: "🤙" },
  ], completed: false, locked: false },
  { id: 3, title: "Hello & Goodbye", category: "Greetings", signs: [
    { word: "Hello", emoji: "👋" }, { word: "Goodbye", emoji: "🤚" }, { word: "Good morning", emoji: "☀️" },
  ], completed: false, locked: false },
  { id: 4, title: "I need help", category: "Hospital", signs: [
    { word: "Pain", emoji: "😣" }, { word: "Doctor", emoji: "🩺" }, { word: "Medicine", emoji: "💊" },
  ], completed: false, locked: false },
  { id: 5, title: "Classroom phrases", category: "School", signs: [
    { word: "Teacher", emoji: "👩‍🏫" }, { word: "Book", emoji: "📖" }, { word: "Question", emoji: "❓" },
  ], completed: false, locked: true },
  { id: 6, title: "Shopping & Food", category: "Daily Life", signs: [
    { word: "Water", emoji: "💧" }, { word: "Food", emoji: "🍽️" }, { word: "Money", emoji: "💰" },
  ], completed: false, locked: true },
  { id: 7, title: "Office basics", category: "Workplace", signs: [
    { word: "Meeting", emoji: "🤝" }, { word: "Email", emoji: "📧" }, { word: "Schedule", emoji: "📅" },
  ], completed: false, locked: true },
];

export default function Learn() {
  const [selectedCategory, setSelectedCategory] = useState("Basics");
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);

  const filtered = LESSONS.filter((l) => l.category === selectedCategory);

  if (activeLesson) {
    if (quizMode) {
      const sign = activeLesson.signs[quizIdx];
      const options = [sign.word, ...activeLesson.signs.filter((s) => s.word !== sign.word).map((s) => s.word).slice(0, 2)].sort();
      return (
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
          <button onClick={() => { setQuizMode(false); setQuizIdx(0); setQuizAnswer(null); }} className="text-sm text-primary">← Back to lesson</button>
          <h2 className="font-heading font-bold text-xl text-foreground">Quiz: {activeLesson.title}</h2>
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <div className="text-7xl mb-4">{sign.emoji}</div>
            <p className="text-muted-foreground text-sm mb-4">What does this sign mean?</p>
            <div className="space-y-2">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setQuizAnswer(opt)}
                  disabled={!!quizAnswer}
                  className={`w-full py-3 rounded-xl border text-sm font-medium transition-colors ${
                    quizAnswer
                      ? opt === sign.word
                        ? "bg-success/10 border-success text-foreground"
                        : opt === quizAnswer
                        ? "bg-destructive/10 border-destructive text-foreground"
                        : "bg-muted border-border text-muted-foreground"
                      : "bg-card border-border text-foreground hover:border-primary"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {quizAnswer && (
              <button
                onClick={() => {
                  if (quizIdx < activeLesson.signs.length - 1) {
                    setQuizIdx(quizIdx + 1);
                    setQuizAnswer(null);
                  } else {
                    setQuizMode(false);
                    setQuizIdx(0);
                    setQuizAnswer(null);
                  }
                }}
                className="mt-4 px-6 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium"
              >
                {quizIdx < activeLesson.signs.length - 1 ? "Next →" : "Finish Quiz"}
              </button>
            )}
          </div>
          <p className="text-xs text-muted-foreground text-center">{quizIdx + 1} / {activeLesson.signs.length}</p>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <button onClick={() => setActiveLesson(null)} className="text-sm text-primary">← Back to lessons</button>
        <h2 className="font-heading font-bold text-xl text-foreground">{activeLesson.title}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {activeLesson.signs.map((s) => (
            <div key={s.word} className="bg-card border border-border rounded-xl p-4 text-center space-y-2">
              <div className="text-4xl">{s.emoji}</div>
              <div className="text-sm font-medium text-foreground">{s.word}</div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setQuizMode(true)}
          className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium text-sm"
        >
          Take Quiz →
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-heading font-bold text-foreground flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-primary" /> Learn Sign Language
        </h1>
        <p className="text-sm text-muted-foreground">Step-by-step lessons from beginner to advanced</p>
      </div>

      {/* Progress */}
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Your Progress</span>
          <span className="text-xs text-muted-foreground">1 / {LESSONS.length} completed</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${(1 / LESSONS.length) * 100}%` }} />
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
              selectedCategory === cat ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Lessons */}
      <div className="space-y-2">
        {filtered.map((lesson) => (
          <button
            key={lesson.id}
            onClick={() => !lesson.locked && setActiveLesson(lesson)}
            disabled={lesson.locked}
            className="w-full flex items-center gap-3 bg-card border border-border rounded-xl p-4 hover:border-primary/30 transition-colors disabled:opacity-50 text-left"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              lesson.completed ? "bg-success/10" : lesson.locked ? "bg-muted" : "bg-primary/10"
            }`}>
              {lesson.completed ? <CheckCircle2 className="w-5 h-5 text-success" /> :
               lesson.locked ? <Lock className="w-5 h-5 text-muted-foreground" /> :
               <Star className="w-5 h-5 text-primary" />}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">{lesson.title}</div>
              <div className="text-xs text-muted-foreground">{lesson.signs.length} signs</div>
            </div>
            {!lesson.locked && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          </button>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">No lessons in this category yet</p>
        )}
      </div>
    </div>
  );
}
