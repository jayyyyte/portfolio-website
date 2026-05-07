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
    name: "Fintech Sentinel",
    slug: "fintech-sentinel",
    status: "In progress",
    summary:
      "A real-time transaction monitoring and fraud detection lakehouse for simulated digital banking data.",
    problem:
      "Risk teams need trusted, low-latency transaction data to detect fraud patterns, audit historical activity, and serve analytics without moving data between systems.",
    dataSources: ["PostgreSQL CDC events", "Synthetic PaySim transactions", "Users table", "Accounts table"],
    pipeline: [
      "Generate synthetic users, accounts, and transaction inserts in PostgreSQL",
      "Capture inserts and updates with Debezium CDC and publish them to Kafka topics",
      "Evaluate fraud rules in PySpark Structured Streaming and write enriched events to Bronze Iceberg tables",
      "Use Airflow and dbt to build Silver and Gold models for analyst-ready fraud and account metrics",
    ],
    techStack: [
      "PostgreSQL",
      "Debezium",
      "Kafka",
      "PySpark",
      "Apache Iceberg",
      "MinIO",
      "Nessie",
      "dbt",
      "Airflow",
      "Great Expectations",
      "Trino",
      "Grafana",
      "Docker",
    ],
    dataModel: [
      "users",
      "accounts",
      "transactions",
      "bronze.transactions_raw",
      "silver_transactions",
      "silver_accounts_scd2",
      "gold_fraud_by_region",
      "gold_fraud_alerts_15min",
      "gold_ml_features",
    ],
    dataQuality: [
      "CDC completeness checks against source transaction counts",
      "Great Expectations validation on Bronze and Silver promotion gates",
      "dbt tests for required keys, accepted values, and model relationships",
      "SLO checks for 5-second fraud latency and 15-minute Gold freshness",
    ],
    outcome:
      "In progress: building a reproducible Docker Compose lakehouse that flags suspicious transactions, preserves raw CDC history, and exposes fraud monitoring datasets through Trino and Grafana.",
    deployment: "",
    caseStudy: "/case-studies/fintech-sentinel/",
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
