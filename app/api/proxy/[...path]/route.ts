import type { NextRequest } from "next/server"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

function joinUrl(base: string, segments: string[]) {
  return [base.replace(/\/+$/, ""), segments.join("/")].join("/")
}

async function handle(req: NextRequest, params: { path: string[] }) {
  if (!API_BASE) {
    return new Response("Backend base URL is not configured (NEXT_PUBLIC_API_BASE)", { status: 502 })
  }
  const targetUrl = joinUrl(API_BASE, params.path)
  const init: RequestInit = {
    method: req.method,
    headers: new Headers(
      Array.from(req.headers.entries()).filter(
        ([k]) => !["host", "content-length", "connection"].includes(k.toLowerCase()),
      ),
    ),
    body: ["GET", "HEAD"].includes(req.method) ? undefined : await req.arrayBuffer(),
    redirect: "manual",
    cache: "no-store",
  }

  const res = await fetch(targetUrl, init)
  const resHeaders = new Headers(res.headers)
  // Strip hop-by-hop and security-sensitive headers
  ;["content-encoding", "transfer-encoding", "connection", "keep-alive"].forEach((h) => resHeaders.delete(h))

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: resHeaders,
  })
}

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  return handle(req, params)
}
export async function POST(req: NextRequest, { params }: { params: { path: string[] } }) {
  return handle(req, params)
}
export async function PUT(req: NextRequest, { params }: { params: { path: string[] } }) {
  return handle(req, params)
}
export async function PATCH(req: NextRequest, { params }: { params: { path: string[] } }) {
  return handle(req, params)
}
export async function DELETE(req: NextRequest, { params }: { params: { path: string[] } }) {
  return handle(req, params)
}
