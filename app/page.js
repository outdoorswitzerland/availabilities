import Link from "next/link";
import { Button } from "./components/button/button";

export default function Home() {
  return (
    <main className="flex flex-col p-10">
      <div className="text-xl font-bold">OUTDOOR Availabilities</div>
      <div className="">Displays current day availabilities.</div>
      <div className="flex flex-wrap gap-4 my-10">
        <Link href="/jetboat">
          <Button>Jetboat</Button>
        </Link>
        <Link href="/canyonswinginterlaken">
          <Button>Canyon Swing (Interlaken)</Button>
        </Link>
        <Link href="/canyonswinggrindelwald">
          <Button>Canyon Swing (Grindelwald)</Button>
        </Link>
      </div>
    </main>
  );
}
