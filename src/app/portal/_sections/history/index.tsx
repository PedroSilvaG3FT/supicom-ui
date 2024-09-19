import React from "react";
import Each from "@/_shared/components/app-each";
import PortalHistoryCard from "./portal-history-card";

export default function PortalHistory() {
  const items = [
    {
      title: `Desde 1994 no mercado`,
      imageURL: `/images/mockup.jpg`,
      className: `col-span-1 lg:col-span-4 border-b lg:border-r`,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry`,
    },
    {
      title: `Lorem Ipsum is simply dummy`,
      imageURL: `/images/mockup.jpg`,
      className: `border-b col-span-1 lg:col-span-2`,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry`,
    },
    {
      title: `Lorem Ipsum is simply dummy`,
      imageURL: `/images/mockup.jpg`,
      className: `col-span-1 lg:col-span-3 lg:border-r `,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry`,
    },
    {
      title: `Lorem Ipsum is simply dummy`,
      imageURL: `/images/mockup.jpg`,
      className: `col-span-1 lg:col-span-3 lg:border-r `,
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry`,
    },
  ];

  return (
    <section className="app-container">
      <div className="grid grid-cols-1 lg:grid-cols-6 xl:border rounded-md">
        <Each
          data={items}
          render={(item) => (
            <PortalHistoryCard
              title={item.title}
              imageURL={item.imageURL}
              className={item.className}
              description={item.description}
            />
          )}
        />
      </div>
    </section>
  );
}
