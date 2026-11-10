-- Pocket Prompts: an optional Acknowledgement shown on each prompt's card.
-- Run once in the Supabase SQL editor, before the code that uses it goes live.
alter table public.pocket_prompts add column if not exists acknowledgement text;
