"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { EThemeType } from "../enums/theme.enum";
import { Button } from "@/_core/components/ui/button";

export function AppToggleTheme() {
  const { setTheme, theme } = useTheme();

  if (theme === EThemeType.light) {
    return (
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full relative"
        onClick={() => setTheme(EThemeType.dark)}
      >
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      </Button>
    );
  } else {
    return (
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full relative"
        onClick={() => setTheme(EThemeType.light)}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
      </Button>
    );
  }
}
