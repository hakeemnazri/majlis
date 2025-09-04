"use client";

import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DrawerContentEventImage from "./drawer-content-event-image";
import DrawerContentDonationTarget from "./drawer-content-donation-target";
import DrawerContentEventDetails from "./drawer-content-event-details";
import DrawerContentEventDescription from "./drawer-content-event-description";
import DrawerContentSurveyQuestions from "./drawer-content-survey-questions";
import { TEventPayload } from "@/lib/types";
import DrawerContentEventTickets from "./drawer-content-event-tickets";

type TableCellViewerProps = {
  item: TEventPayload;
};

function TableCellViewer({ item }: TableCellViewerProps) {
  const isMobile = useIsMobile();
  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.title}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="rounded-tl-2xl rounded-bl-2xl data-[vaul-drawer-direction=right]:sm:max-w-xl">
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.title}</DrawerTitle>
          <DrawerDescription>Showing details of event</DrawerDescription>
        </DrawerHeader>

        <Separator />

        <section className="h-600 overflow-y-auto p-6 space-y-6">
          {/* Image */}
          <DrawerContentEventImage image={item.mainImage} />

          {/* Donations if its exist */}
          <DrawerContentDonationTarget
            current={item?.currentDonation}
            target={item?.targetDonation}
          />

          {/* Details */}
          <DrawerContentEventDetails details={item} />

          {/* Tickets */}
          <DrawerContentEventTickets tickets={item.tickets}/>

          {/* Survey Questions */}
          <DrawerContentSurveyQuestions survey={item.survey} />

          {/* Description */}
          <DrawerContentEventDescription description={item.description} />
        </section>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default TableCellViewer;
