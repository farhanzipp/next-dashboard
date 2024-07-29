import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
     <h1>HOME</h1>
     <Link href="/login">
      <Button>
        Login
      </Button>
     </Link>
    </main>
  );
}
