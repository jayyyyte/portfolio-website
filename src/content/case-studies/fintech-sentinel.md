---
title: "Fintech Sentinel"
summary: "In-progress case study for a real-time transaction monitoring and fraud detection lakehouse using CDC, Kafka, Spark, Iceberg, dbt, Airflow, and Great Expectations."
projectSlug: "fintech-sentinel"
status: "In progress"
techStack:
  - PostgreSQL
  - Debezium
  - Kafka
  - PySpark
  - Apache Iceberg
  - MinIO
  - Nessie
  - dbt
  - Airflow
  - Great Expectations
  - Trino
  - Grafana
  - Docker
---

## Problem

Digital banking risk teams need transaction data that is fresh enough for fraud response, reliable enough for audit work, and structured enough for analytics. The project simulates that environment by building an end-to-end data platform that captures account and transaction changes, evaluates fraud rules in near real time, stores raw and modeled data in a lakehouse, and exposes queryable datasets for risk monitoring.

The target service objectives are explicit: transaction fraud flags should be written within 5 seconds of insertion, CDC ingestion should preserve every captured change, and Gold-layer monitoring tables should refresh within 15 minutes.

## Data Sources

- `users`: synthetic customer records with KYC status for compliance-oriented fraud checks.
- `accounts`: synthetic account records with balances and account ownership relationships.
- `transactions`: PostgreSQL source table populated by a Python transaction generator.
- PaySim-based transaction distributions: used to simulate realistic transfer amounts, transaction types, and ground-truth fraud behavior.
- Generated device and location metadata: IP address, latitude, longitude, and device identifiers used for geographic anomaly rules.

## Architecture

PostgreSQL is the transactional source. Debezium reads PostgreSQL WAL changes and publishes CDC events to Kafka. PySpark Structured Streaming consumes the transaction topic, applies fraud detection rules, emits fraud alerts, and writes enriched events to Apache Iceberg Bronze tables on MinIO through the Nessie REST catalog.

Airflow owns the batch layer only. It schedules dbt models that clean and model Bronze data into Silver and Gold tables, then runs Great Expectations validation suites before promotion. Trino provides SQL access to the Iceberg tables, while Grafana and Prometheus expose operational metrics such as Kafka throughput, Spark lag, and fraud alert rates.

## Pipeline Design

1. Seed synthetic users and accounts in PostgreSQL.
2. Generate continuous transaction inserts using PaySim-inspired distributions.
3. Capture inserts and updates from PostgreSQL with Debezium CDC.
4. Buffer raw CDC events in Kafka topics for transactions, accounts, and fraud alerts.
5. Read transaction events with PySpark Structured Streaming.
6. Apply fraud rules such as high-risk account drain, suspicious KYC transfer, velocity spike, impossible travel, laundering-style pair movement, and historical amount spike.
7. Write all enriched events to `bronze.transactions_raw` in Apache Iceberg.
8. Run dbt models on a 15-minute Airflow schedule to build Silver and Gold datasets.
9. Validate promoted tables with Great Expectations and dbt tests.
10. Query modeled data through Trino and monitor system behavior in Grafana.

## Data Model

- Source tables: `users`, `accounts`, `transactions`.
- Kafka topics: `fintech.public.transactions`, `fintech.public.accounts`, `fintech.fraud.alerts`.
- Bronze: `bronze.transactions_raw`, preserving raw CDC structure plus the derived `fraud_flag`.
- Silver: `silver_transactions` for deduplicated, typed transaction records; `silver_accounts_scd2` for account balance history.
- Gold: `gold_fraud_by_region`, `gold_fraud_alerts_15min`, and `gold_ml_features` for monitoring, analysis, and future model development.

Financial values are modeled with `DECIMAL(18, 4)` to avoid floating-point precision issues. UUIDs are used for source primary keys to prevent collisions and make the simulated source closer to distributed financial systems.

## Data Quality Checks

- CDC completeness validation from PostgreSQL source rows to Kafka and Bronze Iceberg records.
- Great Expectations suites for required fields, schema contracts, allowed status values, and valid transaction amounts.
- dbt tests for unique transaction identifiers, not-null foreign keys, accepted fraud flags, and relationships between transactions and accounts.
- Freshness checks for Silver and Gold models scheduled by Airflow.
- SLO measurement scripts for end-to-end latency, CDC restart recovery, and Gold-layer freshness.

## Challenges

The hardest part is coordinating streaming and batch responsibilities without making Airflow control services it should not own. Spark must run continuously for fraud detection, while Airflow should only schedule dbt transformations and validation gates.

Stateful fraud detection also introduces trade-offs. Velocity, impossible-travel, and laundering rules require windowed state, watermarks, and deterministic priority handling when multiple rules fire for the same transaction. The historical spike rule intentionally accepts a 15-minute staleness window because the account baseline is refreshed from the lakehouse rather than served from an online feature store.

## Current Progress

The project is being developed in two phases. Phase 1 focuses on a demo-ready MVP: Docker Compose infrastructure, transaction generator, Debezium CDC, Kafka topics, Spark fraud flagging, Bronze Iceberg storage, Silver dbt models, Airflow scheduling, Trino access, and a basic Grafana dashboard.

Phase 2 adds production-grade validation and presentation work: Great Expectations gates, Gold dbt models, account SCD-2 history, a complete monitoring dashboard, Iceberg time-travel audit examples, dbt documentation, and SLO evidence for the portfolio writeup.

## Outcome

When complete, Fintech Sentinel will demonstrate a realistic data engineering system rather than a single isolated pipeline. It covers CDC ingestion, stream processing, medallion lakehouse modeling, orchestration, data quality, observability, and analyst-facing SQL access in one reproducible local environment.

## Links

- Repository: Not published yet
- Deployment: Not available for this in-progress data platform
