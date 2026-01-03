const base = "/api";

async function request(path, options = {}) {
  const res = await fetch(`${base}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const fetchPortfolio = () => request("/portfolio");
export const fetchSkills = () => request("/skills");
export const fetchTestimonials = () => request("/testimonials");
export const sendContact = (payload) =>
  request("/contact", { method: "POST", body: JSON.stringify(payload) });
