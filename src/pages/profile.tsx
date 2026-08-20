
import Nav from "../components/nav";

export default function Profile() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <Nav />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="text-zinc-400 text-sm">Name: Mg Mg</p>
        <p className="text-zinc-400 text-sm">Email: mgmg7@example.com</p>
      </main>
    </div>
  );
}