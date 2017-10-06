export const showMenu = menu => ({
  type: 'SHOW_MENU',
  menu,
});

export const hideMenu = menu => ({
  type: 'HIDE_MENU',
  menu,
});

export const activateSubmenu = submenu => ({
  type: 'ACTIVATE_SUBMENU',
  submenu,
});

export const closeSubmenu = submenu => ({
  type: 'CLOSE_SUBMENU',
  submenu,
});
