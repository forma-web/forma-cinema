export default defineNuxtRouteMiddleware(async ({ name }) => {
  const isAuth = await getJWTToken();

  if (name === 'login' || name === 'register') {
    if (isAuth) return navigateTo('/');
  } else {
    if (!isAuth) return navigateTo('/login');
  }
});
