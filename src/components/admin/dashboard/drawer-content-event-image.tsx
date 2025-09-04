import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

type DrawerContentEventImageProps = {
  image: string;
};

function DrawerContentEventImage({ image }: DrawerContentEventImageProps) {
  return (
    <Card className="flex flex-col gap-2">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-4">
          <ImageIcon className="h-8 w-8 text-blue-600" />
          Event Image
        </CardTitle>
      </CardHeader>

      <Separator />

      <CardContent className="relative overflow-hidden flex justify-center pt-4">
        <Image
          width={500}
          height={500}
          src={image}
          alt="Campaign"
          className="w-3/5 object-cover rounded-xl"
        />
      </CardContent>
    </Card>
  );
}

export default DrawerContentEventImage;
