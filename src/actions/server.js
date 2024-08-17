"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const login = async (formData) => {
  const user = { email: formData.get("email") };

  const expiresIn = new Date(Date.now() + 1000 * 60 * 60);

  cookies().set("session", JSON.stringify(user), {
    expires: expiresIn,
    httpOnly: true,
    path: "/",
  });
  redirect("/")
};


export const logout = async ()=>{
    cookies().set("session","", {expires: new Date(0)})
}

export const getSession = () => {
  const cookieStore = cookies(); 
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) {
    console.log("No session found");
    return null
  }

  const user = JSON.parse(sessionCookie);
  console.log("User session data:", user);

  return  user;
};
