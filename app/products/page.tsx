"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ProductsSection from "@/components/ProductCards/ProductCards";


export default function ProductsPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/products/1");
  };

  return (
    <div>
      <ProductsSection />
    </div>
  );
}