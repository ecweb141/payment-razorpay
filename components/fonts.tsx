import { Poppins, Josefin_Sans, Open_Sans, Roboto } from "next/font/google";

export const fontPoppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["devanagari"],
});
export const FontJosefin_Sans = Josefin_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
export const FontOpen_Sans = Open_Sans({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
export const FontRoboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});
