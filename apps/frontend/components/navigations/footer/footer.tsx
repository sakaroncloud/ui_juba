import React from "react";
import { AboutWidget } from "./widgets/about-widget";
import { WidgetLinkItems } from "./widgets/widget-link-items";

import { PaymentMethodWidget } from "./widgets/payment-method-widget";


const Footer = async () => {



  return (
    <footer className=" shadow-xl border border-slate-100">
      <div className="container py-24 flex items-start flex-wrap lg:gap-10 gap-8 lg:justify-between">
        <AboutWidget
          className="sm:w-[340px]"
          description={"Company description"}
        />
        <WidgetLinkItems
          navItems={[
            {
              title: "Company",
              href: "/",
            },
            {
              title: "Contact Us",
              href: "/",
            },
            {
              title: "Available in",
              href: "/",
            },
            {
              title: "Legal",
              href: "/",
            }
          ]}
          widgetTitle="Company"
        />
        <div className="space-y-8">
          <WidgetLinkItems
            navItems={[
              {
                title: "Company",
                href: "/",
              },
              {
                title: "Contact Us",
                href: "/",
              },
              {
                title: "Available in",
                href: "/",
              },
              {
                title: "Legal",
                href: "/",
              }
            ]}
            widgetTitle="Contact Us"
          />
        </div>
        <WidgetLinkItems
          navItems={[
            {
              title: "Company",
              href: "/",
            },
            {
              title: "Contact Us",
              href: "/",
            },
            {
              title: "Available in",
              href: "/",
            },
            {
              title: "Legal",
              href: "/",
            }
          ]}
          widgetTitle="Available in"
        />
        <WidgetLinkItems navItems={[
          {
            title: "Company",
            href: "/",
          },
          {
            title: "Contact Us",
            href: "/",
          },
          {
            title: "Available in",
            href: "/",
          },
          {
            title: "Legal",
            href: "/",
          }
        ]} widgetTitle="Legal" />
      </div>
      <div className="bg-slate-100 shadow-md">
        <div className="container flex md:items-center md:flex-row flex-col justify-between md:gap-6 gap-2 py-3 text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Huba Hospitality. All rights
            reserved
          </p>
          <PaymentMethodWidget />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
