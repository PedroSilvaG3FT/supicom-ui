"use client";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/_core/components/fragments/dropdown-menu";

import { Languages } from "lucide-react";
import { ELanguage } from "../enums/language.enum";
import { LanguageUtil } from "../utils/language.util";
import { Button } from "@/_core/components/fragments/button";

export default function AppToggleLanguage() {
  const handleSelect = (value: ELanguage) => {
    LanguageUtil.set(value);
    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Languages />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={() => handleSelect(ELanguage.EN)}>
          {ELanguage.EN}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSelect(ELanguage.ES)}>
          {ELanguage.ES}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSelect(ELanguage.PT_BR)}>
          {ELanguage.PT_BR}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
