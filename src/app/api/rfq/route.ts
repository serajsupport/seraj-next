import { NextResponse } from "next/server";
import { PRODUCTS } from "@/data/products";

const MAX_BODY_BYTES = 10_000;

const LIMITS: Record<string, number> = {
  name: 120,
  company: 160,
  email: 200,
  phone: 40,
  country: 80,
  product: 40,
  quantity: 120,
  message: 3000,
};

const REQUIRED = ["name", "company", "email"];
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PRODUCT_SLUGS = new Set(PRODUCTS.map((p) => p.slug));

function reject(status: number) {
  return NextResponse.json({ ok: false }, { status });
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.includes("application/json")) return reject(415);

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return reject(413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return reject(400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return reject(400);
  const input = body as Record<string, unknown>;

  // Hidden field real visitors never fill; bots that fill every input get a fake success.
  if (typeof input.website === "string" && input.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const inquiry: Record<string, string> = {};
  for (const [field, max] of Object.entries(LIMITS)) {
    const value = input[field];
    if (value === undefined || value === null || value === "") continue;
    if (typeof value !== "string") return reject(400);
    const clean = value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
    if (clean.length > max) return reject(400);
    if (clean) inquiry[field] = clean;
  }

  if (REQUIRED.some((field) => !inquiry[field])) return reject(400);
  if (!EMAIL.test(inquiry.email)) return reject(400);
  if (inquiry.product && !PRODUCT_SLUGS.has(inquiry.product)) return reject(400);

  // Wire this up to your existing inquiry handling (email, CRM, etc.).
  console.log("RFQ inquiry received:", JSON.stringify(inquiry));

  return NextResponse.json({ ok: true });
}
