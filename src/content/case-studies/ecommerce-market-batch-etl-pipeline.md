---
title: "Ecommerce Market Batch ETL Pipeline"
summary: "Ready case study for a daily Airflow ETL pipeline that collects e-commerce product data, validates quality, stores market snapshots in PostgreSQL, and powers Metabase dashboards."
projectSlug: "ecommerce-market-batch-etl-pipeline"
status: "Ready"
techStack:
  - Python
  - Apache Airflow
  - Pandas
  - Pandera
  - PostgreSQL
  - SQLAlchemy
  - Metabase
  - Docker
  - pytest
---

## Problem

E-commerce market analysis is hard to scale when product prices, ratings, stock status, and category changes are collected manually. Analysts need daily historical snapshots that are clean, queryable, and safe to rerun without creating duplicates.

This project builds a batch ETL system that automates product-data collection, validates and standardizes the raw records, stores the results in PostgreSQL, and exposes dashboard-ready SQL for market and pipeline monitoring.

## Data Sources

- FakeStore API for stable demo product data.
- Tiki scraper as an additional market-data extractor with pagination, user-agent rotation, and rate-limit awareness.
- Raw JSON files stored in `staging/<execution_date>/`.
- Airflow task metadata and pipeline run metrics.

## Architecture

The system follows a modular batch ETL pattern:

```text
FakeStore API / Tiki
  -> Python extractor
  -> raw JSON staging
  -> schema validation
  -> Pandas/Pandera transformation
  -> PostgreSQL UPSERT loader
  -> Metabase SQL dashboards
```

Apache Airflow orchestrates the production DAG, `ecommerce_market_etl`, on a daily schedule at `00:00` UTC. PostgreSQL stores product snapshots and operational audit records. Metabase connects to PostgreSQL for charts and filters used by analysts and business stakeholders.

## Pipeline Design

The Airflow task chain is:

```text
extract_data -> validate_schema -> transform_data -> load_to_db -> notify_status
```

`extract_data` fetches product records, applies retry behavior for transient source failures, and writes raw records to date-partitioned staging files. `validate_schema` checks for unexpected source shape changes before any transformation runs.

`transform_data` cleans the raw records with Pandas and Pandera. It rejects rows with missing critical fields, normalizes prices and categories, clips ratings into the accepted range, fills safe defaults, and calculates a data quality score.

`load_to_db` writes clean records into PostgreSQL with idempotent UPSERT logic and stores rejected rows for audit. `notify_status` runs after success or failure, records the final state, and can send Slack/webhook summaries without making notification delivery pipeline-critical.

## Data Model

- `products_market`: clean daily product snapshots with product ID, name, category, price, rating, review count, stock status, source, extraction date, and pipeline run ID.
- `pipeline_runs`: audit table for each DAG execution, including status, row counts, data quality score, timestamps, and error message.
- `rejected_records`: JSONB audit table for invalid input rows and rejection reasons.
- `staging/<date>/raw_products.json`: raw extracted data preserved before transformation.
- `archive/YYYY/MM/DD/raw_products.json`: archived raw files with checksum verification.
- `sql/queries/`: checked-in SQL library for Metabase cards.

The key database constraint is `UNIQUE (product_id, source, extraction_date)`, which makes same-day reruns idempotent while preserving a new product snapshot for each new extraction date.

## Data Quality Checks

- Schema validation before transformation to catch source drift early.
- Rejection of rows with null or empty `product_id`.
- Rejection of rows with null, empty, non-numeric, zero, or negative `price`.
- Category normalization into lowercase slug format.
- Rating values clipped into the `0.0` to `5.0` range.
- Pandera validation against the expected column and type specification.
- Rejected rows stored with original raw JSON and `rejection_reason`.
- Per-run `data_quality_score` stored in `pipeline_runs`.
- Duplicate checks on `(product_id, source, extraction_date)`.

## Dashboards

The project includes Metabase-ready SQL files under `sql/queries/`:

- Average price by category.
- Top 10 products by rating.
- Daily product count trend.
- Pipeline run history.
- Latest data quality score.
- Rejected records by reason.

The dashboard is designed with date range and category filters so a reviewer can inspect both market behavior and pipeline health.

## Reliability

The pipeline handles common batch ETL failure modes:

- Network timeouts and HTTP server errors use retries with exponential backoff.
- Rate-limit cases can pause and retry instead of failing immediately.
- Schema mismatch halts before transform/load.
- Database failures roll back product and rejected-record writes.
- `max_active_runs=1` prevents overlapping Airflow runs.
- Same logical date reruns are deterministic and idempotent.
- Raw staging files are archived only after checksum verification.
- Credentials are read through environment variables or Airflow configuration, not hardcoded in source.

## Verification

Sprint 4 verification showed:

- `121 passed, 17 skipped` for the local pytest suite.
- Airflow DAG import check returned no import errors.
- End-to-end DAG tests for `2026-05-01` through `2026-05-05` completed successfully.
- PostgreSQL contained 5 demo dates with 20 products per date.
- The latest demo run loaded 20 rows, rejected 0 rows, and produced a `100.00` data quality score.
- Duplicate daily product check returned zero rows.
- Dashboard SQL smoke checks returned data for average price, top-rated products, daily product count, pipeline history, and latest data quality score.

## Outcome

The finished project demonstrates a production-style batch data pipeline rather than only a data-cleaning script. It covers extraction, validation, transformation, loading, orchestration, idempotency, audit logging, dashboard SQL, failure handling, and reproducible Docker setup.

## Links

- Repository: [https://github.com/jayyyyte/Ecommerce-Market-Intelligence-Batch-ETL-Pipeline](https://github.com/jayyyyte/Ecommerce-Market-Intelligence-Batch-ETL-Pipeline)
- Dashboard: Metabase runs locally at `http://localhost:3000` after Docker Compose startup
