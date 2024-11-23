export interface IShowToastOptions {
  title?: string;
  icon?: 'success' | 'loading' | 'error' | 'none';
  image?: string;
  duration?: number;
  position?: 'top' | 'center' | 'bottom';
  mask?: boolean;
}

export interface ILoadingOptions {
  show?: (content?: string) => void;
  hide?: () => void;
}

export interface IShowModalOptions {
  title?: string;
  content?: string;
  showCancel?: boolean;
  cancelText?: string;
  cancelColor?: string;
  confirmText?: string;
  confirmColor?: string;
  editable?: boolean;
  placeholderText?: string;
}
