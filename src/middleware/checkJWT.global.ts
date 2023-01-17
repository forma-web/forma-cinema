export default defineNuxtRouteMiddleware(({ name }) => {
  const isAuth = !!localStorage.getItem('token');

  if (name === 'login' || name === 'register') {
    if (isAuth) return navigateTo('/');
  } else {
    if (!isAuth) return navigateTo('/login');
  }
});
