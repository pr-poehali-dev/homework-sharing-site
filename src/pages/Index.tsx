import { useState } from "react";
import Icon from "@/components/ui/icon";

const SUBJECTS = [
  { id: "math", name: "Математика", emoji: "📐", color: "from-purple-500 to-pink-500" },
  { id: "russian", name: "Русский язык", emoji: "📝", color: "from-blue-500 to-cyan-500" },
];

const GRADES = ["5А"];

const HOMEWORKS = [
  { id: 1, subject: "math", grade: "5А", title: "ДЗ", topic: "Математика", pages: 1, price: 200, hot: false, rating: 5.0, reviews: 0 },
  { id: 2, subject: "russian", grade: "5А", title: "ДЗ", topic: "Русский язык", pages: 1, price: 200, hot: false, rating: 5.0, reviews: 0 },
];

const SUBJECT_MAP = Object.fromEntries(SUBJECTS.map(s => [s.id, s]));

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"home" | "catalog">("home");

  const filtered = HOMEWORKS.filter(hw => {
    const subjectName = SUBJECT_MAP[hw.subject]?.name?.toLowerCase() || "";
    const matchSearch = !searchQuery ||
      hw.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hw.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subjectName.includes(searchQuery.toLowerCase());
    const matchGrade = !selectedGrade || hw.grade === selectedGrade;
    const matchSubject = !selectedSubject || hw.subject === selectedSubject;
    return matchSearch && matchGrade && matchSubject;
  });

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setActiveSection("catalog");
  };

  return (
    <div className="min-h-screen mesh-bg">
      {/* NAV */}
      <nav className="sticky top-0 z-50 glass border-b border-white/5">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm font-display">ДЗ</div>
            <span className="font-display font-bold text-lg tracking-wide text-white">ДОМАШКА<span className="gradient-text">.PRO</span></span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveSection("home")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === "home" ? "bg-white/10 text-white" : "text-white/60 hover:text-white"}`}
            >
              Главная
            </button>
            <button
              onClick={() => setActiveSection("catalog")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeSection === "catalog" ? "bg-white/10 text-white" : "text-white/60 hover:text-white"}`}
            >
              Каталог
            </button>
          </div>
          <button className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-all glow-purple">
            Войти
          </button>
        </div>
      </nav>

      {activeSection === "home" ? (
        <>
          {/* HERO */}
          <section className="relative overflow-hidden py-16 md:py-24">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="animate-slide-up">
                  <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
                    <span className="text-yellow-400 text-sm">⚡</span>
                    <span className="text-white/70 text-sm font-medium">Более 5 000 готовых ДЗ</span>
                  </div>
                  <h1 className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
                    ДОМАШКУ<br />
                    <span className="gradient-text">СДАШЬ</span><br />
                    <span className="gradient-text-hot">ВОВРЕМЯ</span>
                  </h1>
                  <p className="text-white/60 text-lg mb-8 max-w-md">
                    Каталог готовых домашних заданий по всем предметам. Найди нужное за 30 секунд — всего за 200 ₽.
                  </p>

                  {/* SEARCH */}
                  <div className="relative max-w-xl">
                    <div className="flex items-center glass rounded-2xl p-2 neon-border gap-2">
                      <Icon name="Search" className="text-white/40 ml-2 shrink-0" size={20} />
                      <input
                        type="text"
                        placeholder="Алгебра 8 класс, сочинение, физика..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        onKeyDown={e => e.key === "Enter" && handleSearch(searchQuery)}
                        className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-sm py-1"
                      />
                      <button
                        onClick={() => handleSearch(searchQuery)}
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-all shrink-0"
                      >
                        Найти
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["Математика 9", "Сочинение ЕГЭ", "Физика задачи", "Химия 8"].map(tag => (
                        <button
                          key={tag}
                          onClick={() => handleSearch(tag)}
                          className="tag-pill hover:bg-purple-500/30 transition-all cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="hidden lg:flex justify-center animate-float">
                  <div className="relative">
                    <div className="w-80 h-80 rounded-3xl overflow-hidden neon-border animate-pulse-glow">
                      <img
                        src="https://cdn.poehali.dev/projects/df56fada-bf18-41f6-88f2-45e0873f2ce7/files/91c7c685-70c0-4818-b6a8-b441935c5afd.jpg"
                        alt="Студент с учебниками"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-3 neon-border-cyan animate-fade-in">
                      <div className="text-cyan-400 font-bold text-2xl font-display">5000+</div>
                      <div className="text-white/60 text-xs">готовых ДЗ</div>
                    </div>
                    <div className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 neon-border animate-fade-in">
                      <div className="flex items-center gap-1 text-yellow-400 font-bold text-lg font-display">⭐ 4.9</div>
                      <div className="text-white/60 text-xs">средняя оценка</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* STATS */}
          <section className="py-8 border-y border-white/5">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Предметов", value: "2" },
                  { label: "Класс", value: "5А" },
                  { label: "Цена за ДЗ", value: "200 ₽" },
                ].map((stat) => (
                  <div key={stat.label} className="glass rounded-2xl p-4 text-center neon-border">
                    <div className="text-2xl font-display font-bold gradient-text mb-1">{stat.value}</div>
                    <div className="text-white/50 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SUBJECTS */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-3xl font-bold text-white">
                  ПРЕДМЕТЫ
                  <span className="gradient-text ml-2">ДЗ</span>
                </h2>
                <button
                  onClick={() => setActiveSection("catalog")}
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1 transition-colors"
                >
                  Все предметы
                  <Icon name="ArrowRight" size={16} />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {SUBJECTS.map((subj) => (
                  <button
                    key={subj.id}
                    onClick={() => { setSelectedSubject(subj.id); setActiveSection("catalog"); }}
                    className="glass rounded-2xl p-5 text-left card-hover neon-border group"
                  >
                    <div className={`subject-icon bg-gradient-to-br ${subj.color} mb-3`}>
                      {subj.emoji}
                    </div>
                    <div className="font-semibold text-white group-hover:text-purple-300 transition-colors text-sm">{subj.name}</div>
                    <div className="text-white/40 text-xs mt-1">
                      {HOMEWORKS.filter(h => h.subject === subj.id).length} заданий
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* HOT */}
          <section className="py-8 pb-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-3xl font-bold text-white flex items-center gap-3">
                  🔥 <span>ПОПУЛЯРНОЕ</span>
                </h2>
                <button
                  onClick={() => setActiveSection("catalog")}
                  className="text-pink-400 hover:text-pink-300 text-sm font-medium flex items-center gap-1 transition-colors"
                >
                  Все ДЗ
                  <Icon name="ArrowRight" size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {HOMEWORKS.filter(h => h.hot).map(hw => (
                  <HWCard key={hw.id} hw={hw} />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* CATALOG */
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-4xl font-bold text-white mb-8">
              КАТАЛОГ <span className="gradient-text">ДЗ</span>
            </h2>

            {/* FILTERS */}
            <div className="glass rounded-2xl p-4 neon-border mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Search" className="text-white/40 shrink-0" size={18} />
                <input
                  type="text"
                  placeholder="Поиск по теме, предмету, описанию..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-white/30 outline-none text-sm"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-white/40 hover:text-white transition-colors">
                    <Icon name="X" size={16} />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-white/40 text-xs self-center mr-1">Класс:</span>
                <button
                  onClick={() => setSelectedGrade(null)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${!selectedGrade ? "bg-purple-500 text-white" : "glass text-white/60 hover:text-white"}`}
                >
                  Все
                </button>
                {GRADES.map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGrade(selectedGrade === g ? null : g)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${selectedGrade === g ? "bg-purple-500 text-white" : "glass text-white/60 hover:text-white"}`}
                  >
                    {g}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-white/40 text-xs self-center mr-1">Предмет:</span>
                <button
                  onClick={() => setSelectedSubject(null)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${!selectedSubject ? "bg-cyan-500 text-black" : "glass text-white/60 hover:text-white"}`}
                >
                  Все
                </button>
                {SUBJECTS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSubject(selectedSubject === s.id ? null : s.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${selectedSubject === s.id ? "bg-cyan-500 text-black" : "glass text-white/60 hover:text-white"}`}
                  >
                    <span>{s.emoji}</span>
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-white/40 text-sm mb-4">
              Найдено: <span className="text-white font-semibold">{filtered.length}</span> заданий
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map(hw => (
                  <HWCard key={hw.id} hw={hw} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="text-6xl mb-4">🔍</div>
                <div className="text-white/60 text-lg font-medium mb-2">Ничего не найдено</div>
                <div className="text-white/30 text-sm">Попробуй изменить запрос или убрать фильтры</div>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedGrade(null); setSelectedSubject(null); }}
                  className="mt-4 text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 mt-8">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-xs font-display">Д</div>
            <span className="font-display font-bold text-white text-sm">ДОМАШКА.PRO</span>
          </div>
          <div className="text-white/30 text-xs">© 2024 Все права защищены</div>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">Правила</a>
            <a href="#" className="text-white/40 hover:text-white text-xs transition-colors">Поддержка</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function HWCard({ hw }: { hw: typeof HOMEWORKS[0] }) {
  const subj = SUBJECT_MAP[hw.subject];
  return (
    <div className="glass rounded-2xl p-4 neon-border card-hover flex flex-col gap-3 relative overflow-hidden">
      {hw.hot && (
        <div className="absolute top-3 right-3">
          <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">🔥 Хит</span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div
          className={`subject-icon bg-gradient-to-br ${subj?.color || "from-purple-500 to-cyan-500"} shrink-0`}
          style={{ width: 40, height: 40, fontSize: 18 }}
        >
          {subj?.emoji}
        </div>
        <div>
          <div className="text-white/50 text-xs font-medium">{subj?.name} · {hw.grade} класс</div>
          <div className="text-xs text-purple-300 font-medium">{hw.topic}</div>
        </div>
      </div>

      <div className="font-semibold text-white text-sm leading-tight">{hw.title}</div>

      <div className="flex items-center gap-3 text-xs text-white/40">
        <span className="flex items-center gap-1">
          <Icon name="FileText" size={12} />
          {hw.pages} стр.
        </span>
        <span className="text-yellow-400">⭐ {hw.rating}</span>
        <span>{hw.reviews} отзывов</span>
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
        <div className="text-white font-bold text-lg font-display">
          200 <span className="text-sm text-white/40 font-normal">₽</span>
        </div>
        <a
          href="https://pay.cloudtips.ru/p/0090313d"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-1.5 rounded-xl text-xs font-semibold hover:opacity-90 transition-all"
        >
          Купить
        </a>
      </div>
    </div>
  );
}