
import Nav from "../components/nav";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Nav />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">About Us</h1>
        <p className="text-zinc-400 text-sm">The day we become lover : 22 Apr 2026</p>
      </main>
    </div>
  );
}