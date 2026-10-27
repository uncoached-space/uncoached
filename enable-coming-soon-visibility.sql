-- ============================================================================
-- Show "coming soon" guided shifts (with a Soon badge) instead of hiding them.
--
-- The member Guided Shifts page already renders is_active=false rows as
-- "coming-soon", but the previous read policy (USING is_active = true) hid those
-- rows from everyone except admins — so marking a track "Soon" made it vanish.
-- Coming-soon rows have only a title (no audio), so exposing them is safe.
--
-- Run in the Supabase SQL editor.
-- ============================================================================

DROP POLICY IF EXISTS "Public can view active guided shifts" ON public.guided_shifts;

CREATE POLICY "Public can view guided shifts"
    ON public.guided_shifts
    FOR SELECT
    USING (true);
