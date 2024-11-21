declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'
declare module '*.scss'
declare module '*.css'
declare module "*.module.scss" {
  const styles: { readonly [key: string]: string };
  export default styles;
}
declare module "*.module.css" {
  const styles: { readonly [key: string]: string };
  export default styles;
}
