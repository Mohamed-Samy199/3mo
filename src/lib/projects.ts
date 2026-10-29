export type ProjectCategory = "Branding" | "Marketing" | "Programming" | "Content";

export type Project = {
  id: string;
  name: string;
  category: ProjectCategory;
  discipline: string;
  context: string;
  image: string;
  alt: string;
  layout: string;
  imageTone: string;
};

export const projectCategories: ProjectCategory[] = [
  "Branding",
  "Marketing",
  "Programming",
  "Content",
];

export const projects: Project[] = [
  {
    id: "01",
    name: "Cutlery",
    category: "Branding",
    discipline: "Brand identity",
    context: "Hospitality",
    image: "/projects/project-01.webp",
    alt: "Cutlery restaurant website and brand presentation",
    layout: "md:col-span-7",
    imageTone: "bg-[#f3f0e7]",
  },
  {
    id: "02",
    name: "Feast",
    category: "Marketing",
    discipline: "Campaign",
    context: "Food & editorial",
    image: "/projects/project-02.webp",
    alt: "Feast food and editorial website",
    layout: "md:col-span-5 md:mt-20",
    imageTone: "bg-[#f3f0e7]",
  },
  {
    id: "03",
    name: "Elixir",
    category: "Programming",
    discipline: "Web experience",
    context: "Consulting",
    image: "/projects/project-03.webp",
    alt: "Elixir consulting website hero and navigation",
    layout: "md:col-span-5",
    imageTone: "bg-[#f3f0e7]",
  },
  {
    id: "04",
    name: "Luxury Restaurant",
    category: "Content",
    discipline: "Content & motion",
    context: "Hospitality",
    image: "/projects/project-04.webp",
    alt: "Luxury restaurant food and website content presentation",
    layout: "md:col-span-7 md:mt-20",
    imageTone: "bg-[#f3f0e7]",
  },
  {
    id: "05",
    name: "PaintPro",
    category: "Programming",
    discipline: "Digital system",
    context: "Home services",
    image: "/projects/project-05.webp",
    alt: "PaintPro home painting service website",
    layout: "md:col-span-6",
    imageTone: "bg-[#f3f0e7]",
  },
  {
    id: "06",
    name: "Hive",
    category: "Programming",
    discipline: "Digital system",
    context: "Automation",
    image: "/projects/project-06.webp",
    alt: "Hive automation platform landing page",
    layout: "md:col-span-6 md:mt-16",
    imageTone: "bg-[#f3f0e7]",
  },
];
