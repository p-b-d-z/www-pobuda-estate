import { businessData, colors } from "./data";

const copper = colors.copper.DEFAULT;
const copperLight = colors.copper.light;
const copperDark = colors.copper.dark;
const creme = colors.creme.DEFAULT;
const cremeLight = colors.creme.light;

function renderHTML(): string {
  const servicesHTML = businessData.services
    .map(
      (service) => `
    <div class="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow border-2" style="border-color: ${creme};">
      <div class="text-4xl mb-4">${service.icon}</div>
      <h3 class="text-xl font-semibold mb-2" style="color: ${copper};">${service.title}</h3>
      <p class="text-gray-600">${service.description}</p>
    </div>
  `
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${businessData.name}</title>
  <meta name="description" content="${businessData.description}">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            copper: {
              light: '${copperLight}',
              DEFAULT: '${copper}',
              dark: '${copperDark}'
            },
            creme: {
              light: '${cremeLight}',
              DEFAULT: '${creme}',
              dark: '#e8d4a8'
            }
          }
        }
      }
    }
  </script>
  <style>
    body { background-color: ${cremeLight}; }
  </style>
</head>
<body class="min-h-screen">
  <header class="py-4" style="background-color: ${copper};">
    <div class="container mx-auto px-4 flex items-center gap-4">
      <img src="https://images.pobuda.estate/logo.png" alt="${businessData.name}" class="h-16 w-auto">
      <div>
        <h1 class="text-2xl font-bold text-white">${businessData.name}</h1>
        <p class="text-creme-light text-sm mt-1">${businessData.tagline}</p>
        <p class="text-creme-light text-xs mt-1 opacity-80">${businessData.tagline2}</p>
      </div>
    </div>
  </header>

  <main>

    <section class="py-12" style="background-color: ${creme};">
      <div class="container mx-auto px-4">
        <h2 class="text-2xl font-bold text-center mb-8" style="color: ${copperDark};">Our Services</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          ${servicesHTML}
        </div>
      </div>
    </section>

    <section class="py-12 container mx-auto px-4">
      <h2 class="text-2xl font-bold text-center mb-8" style="color: ${copperDark};">Contact Us</h2>
      <div class="max-w-md mx-auto bg-white rounded-lg p-8 shadow-md" style="border-color: ${copper}; border: 2px solid;">
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">📧</span>
            <a href="mailto:${businessData.contact.email}" class="text-gray-700 hover:text-copper transition-colors">${businessData.contact.email}</a>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-2xl">📞</span>
            <a href="tel:${businessData.contact.phone}" class="text-gray-700 hover:text-copper transition-colors">${businessData.contact.phone}</a>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="py-6 text-center text-white" style="background-color: ${copperDark};">
    <p>&copy; ${new Date().getFullYear()} ${businessData.name}. All rights reserved.</p>
  </footer>
</body>
</html>`;
}

// npm install --save-dev typescript @cloudflare/workers-types
export default {
  async fetch(request: Request): Promise<Response> {
    const html = renderHTML();
    return new Response(html, {
      headers: {
        "Content-Type": "text/html;charset=UTF-8",
      },
    });
  },
};
