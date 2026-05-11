---
title: "Formula-1 Lakehouse Analytics"
summary: "In-progress case study for a Formula 1 lakehouse analytics platform that unifies historical results, race sessions, telemetry, weather, and strategy data into Bronze, Silver, and Gold datasets."
projectSlug: "f1-lakehouse-analytics"
status: "In progress"
techStack:
  - Python
  - Apache Airflow
  - MinIO
  - PySpark
  - dbt
  - DuckDB
  - Metabase
  - Parquet
  - Docker
---

## Problem

Formula 1 analysis depends on many connected datasets: race results, drivers, constructors, sessions, lap times, tyre stints, pit stops, weather, car telemetry, and position data. Public data exists, but it is fragmented across different APIs and libraries, uses inconsistent identifiers, and is not immediately ready for dashboard or SQL analysis.

Formula-1 Lakehouse Analytics solves this as a data engineering project: preserve raw source data, standardize it into cleaned analytical datasets, define trustworthy performance and strategy metrics, and expose the results through BI dashboards.

## Data Sources

- OpenF1 API for sessions, laps, car data, position, weather, stints, and selected telemetry-related data.
- Jolpica-F1 API for Ergast-compatible historical seasons, races, drivers, constructors, standings, and results.
- FastF1 Python library as an optional source for telemetry validation, enrichment, or exploratory analysis.
- Weather/session endpoints for track temperature, air temperature, humidity, rainfall, and wind data.

## Architecture

The platform follows an ELT lakehouse pattern:

```text
OpenF1 / Jolpica-F1 / FastF1
  -> Airflow ingestion jobs
  -> MinIO Bronze raw files
  -> PySpark Silver processing
  -> dbt Gold marts
  -> DuckDB serving layer
  -> Metabase dashboards
```

The MVP runs locally with Docker Compose. MinIO provides S3-compatible object storage, PySpark handles Bronze-to-Silver processing, dbt models Silver data into business-ready Gold marts, DuckDB provides a lightweight query layer, and Metabase is used for dashboard exploration.

## Pipeline Design

1. Airflow triggers ingestion jobs for selected seasons, race weekends, meetings, and sessions.
2. Python clients call OpenF1, Jolpica-F1, and optional FastF1 functions with retry and basic error handling.
3. Raw responses are stored first in Bronze paths such as `bronze/openf1/year=2024/race=monaco/session=race/laps/`.
4. PySpark reads Bronze files, flattens nested records, casts types, deduplicates records, and writes partitioned Silver Parquet datasets.
5. dbt builds Gold analytical marts for race overview, driver race performance, pit stop efficiency, tyre strategy, and weather impact.
6. DuckDB and Metabase query the Gold layer for dashboard pages and interview demos.

## Data Model

Bronze stores raw source-specific files by source, season, race, session, and endpoint.

Silver standardizes core entities and facts:

- `silver.races`
- `silver.drivers`
- `silver.constructors`
- `silver.circuits`
- `silver.sessions`
- `silver.laps`
- `silver.weather`
- `silver.stints`
- `silver.positions`
- `silver.results`

Gold exposes analytical marts:

- `gold_driver_race_performance`
- `gold_pit_stop_efficiency`
- `gold_tyre_strategy_analysis`
- `gold_weather_impact_analysis`
- `gold_race_overview`

Key analytical facts include `fact_lap`, `fact_car_telemetry`, `fact_position`, `fact_weather`, `fact_pit_stop`, and `fact_race_result`.

## Data Quality Checks

- Preserve source identifiers in Silver tables for traceability.
- Maintain canonical mappings between Jolpica-F1 and OpenF1 driver, race, meeting, and session identifiers.
- Validate driver keys, race keys, session keys, and lap numbers before building Gold marts.
- Check lap times, speed, throttle, brake, gear, RPM, DRS, temperature, humidity, points, and position values against reasonable ranges.
- Run dbt tests for not-null fields, unique keys, accepted values, relationships, and metric range constraints.
- Log Airflow task status, source endpoint, parameters, output path, record counts, and errors.

## Analytics

The dashboards are designed to answer race and strategy questions:

- Which driver had the most consistent race pace?
- How did teammates compare within the same constructor?
- Which constructor had the best pit stop efficiency?
- Which tyre compound performed best for a selected race?
- How did track temperature, rainfall, or humidity affect lap time?
- Did pit stop timing contribute to position gains or losses?

Planned Metabase pages include Race Overview, Driver Comparison, Pit Stop Efficiency, Tyre Strategy, and Weather Impact.

## Challenges

The main engineering challenge is identifier consistency. Jolpica-F1 and OpenF1 may represent drivers, races, meetings, and sessions differently, so the lakehouse needs canonical mapping tables while preserving source-specific identifiers for debugging.

Telemetry volume is another constraint. Full historical telemetry for every race can be too large for a local MVP, so the first version limits telemetry processing to selected sessions and uses Parquet partitioning to keep processing and dashboard queries practical.

Metric definitions also need care. Race pace, lap consistency, tyre degradation, teammate gap, pit stop efficiency, and weather impact must be documented so dashboard users understand what is included and excluded.

## Current Progress

The project is in progress. The current scope is an MVP that processes 3 to 5 selected race weekends end to end, ingests at least one season of historical results, includes at least one telemetry-capable race session, and presents at least four dashboard pages in Metabase.

Future enhancements include migrating MinIO to S3, replacing DuckDB with Trino or Athena, adding Apache Iceberg or Delta Lake, adding Great Expectations, introducing Kafka for near real-time session ingestion, and adding CI/CD for tests and dbt validation.

## Outcome

When complete, Formula-1 Lakehouse Analytics will demonstrate a modern ELT data platform with multi-source ingestion, raw data preservation, PySpark transformations, dbt modeling, data quality tests, dashboard-ready Gold marts, and reproducible Docker-based local execution.

## Links

- Repository: Planned
- Dashboard: Planned Metabase local dashboard
