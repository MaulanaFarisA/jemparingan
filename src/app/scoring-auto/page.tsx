import React from "react";
import FloatingNav from "@/components/lib/ui/FloatingNav";
import ScoringHeader from "@/components/lib/ui/ScoringHeader";
import Container from "@/components/lib/ui/container";

export default function SkoringPage() {
  return (
    <Container className="w-[414px] h-screen !p-0 !m-0">

      <ScoringHeader userName="Maulana" round={1} />

      <FloatingNav />

    </Container>
  );
}