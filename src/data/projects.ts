export type Project = {
  name: string;
  slug: string;
  status: "Draft content" | "Ready" | "In progress";
  summary: string;
  problem: string;
  dataSources: string[];
  pipeline: string[];
  techStack: string[];
  dataModel: string[];
  dataQuality: string[];
  outcome: string;
  github?: string;
  deployment?: string;
  caseStudy?: string;
};

export const projects: Project[] = [
  {
    name: "Ecommerce Market Batch ETL Pipeline",
    slug: "ecommerce-market-batch-etl-pipeline",
    status: "Ready",
    summary:
      "A batch ETL pipeline project that ingests transaction data, validates schemas, and produces daily revenue metrics.",
    problem:
      "Raw sales files need to be converted into clean, analytics-ready tables that support revenue reporting and trend analysis.",
    dataSources: ["CSV transaction exports", "Product reference data", "Customer reference data"],
    pipeline: [
      "Load raw files into a staging area",
      "Validate required fields and data types",
      "Transform transactions into fact and dimension tables",
      "Publish daily revenue and order metrics",
    ],
    techStack: ["Python", "SQL", "PostgreSQL", "Docker"],
    dataModel: ["stg_transactions", "dim_customer", "dim_product", "fact_orders", "mart_daily_revenue"],
    dataQuality: ["Not-null checks", "Duplicate order detection", "Referential integrity checks", "Daily row-count checks"],
    outcome:
      "Produces a documented dimensional model and a daily revenue mart that can be used for dashboards or ad hoc SQL analysis.",
    github: "https://github.com/jayyyyte/ecommerce-market-batch-etl-pipeline",
    deployment: "",
    caseStudy: "/case-studies/batch-sales-analytics-pipeline/",
  },
  {
    name: "dbt Analytics Warehouse",
    slug: "dbt-analytics-warehouse",
    status: "In progress",
    summary:
      "A draft analytics engineering project that models raw event and account data into tested warehouse layers.",
    problem:
      "Analytics teams need reliable, reusable models instead of repeating transformation logic across notebooks and dashboard queries.",
    dataSources: ["Application event logs", "Account records", "Subscription records"],
    pipeline: [
      "Ingest raw source tables into warehouse schemas",
      "Create staging models with consistent naming and types",
      "Build intermediate models for business logic",
      "Expose mart tables for product and revenue analytics",
    ],
    techStack: ["dbt", "SQL", "BigQuery", "Git"],
    dataModel: ["stg_events", "stg_accounts", "int_active_accounts", "fact_events", "mart_account_activity"],
    dataQuality: ["Unique key tests", "Accepted values tests", "Relationship tests", "Freshness checks"],
    outcome:
      "Creates tested dbt models that make account activity and product usage easier to analyze consistently.",
    github: "https://github.com/jayyyyte/dbt-analytics-warehouse",
    deployment: "",
    caseStudy: "/case-studies/dbt-analytics-warehouse/",
  },
  {
    name: "Airflow Data Quality Workflow",
    slug: "airflow-data-quality-workflow",
    status: "Draft content",
    summary:
      "A draft orchestration project that schedules pipeline tasks and records validation results for operational visibility.",
    problem:
      "Data pipelines need repeatable scheduling, failure handling, and visible quality checks before data is trusted downstream.",
    dataSources: ["API extracts", "Warehouse tables", "Validation rule configuration"],
    pipeline: [
      "Extract data on a schedule",
      "Run transformation jobs in dependency order",
      "Execute validation tasks before publishing marts",
      "Notify on failed checks or stale data",
    ],
    techStack: ["Airflow", "Python", "SQL", "Docker", "PostgreSQL"],
    dataModel: ["raw_api_events", "stg_api_events", "dq_check_results", "mart_valid_events"],
    dataQuality: ["Freshness checks", "Null-rate thresholds", "Schema validation", "Failed-check logging"],
    outcome:
      "Demonstrates an orchestrated workflow that separates ingestion, transformation, validation, and publishing steps.",
    github: "https://github.com/jayyyyte/airflow-data-quality-workflow",
    deployment: "",
    caseStudy: "/case-studies/airflow-data-quality-workflow/",
  },
];

export const featuredProjects = projects.slice(0, 3);
