import { SoundProfile } from "./audio";

export interface Episode {
  id: string;
  num: string;
  title: string;
  host: string;
  episodeLabel: string;
  category: "Comedy" | "Politics" | "Science";
  duration: string;
  bg: string;
  image: string;
  description: string;
  keyTakeaways: string[];
  soundProfile: SoundProfile;
}

export const EPISODES_DATA: Episode[] = [
  {
    id: "01",
    num: "01",
    title: "Giggles, Gags, and Great Sketches!",
    host: "Dony Parker",
    episodeLabel: "Episode 32",
    category: "Comedy",
    duration: "8hr 36m",
    bg: "#16936E",
    image: "/assets/images/episode_comedy_studio_1791851744000.jpg",
    description:
      "An expansive studio session unpacking improvisational timing, rule-of-three setups, and why unexpected acoustic pauses make audiences laugh hardest.",
    keyTakeaways: [
      "Why a 300-millisecond beat of silence amplifies punchline delivery",
      "Archival tape breakdowns from classic late-night writer rooms",
      "Live crowd-work experiments recorded on binaural ribbon mics",
    ],
    soundProfile: "comedy",
  },
  {
    id: "02",
    num: "02",
    title: "Weekly Insights in Political Science",
    host: "Madalen Ony",
    episodeLabel: "Episode 12",
    category: "Politics",
    duration: "4hr 16m",
    bg: "#6152AB",
    image: "/assets/images/episode_political_host_1791851743740.jpg",
    description:
      "Deconstructing electoral systems, coalition dynamics, and how civic rhetoric shifts across decades with comparative historians and policy analysts.",
    keyTakeaways: [
      "Comparative analysis of ranked-choice voting outcomes across 14 cities",
      "How broadcast radio transformed mid-century parliamentary debates",
      "Primary source readings from newly declassified diplomatic transcripts",
    ],
    soundProfile: "politic",
  },
  {
    id: "03",
    num: "03",
    title: "The Secret Neurobiology of Curiosity",
    host: "Dr. Evelyn Cross",
    episodeLabel: "Episode 45",
    category: "Science",
    duration: "2hr 15m",
    bg: "#C45731",
    image: "/assets/images/episode_science_studio_1795165807036.jpg",
    description:
      "How dopamine loops spark lifelong learning and why narrative audio activates deeper hippocampal memory encoding than passive reading.",
    keyTakeaways: [
      "fMRI insights into how mystery-driven storytelling primes retention",
      "Acoustic spatialization techniques used by natural history documentarians",
      "Practical habits for sustaining intellectual wonder in adulthood",
    ],
    soundProfile: "science",
  },
];

export interface HostProfile {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
  featuredEpisodeId: string;
}

export const HOSTS_DATA: HostProfile[] = [
  {
    id: "julian",
    name: "Julian Vance",
    role: "Host & Lead Storyteller",
    image: "/assets/images/host_pill_man_1791851761626.jpg",
    quote:
      "Curiosity is an instinct we never outgrow when the story is told right.",
    featuredEpisodeId: "01",
  },
  {
    id: "elena",
    name: "Elena Rostova",
    role: "Co-Host & Audio Producer",
    image: "/assets/images/studio_mic_interview_1791851742261.jpg",
    quote:
      "Sound lets a listener inhabit a room before a single adjective is spoken.",
    featuredEpisodeId: "03",
  },
  {
    id: "maya",
    name: "Maya Chen",
    role: "Investigative Journalist",
    image: "/assets/images/hero_host_portrait_1791851741118.jpg",
    quote:
      "Every overlooked footnote hides a human turning point worth hearing.",
    featuredEpisodeId: "02",
  },
  {
    id: "arthur",
    name: "Arthur Sterling",
    role: "Senior Historian & Host",
    image: "/assets/images/host_pill_senior_1791851761351.jpg",
    quote:
      "To understand why today sounds the way it does, listen to yesterday.",
    featuredEpisodeId: "02",
  },
];

export interface FactMetric {
  id: string;
  numericTarget: number;
  suffix: string;
  label: string;
  bg: string;
  summary: string;
  context: string;
}

export const FACTS_METRICS: FactMetric[] = [
  {
    id: "listeners",
    numericTarget: 500,
    suffix: "K",
    label: "Daily Listeners",
    bg: "#7C83FD",
    summary: "Verified global reach across 142 countries",
    context:
      "Average listening completion holds steady at 91% across full-length episodes.",
  },
  {
    id: "charts",
    numericTarget: 358,
    suffix: "+",
    label: "Podcast Chart Placements",
    bg: "#FF9E79",
    summary: "Top 10 in Science & Society charts",
    context:
      "Featured in editorial selections across Apple Podcasts and Spotify.",
  },
  {
    id: "guests",
    numericTarget: 276,
    suffix: "+",
    label: "Guest Contributors",
    bg: "#25C0D0",
    summary: "Researchers, comedians, and historians",
    context:
      "Unscripted long-form studio conversations recorded in person whenever possible.",
  },
  {
    id: "experiences",
    numericTarget: 36,
    suffix: "+",
    label: "Live Audio Experiences",
    bg: "#512DA8",
    summary: "Binaural auditorium recordings",
    context:
      "Spatial soundstages hosted in independent theaters and university halls.",
  },
  {
    id: "episodes",
    numericTarget: 215,
    suffix: "+",
    label: "Published Episodes",
    bg: "#2BB673",
    summary: "Fact-checked & mastered in house",
    context:
      "Over 1,200 hours of cataloged storytelling arranged for sequential listening.",
  },
];
