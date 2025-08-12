export function negotiator({ headers }) {
  return (headers instanceof Headers ? headers.get("Accept-Language") : headers["Accept-Language"])?.split(",");
}
