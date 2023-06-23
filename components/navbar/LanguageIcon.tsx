"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useLocale from "../custom_hooks/useLocale";

const LanguageIcon = ({ nextLanguage, currentLanguage } : any) => {
  const { changeLocaleTo } = useLocale(currentLanguage);
  const currentPath = usePathname();
  const newPath = changeLocaleTo(currentPath, nextLanguage.languageCode);

  return <Link href={newPath}><Image src={`/${nextLanguage.languageCode}.png`} width={30} height={30} alt={"Change language to " + nextLanguage.name} style={{marginLeft: "5px"}} /></Link>;
}

export default LanguageIcon;