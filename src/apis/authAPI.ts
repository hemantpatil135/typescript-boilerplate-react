// Simulated login call: resolves after 1s. Replace with a real request
// when wiring up a backend.
const DEMO_EMAIL = "admin@gmail.com";
const DEMO_PASSWORD = "admin@123";

export const userLogin = (email: string, password: string): Promise<boolean> =>
  new Promise((resolve) => {
    setTimeout(() => resolve(email === DEMO_EMAIL && password === DEMO_PASSWORD), 1000);
  });
