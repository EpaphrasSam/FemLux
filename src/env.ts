const env = {
  resend: {
    apiKey: String(process.env.RESEND_API_KEY),
  },
  supabase: {
    url: String(process.env.SUPABASE_URL),
    anonKey: String(process.env.SUPABASE_ANON_KEY),
    secretRole: String(process.env.SUPABASE_SECRET_ROLE),
    jwtSecret: String(process.env.SUPABASE_JWT_SECRET),
  },
  buckets: {
    products: String(process.env.NEXT_PUBLIC_PRODUCT_IMAGES_BUCKET),
    categories: String(process.env.NEXT_PUBLIC_CATEGORIES_IMAGES_BUCKET),
    users: String(process.env.NEXT_PUBLIC_USER_AVATARS_BUCKET),
  },
  paystack: {
    publicKey: String(process.env.PAYSTACK_PUBLIC_KEY),
    secretKey: String(process.env.PAYSTACK_SECRET_KEY),
  },
} as const;

// Type assertions to ensure all environment variables are defined
const assertEnvVar = (value: string | undefined, name: string): string => {
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
};

(() => {
  assertEnvVar(env.resend.apiKey, "RESEND_API_KEY");
  assertEnvVar(env.supabase.url, "SUPABASE_URL");
  assertEnvVar(env.supabase.anonKey, "SUPABASE_ANON_KEY");
  assertEnvVar(env.supabase.secretRole, "SUPABASE_SECRET_ROLE");
  assertEnvVar(env.supabase.jwtSecret, "SUPABASE_JWT_SECRET");
  assertEnvVar(env.buckets.products, "PRODUCTS_BUCKET");
  assertEnvVar(env.buckets.categories, "CATEGORIES_IMAGES_BUCKET");
  assertEnvVar(env.buckets.users, "USERS_AVATARS_BUCKET");
  assertEnvVar(env.paystack.publicKey, "PAYSTACK_PUBLIC_KEY");
  assertEnvVar(env.paystack.secretKey, "PAYSTACK_SECRET_KEY");
})();

export default env;
