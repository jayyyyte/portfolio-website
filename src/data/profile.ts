export const profile = {
  name: "Chu Tuan Linh",
  role: "Aspiring Data Engineer",
  location: "Hanoi",
  email: "tlinh030805@gmail.com",
  github: "https://github.com/jayyyyte",
  linkedin: "https://www.linkedin.com/in/chu-linh-862279221/",
  image: "/images/profile_image.jpg",
  hero: {
    headline: "Aspiring Data Engineer building reliable pipelines and analytics-ready data models.",
    subheadline:
      "I work with Python, SQL, data modeling, orchestration, and data quality to turn raw data into useful datasets for analysis and decision-making.",
  },
  about:
    "I am focused on data engineering fundamentals: designing ETL/ELT pipelines, writing clear SQL, modeling data for analytics, and building reproducible systems. I enjoy projects that involve messy raw data, transformation logic, orchestration, and making data trustworthy.",
  skills: [
    {
      category: "Languages",
      items: ["Python", "SQL", "Java", "C++"],
    },
    {
      category: "Databases / Warehouses",
      items: ["PostgreSQL", "BigQuery", "Snowflake"],
    },
    {
      category: "Data Engineering",
      items: [
        "ETL/ELT",
        "Batch pipelines",
        "Data modeling",
        "Data quality checks",
        "Data validation",
        "Workflow orchestration",
      ],
    },
    {
      category: "Tools",
      items: ["dbt", "Airflow", "Docker", "Git", "Linux", "Vercel"],
    },
    {
      category: "Cloud",
      items: ["AWS", "GCP"],
    },
  ],
  resumeHighlights: [
    "Built batch ETL pipelines using Python and SQL.",
    "Designed staging, dimension, fact, and mart tables.",
    "Used orchestration tools to schedule and monitor workflows.",
    "Added data quality checks to improve trust in output datasets.",
    "Containerized projects with Docker for reproducibility.",
  ],
};
