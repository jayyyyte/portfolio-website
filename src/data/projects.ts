export type Project = {
  name: string;
  slug: string;
  status: "Draft" | "Ready" | "In progress" | "Planning";
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
    name: "Formula-1 Lakehouse Analytics",
    slug: "f1-lakehouse-analytics",
    status: "In progress",
    summary:
      "An ELT lakehouse analytics platform for Formula 1 historical results, race sessions, telemetry, strategy, and weather insights.",
    problem:
      "Formula 1 data is fragmented across historical APIs, session endpoints, and telemetry sources, making reliable race performance and strategy analysis difficult to reproduce.",
    dataSources: [
      "OpenF1 API",
      "Jolpica-F1 API",
      "FastF1 Python library",
      "Weather and session endpoints",
      "Raw Bronze lakehouse files",
    ],
    pipeline: [
      "Use Airflow to ingest historical, session, lap, stint, weather, position, and selected telemetry data",
      "Load raw API responses into a Bronze layer on MinIO/S3 with source and race/session partitions",
      "Transform Bronze data into typed, deduplicated Silver Parquet datasets with PySpark",
      "Build Gold analytical marts with dbt for race overview, driver performance, pit stops, tyre strategy, and weather impact",
      "Serve Gold datasets through DuckDB and Metabase dashboards",
    ],
    techStack: ["Python", "Apache Airflow", "MinIO", "PySpark", "dbt", "DuckDB", "Metabase", "Parquet", "Docker"],
    dataModel: [
      "bronze.openf1",
      "bronze.jolpica",
      "silver.races",
      "silver.drivers",
      "silver.sessions",
      "silver.laps",
      "silver.weather",
      "silver.stints",
      "fact_lap",
      "fact_car_telemetry",
      "gold_driver_race_performance",
      "gold_pit_stop_efficiency",
      "gold_tyre_strategy_analysis",
      "gold_weather_impact_analysis",
      "gold_race_overview",
    ],
    dataQuality: [
      "Raw Bronze preservation for auditability and reprocessing",
      "Canonical identifier mapping across OpenF1 and Jolpica-F1",
      "Silver schema checks for race, driver, lap, weather, telemetry, and result datasets",
      "dbt tests for not-null keys, uniqueness, accepted values, and metric ranges",
      "Airflow logs for source, parameters, output paths, record counts, and errors",
    ],
    outcome:
      "In progress: building a local Docker-based lakehouse MVP that processes 3 to 5 selected race weekends end to end and presents at least four Metabase dashboard pages.",
    deployment: "",
    caseStudy: "/case-studies/f1-lakehouse-analytics/",
  },
  {
    name: "Fintech Sentinel",
    slug: "fintech-sentinel",
    status: "Planning",
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
      "Planning: designing a reproducible Docker Compose lakehouse that flags suspicious transactions, preserves raw CDC history, and exposes fraud monitoring datasets through Trino and Grafana.",
    github: "https://github.com/jayyyyte/fintech-sentinel",
    deployment: "",
    caseStudy: "/case-studies/fintech-sentinel/",
  },
];

export const featuredProjects = projects.slice(0, 3);
