import { useEffect, useState } from "react";

type Speaker = {
  name: string;
  role: string;
  image: string;
  bio: string;
  specialty: string;
};

const speakers: Speaker[] = [
  {
    name: "Dr. Amara Okafor",
    role: "AI Ethics Researcher",
    specialty: "Responsible intelligence",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=85",
    bio: "Amara leads global research into responsible AI systems. Her work helps organizations turn complex questions of fairness, accountability, and trust into practical standards that teams can apply every day.",
  },
  {
    name: "Julian Mercer",
    role: "Founder, Common Ground",
    specialty: "Civic innovation",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85",
    bio: "Julian builds digital tools that make cities more collaborative and inclusive. Over the last decade, his programs have connected more than two million residents with the decisions shaping their communities.",
  },
  {
    name: "Maya Chen",
    role: "Futures Strategist",
    specialty: "Emerging systems",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=85",
    bio: "Maya works at the intersection of design, technology, and social change. She advises leaders on how to recognize weak signals and create resilient strategies for an uncertain future.",
  },
  {
    name: "Marcus Reed",
    role: "Climate Technologist",
    specialty: "Regenerative futures",
    image:
      "https://images.unsplash.com/photo-1588178454780-441fa5b99fa5?auto=format&fit=crop&w=900&q=85",
    bio: "Marcus develops open-source systems for measuring and reducing industrial carbon. His research turns climate ambition into measurable action through transparent data and collective accountability.",
  },
  {
    name: "Nadia El-Sayed",
    role: "Social Architect",
    specialty: "Human connection",
    image:
      "https://images.unsplash.com/photo-1609436132311-e4b0c9370469?auto=format&fit=crop&w=900&q=85",
    bio: "Nadia designs spaces and services that strengthen human connection. Her award-winning practice explores how public environments can support belonging, wellbeing, and meaningful exchange.",
  },
];

const Arrow = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14M14 7l5 5-5 5" />
  </svg>
);

function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function HomePage() {
  const [selected, setSelected] = useState<Speaker | null>(null);

  useEffect(() => {
    if (!selected) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", close);
    };
  }, [selected]);

  return (
    <main>
      <section className="speakers" id="speakers">
        <div className="section-head">
          <div><span>01</span><p>Guest speakers</p></div>
          <p className="section-note">Tap a portrait to discover<br />the person behind the idea.</p>
        </div>
        <div className="speaker-grid">
          {speakers.map((speaker, index) => (
            <button
              className="speaker-card"
              onClick={() => setSelected(speaker)}
              key={speaker.name}
              aria-label={`Learn more about ${speaker.name}`}
            >
              <div className="portrait">
                <img src={speaker.image} alt="" />
                <span className="card-number">0{index + 1}</span>
                <span className="open-icon">↗</span>
              </div>
              <h3>{speaker.name}</h3>
              <p>{speaker.role}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="featured" id="featured">
        <div className="feature-image" role="img" aria-label="Speaker presenting to a conference audience">
          <div className="image-label">Collective intelligence<br />in action</div>
        </div>
        <div className="feature-copy">
          <span className="feature-index">02 / The central theme</span>
          <div>
            <h2>When ideas<br /><em>become action.</em></h2>
            <p>Progress rarely starts with certainty. It starts when people with different experiences meet, listen, and choose to build together. Converge 2025 is a study in that possibility—a live exploration of technology, climate, culture, and the connective tissue between them.</p>
          </div>
        </div>
      </section>

      <section className="report" id="report">
        <div className="eyebrow light"><span /> Field notes / Live data</div>
        <div className="report-layout">
          <h2>E-Report<span>.</span></h2>
          <div>
            <p>Go beyond the stage. Explore visitor sentiment, speaker portfolios, and the live data shaping this year’s conversation.</p>
            <button className="cta" onClick={() => navigate("/dashboard")}>
              Open analytics <Arrow />
            </button>
          </div>
        </div>
        <p className="report-meta">Updated live · 2,418 responses · Five portfolios</p>
      </section>

      {selected && (
        <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setSelected(null)}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="close" onClick={() => setSelected(null)} aria-label="Close speaker details">×</button>
            <img src={selected.image} alt={selected.name} />
            <div className="modal-copy">
              <span>{selected.specialty}</span>
              <h2 id="modal-title">{selected.name}</h2>
              <h3>{selected.role}</h3>
              <p>{selected.bio}</p>
              <div className="quote">“The future is not a destination. It is a daily design decision.”</div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function Dashboard() {
  return (
    <main className="dashboard">
      <section className="dash-intro">
        <div><div className="eyebrow"><span /> Converge intelligence</div><h1>Event pulse<span>.</span></h1></div>
        <p>A living view of the ideas, people, and signals shaping Converge 2025.</p>
      </section>

      <section className="metrics">
        <article><span>Visitor satisfaction</span><strong>94.8<small>%</small></strong><p className="positive">↑ 6.2% vs. 2024</p></article>
        <article><span>Active participants</span><strong>2,418</strong><p>Across 34 countries</p></article>
        <article><span>Ideas exchanged</span><strong>8,706</strong><p className="positive">↑ 18.4% today</p></article>
        <article><span>Net impact score</span><strong>+72</strong><p>Top 8% of events</p></article>
      </section>

      <section className="analytics-grid">
        <article className="chart-panel satisfaction">
          <div className="panel-head"><div><span>01</span><h2>Satisfaction over time</h2></div><button>All sessions⌄</button></div>
          <div className="line-chart">
            <div className="y-labels"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div>
            <svg viewBox="0 0 700 240" preserveAspectRatio="none" aria-label="Satisfaction rose from 62 to 95 percent">
              <defs><linearGradient id="fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#e52929" stopOpacity=".25"/><stop offset="1" stopColor="#e52929" stopOpacity="0"/></linearGradient></defs>
              <path className="area" d="M0 190 C90 177 125 143 200 151 S315 101 380 117 S505 54 570 68 S650 32 700 25 V240 H0Z" />
              <path className="line" d="M0 190 C90 177 125 143 200 151 S315 101 380 117 S505 54 570 68 S650 32 700 25" />
              {[["0","190"],["200","151"],["380","117"],["570","68"],["700","25"]].map(([cx,cy]) => <circle key={cx} cx={cx} cy={cy} r="5" />)}
            </svg>
            <div className="x-labels"><span>09:00</span><span>11:00</span><span>13:00</span><span>15:00</span><span>17:00</span></div>
          </div>
        </article>

        <article className="chart-panel sentiment">
          <div className="panel-head"><div><span>02</span><h2>Sentiment mix</h2></div></div>
          <div className="donut">
            <div><strong>2,418</strong><span>responses</span></div>
          </div>
          <ul><li><i className="red" />Inspired <b>68%</b></li><li><i className="coral" />Curious <b>21%</b></li><li><i className="gray" />Neutral <b>8%</b></li><li><i className="dark" />Other <b>3%</b></li></ul>
        </article>

        <article className="chart-panel portfolio">
          <div className="panel-head"><div><span>03</span><h2>Speaker portfolios</h2></div><button>View all ↗</button></div>
          <div className="portfolio-list">
            {speakers.slice(0, 4).map((speaker, i) => (
              <div key={speaker.name}><img src={speaker.image} alt="" /><div><strong>{speaker.name}</strong><span>{speaker.specialty}</span></div><b>{[92, 88, 84, 79][i]}<small>/100</small></b></div>
            ))}
          </div>
        </article>

        <article className="chart-panel topics">
          <div className="panel-head"><div><span>04</span><h2>Ideas by theme</h2></div></div>
          {[["Responsible AI",86],["Climate action",72],["Civic systems",65],["Human connection",53],["Future of work",41]].map(([label,value]) => (
            <div className="bar" key={label}><span>{label}</span><i><b style={{ width: `${value}%` }} /></i><strong>{value}</strong></div>
          ))}
        </article>
      </section>
    </main>
  );
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const update = () => setPath(window.location.pathname);
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);
  return path === "/dashboard" ? <Dashboard /> : <HomePage />;
}
