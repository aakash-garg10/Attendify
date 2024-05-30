"use client";
import { Button } from "@/components/ui/button";
//you have to watch docs to see how to setup KINDE authentication in a project
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/adduser?userid=1&grade=A");
  const data = await res.json();
  return data;
};

export default function Home() {
  //this redirect ensure that the user is redirected to the dashboard(login) page instead of the localhost:3000
  useEffect(() => {
    redirect("/api/auth/login?post_login_redirect_url=/dashboard");
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
  );
}
