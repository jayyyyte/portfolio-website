export type Project = {
  name: string;
  slug: string;
  status: "Draft" | "Ready" | "In progress";
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
      "A daily Airflow pipeline that extracts e-commerce product data, validates and loads market snapshots into PostgreSQL, and supports Metabase dashboards.",
    problem:
      "Market analysts need a repeatable way to track competitor prices, ratings, product categories, and pipeline quality over time instead of collecting product data manually.",
    dataSources: ["FakeStore API", "Tiki scraper", "Raw JSON staging files", "Airflow execution metadata"],
    pipeline: [
      "Run the `ecommerce_market_etl` Airflow DAG daily at 00:00 UTC",
      "Extract product data with retry, timeout handling, pagination support, and raw JSON staging",
      "Validate schema drift and transform product rows with Pandas and Pandera",
      "UPSERT clean daily snapshots into PostgreSQL and store rejected rows with reason codes",
      "Expose checked-in SQL queries for Metabase product and pipeline dashboards",
    ],
    techStack: [
      "Python",
      "Apache Airflow",
      "Pandas",
      "Pandera",
      "PostgreSQL",
      "SQLAlchemy",
      "Metabase",
      "Docker",
      "pytest",
    ],
    dataModel: [
      "products_market",
      "pipeline_runs",
      "rejected_records",
      "staging/{date}/raw_products.json",
      "archive/YYYY/MM/DD/raw_products.json",
      "sql/queries Metabase cards",
    ],
    dataQuality: [
      "Schema drift validation before transformation",
      "Critical-field rejection for missing product IDs and invalid prices",
      "Rating clipping and category normalization",
      "Idempotent UPSERT on product, source, and extraction date",
      "Pipeline audit rows with row counts, status, and data quality score",
    ],
    outcome:
      "Ready: verified with 121 passing tests, Airflow DAG checks, five days of demo product history, zero duplicate daily product rows, and Metabase-ready dashboard SQL.",
    github: "https://github.com/jayyyyte/Ecommerce-Market-Intelligence-Batch-ETL-Pipeline",
    deployment: "",
    caseStudy: "/case-studies/ecommerce-market-batch-etl-pipeline/",
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
    github: "https://github.com/jayyyyte/fintech-sentinel",
    deployment: "",
    caseStudy: "/case-studies/fintech-sentinel/",
  },
  {
    name: "Airflow Data Quality Workflow",
    slug: "airflow-data-quality-workflow",
    status: "Draft",
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
