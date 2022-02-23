import supabase from "../supabase";
import { Observable, Observer } from "rxjs";

export function onLoginStateChange(): Observable<boolean> {
  return new Observable((observer: Observer<boolean>) => {
    const user = supabase.auth.user();

    observer.next(Boolean(user));

    supabase.auth.onAuthStateChange((event) => {
      observer.next(event !== "SIGNED_OUT");
    });
  });
}

export async function login(email: string, password: string): Promise<void> {
  const { error } = await supabase.auth.signIn({ email, password });

  if (error) {
    throw error;
  }
}

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}
