import type { MouseEvent } from "react";
export const changeTheme = (event: MouseEvent, themeValue: 'dark' | 'light') => {
  const x = event.clientX;
  const y = event.clientY;
  
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  if (!document.startViewTransition) {
    document.documentElement.setAttribute('data-theme', themeValue);
    return;
  }

  // 在切换前设置正确的 z-index
  const style = document.createElement('style');
  if (themeValue === 'light') {
    style.textContent = `
      ::view-transition-old(root) { z-index: 1; }
      ::view-transition-new(root) { z-index: 9999; }
    `;
  } else {
    style.textContent = `
      ::view-transition-old(root) { z-index: 9999; }
      ::view-transition-new(root) { z-index: 1; }
    `;
  }
  document.head.appendChild(style);

  const transition = document.startViewTransition(() => {
    document.documentElement.setAttribute('data-theme', themeValue);
  });

  transition.ready.then(() => {
    const clipPath = themeValue === 'light' 
      ? [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`
        ]
      : [
          `circle(${endRadius}px at ${x}px ${y}px)`,
          `circle(0px at ${x}px ${y}px)`
        ];
    
    document.documentElement.animate(
      {
        clipPath: clipPath,
      },
      {
        duration: 450,
        easing: 'ease-out',
        pseudoElement: themeValue === 'light' 
          ? '::view-transition-new(root)'
          : '::view-transition-old(root)',
      }
    );
  });

  // 动画结束后清理样式
  transition.finished.then(() => {
    document.head.removeChild(style);
  });
};
export const AntDarkTheme = {
  Menu: {
    itemBg: '#36363a',
    itemColor: '#cccccc',
    itemHoverBg: 'rgba(255, 255, 255, 0.1)',
    itemHoverColor: '#ffffff',
    itemActiveBg: 'rgba(222, 255, 255, 0.1)',
    itemSelectedBg: 'rgba(255, 255, 255, 0.1)',
    itemSelectedColor: '#ffffff',
    colorFillAlter: '#36363a',
    collapsedIconSize: 20,
    popupBg: '#36363a'
  }
}
export const AntLightTheme = {
  Menu: {
    itemBg: '#ffffff',
    itemColor: '#cccccc',
    itemHoverBg: 'rgb(22, 119, 255, .1)',
    itemHoverColor: '#1677ff',
    colorFillAlter: '#ffffff',
    collapsedIconSize: 20,
    popupBg: '#ffffff'
  }
}