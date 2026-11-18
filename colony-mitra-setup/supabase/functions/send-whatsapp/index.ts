// कॉलोनी मित्र — send a maintenance receipt / reminder on WhatsApp through the
// official WhatsApp Business Cloud API (Meta). Only a colony admin can call it.
//
// Secrets to set in Supabase → Edge Functions → send-whatsapp → Secrets:
//   WA_TOKEN          permanent access token from Meta (System User token)
//   WA_PHONE_ID       "Phone number ID" from Meta → WhatsApp → API Setup
//   WA_LANG           template language code, default "hi"
//   WA_TPL_RECEIPT    template name for receipts,  default "cs_receipt"
//   WA_TPL_REMINDER   template name for reminders, default "cs_reminder"
// SUPABASE_URL and SUPABASE_ANON_KEY are provided by Supabase automatically.
import { createClient } from "npm:@supabase/supabase-js@2.117.2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json(405, { error: "POST only" });
  try {
    const auth = req.headers.get("Authorization") ?? "";
    if (!auth.startsWith("Bearer ")) return json(401, { error: "login required" });
    const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: auth } },
    });
    const { colony_id, to, kind, params } = await req.json();
    if (!colony_id || !/^91\d{10}$/.test(String(to)) || !["receipt", "reminder"].includes(kind) || !Array.isArray(params)) {
      return json(400, { error: "bad request" });
    }
    const { data: role, error: roleErr } = await sb.rpc("cs_role", { c: colony_id });
    if (roleErr || role !== "admin") return json(403, { error: "only colony admins can send" });

    const token = Deno.env.get("WA_TOKEN"), phoneId = Deno.env.get("WA_PHONE_ID");
    if (!token || !phoneId) return json(500, { error: "WhatsApp API secrets are not set" });
    const template = kind === "receipt"
      ? (Deno.env.get("WA_TPL_RECEIPT") ?? "cs_receipt")
      : (Deno.env.get("WA_TPL_REMINDER") ?? "cs_reminder");
    const body = {
      messaging_product: "whatsapp",
      to: String(to),
      type: "template",
      template: {
        name: template,
        language: { code: Deno.env.get("WA_LANG") ?? "hi" },
        components: [{
          type: "body",
          parameters: params.slice(0, 6).map((p: unknown) => ({ type: "text", text: String(p ?? "").slice(0, 200) || "-" })),
        }],
      },
    };
    const r = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const out = await r.json();
    if (!r.ok) return json(502, { error: "whatsapp api error", detail: out?.error?.message ?? out });
    return json(200, { ok: true, id: out?.messages?.[0]?.id ?? null });
  } catch (e) {
    return json(500, { error: e instanceof Error ? e.message : String(e) });
  }
});
