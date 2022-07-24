import { Position, Toaster } from '@blueprintjs/core';

/** Singleton toaster instance. Create separate instances for different options. */
const AppToaster = Toaster.create({
  className: 'recipe-toaster',
  position: Position.TOP,
});
export const ToastNotice = (message: string) => {
  AppToaster.show({ message: message });
  const idSetimeout = setTimeout(() => {
    AppToaster.clear();
    clearTimeout(idSetimeout);
  }, 3000);
};
