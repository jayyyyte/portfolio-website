---
title: "dbt Analytics Warehouse"
summary: "Draft case study for transforming raw warehouse tables into tested staging, intermediate, and mart models with dbt."
projectSlug: "dbt-analytics-warehouse"
status: "Draft content"
techStack:
  - dbt
  - SQL
  - BigQuery
  - Git
---

## Problem

Analytics work becomes slow and inconsistent when every dashboard or notebook repeats its own transformation logic. The project models raw source tables into reusable warehouse layers.

## Data Sources

- Application events
- Account records
- Subscription records
- Warehouse source tables

## Architecture

Raw warehouse tables -> dbt staging models -> intermediate business logic -> fact and mart models -> analytics queries.

## Pipeline Design

Staging models standardize names, cast data types, and document source assumptions. Intermediate models apply business logic such as active account definitions. Mart models expose clean tables for product usage and account activity analysis.

## Data Model

- `stg_events`
- `stg_accounts`
- `int_active_accounts`
- `fact_events`
- `mart_account_activity`

## Data Quality Checks

- Unique tests on primary keys
- Not-null tests on required identifiers
- Accepted values tests for event types
- Relationship tests between fact and dimension models
- Freshness checks for source tables

## Challenges

The main modeling challenge is separating source cleanup from business logic so each layer remains readable and easy to test.

## Outcome

This project demonstrates how dbt can turn raw source tables into documented, tested, analytics-ready models. Replace this draft with project-specific sources, SQL examples, lineage screenshots, and repository links.

## Links

- GitHub: TODO
- dbt docs: TODO
