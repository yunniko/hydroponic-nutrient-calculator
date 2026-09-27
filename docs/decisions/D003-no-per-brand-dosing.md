# D003 · No per-brand ml-per-litre dosing tables
Date: 2026-09-11 · Goal: G-001 · Status: active
Context: Brand concentrations change by product line and couldn't be sourced reliably for several brands.
Decision: The dosing calculator covers brand-agnostic chemistry only: baseline correction and mass-balance dilution.
Rejected: per-brand tables without cited sources.
Consequence: Adding a brand needs a cited concentration per product.
Evidence: `lib/nutrient-dosing-calculator.ts` header.
