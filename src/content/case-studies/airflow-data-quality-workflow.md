---
title: "Airflow Data Quality Workflow"
summary: "Draft case study for an orchestrated workflow that separates extraction, transformation, validation, and publish steps."
projectSlug: "airflow-data-quality-workflow"
status: "Draft content"
techStack:
  - Airflow
  - Python
  - SQL
  - Docker
  - PostgreSQL
---

## Problem

Data pipelines need scheduling, task dependencies, failure visibility, and quality checks before downstream users rely on output tables.

## Data Sources

- API extracts
- Warehouse tables
- Validation rules
- Pipeline run metadata

## Architecture

Scheduled DAG -> extraction task -> staging load -> transformations -> data quality checks -> publish task -> notification.

## Pipeline Design

The workflow uses separate tasks for extraction, loading, transformation, and validation. Quality checks run before the publish step so failed checks can stop downstream tables from being refreshed incorrectly.

## Data Model

- `raw_api_events`
- `stg_api_events`
- `dq_check_results`
- `mart_valid_events`

## Data Quality Checks

- Freshness checks
- Schema validation
- Null-rate thresholds
- Duplicate detection
- Failed-check logging

## Challenges

The main challenge is making failures visible and actionable. Validation output should identify the failed rule, affected table, run time, and severity.

## Outcome

This project demonstrates a maintainable orchestration pattern for reliable batch workflows. Replace this draft with a real DAG screenshot, failure handling notes, and repository links.

## Links

- GitHub: TODO
- Architecture diagram: TODO
