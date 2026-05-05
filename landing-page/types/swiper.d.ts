// src/types/swiper.d.ts

declare module "swiper/css" {
  const content: any;
  export default content;
}

declare module "swiper/css/pagination" {
  const content: any;
  export default content;
}

declare module "swiper/css/navigation" {
  const content: any;
  export default content;
}

declare module "swiper/css/effect-fade" {
  const content: any;
  export default content;
}

declare module "swiper/modules" {
  export const Autoplay: any;
  export const Pagination: any;
  export const Navigation: any;
  export const EffectFade: any;
}