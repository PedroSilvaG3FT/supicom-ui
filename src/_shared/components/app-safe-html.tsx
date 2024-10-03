import React from "react";

interface IProps {
  html: string;
  className?: string;
}

export default function AppSafeHTML(props: IProps) {
  const { className, html } = props;
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}
