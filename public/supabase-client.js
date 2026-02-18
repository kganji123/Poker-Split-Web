<!-- supabase-client.js -->
<script>
/**
 * PokerSplit Supabase Client
 * Requires:
 *  1) https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2 loaded BEFORE this file
 *  2) supabase-config.js loaded BEFORE this file (sets window.__SUPABASE_URL__ and __SUPABASE_ANON_KEY__)
 */

(function () {
  const URL = window.__SUPABASE_URL__;
  const ANON = window.__SUPABASE_ANON_KEY__;

  if (!URL || !ANON) {
    console.error("Missing Supabase config. Check supabase-config.js");
    return;
  }
  if (!window.supabase || !window.supabase.createClient) {
    console.error("Supabase CDN not loaded. Add supabase-js@2 script before this file.");
    return;
  }

  // Create and expose client
  window.__SUPABASE__ = window.supabase.createClient(URL, ANON);

  // Helpers
  window.PS = window.PS || {};
  window.PS.supabase = window.__SUPABASE__;

  window.PS.getUser = async function () {
    const { data, error } = await window.__SUPABASE__.auth.getUser();
    if (error) return null;
    return data.user || null;
  };

  window.PS.signInWithGoogle = async function () {
    // IMPORTANT: For GitHub Pages, set redirectTo to your GitHub Pages URL.
    // Example: https://kganj123.github.io/Poker-Split-Web/
    const redirectTo = window.location.origin + window.location.pathname;

    return await window.__SUPABASE__.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo }
    });
  };

  window.PS.signOut = async function () {
    return await window.__SUPABASE__.auth.signOut();
  };

  // Optional: listen to login/logout
  window.__SUPABASE__.auth.onAuthStateChange((event, session) => {
    console.log("Auth event:", event);
    window.PS.session = session || null;
  });

  console.log("✅ Supabase client ready");
})();
</script>
