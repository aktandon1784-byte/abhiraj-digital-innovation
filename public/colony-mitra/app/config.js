/* =====================================================================
   कॉलोनी मित्र · सेटिंग्स — सिर्फ़ यही फ़ाइल बदलनी है।
   सेटअप गाइड के "स्टेप 3" में बताया है कि ये चीज़ें कहाँ मिलेंगी।
   ===================================================================== */
window.CS_CONFIG = {
  // Supabase → Project Settings → API (या "Connect" बटन) से कॉपी करें
  SUPABASE_URL: "https://YOUR-PROJECT.supabase.co",
  SUPABASE_ANON_KEY: "YOUR-ANON-PUBLIC-KEY",

  APP_NAME: "कॉलोनी मित्र",
  COMPANY: "अभिराज डिजिटल",

  // मदद के लिए आपका नंबर (91 + 10 अंक), जैसे "919876543210"
  SUPPORT_WHATSAPP: "",
  SUPPORT_PHONE: "",

  // लॉगिन के तरीके। जो चालू नहीं किया, उसे हटा दें।
  //  "phone_sms"      = मोबाइल पर SMS OTP          (Supabase में Phone + Twilio चालू करें)
  //  "phone_whatsapp" = मोबाइल पर WhatsApp OTP     (Twilio Verify में WhatsApp चालू करें)
  //  "email"          = ईमेल पर OTP (मुफ़्त)
  LOGIN_METHODS: ["phone_sms", "phone_whatsapp", "email"],
  OTP_LENGTH: 6,

  // WhatsApp Business API से अपने आप रसीद/रिमाइंडर भेजना (स्टेप 6 पूरा करने के बाद true करें)
  WHATSAPP_API: false
};
