---
title: "Batch Sales Analytics Pipeline"
summary: "Draft case study for a batch ETL pipeline that turns raw sales exports into validated revenue metrics and dimensional tables."
projectSlug: "batch-sales-analytics-pipeline"
status: "Draft content"
techStack:
  - Python
  - SQL
  - PostgreSQL
  - Docker
---

## Problem

Raw transaction exports are difficult to use directly for reporting because field names, data types, duplicate records, and missing reference data can change between files.

## Data Sources

- Transaction CSV exports
- Product reference data
- Customer reference data
- Daily file drops

## Architecture

Raw files -> ingestion -> staging tables -> validation -> dimensional transformations -> revenue mart.

## Pipeline Design

The pipeline loads raw files into staging tables, validates required columns, converts types, removes duplicate orders, and joins customer and product reference data. The transformed layer produces a fact table for orders and dimensions for customers and products.

## Data Model

- `stg_transactions`
- `dim_customer`
- `dim_product`
- `fact_orders`
- `mart_daily_revenue`

## Data Quality Checks

- Required fields are not null
- Order IDs are unique
- Product and customer IDs match reference tables
- Daily row counts are recorded

## Challenges

The main challenge is keeping the pipeline stable when raw files contain missing values, duplicate records, or unexpected product codes.

## Outcome

This project produces a documented batch pipeline and an analytics-ready revenue mart. Replace this draft with real repository links, dataset details, run logs, and measured outputs.

## Links

- GitHub: TODO
- Demo: TODO
