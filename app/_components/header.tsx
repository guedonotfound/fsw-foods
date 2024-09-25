"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const { data } = useSession();

  const handleHomeClick = () => router.push("/");

  const handleSightInClick = () => signIn();
  const handleSightOutClick = () => signOut();

  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href="/">
        <div className="relative h-[30px] w-[100px]">
          <Image src="/logo.png" alt="FSW Foods" fill />
        </div>
      </Link>
      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
          {data?.user ? (
            <div className="flex items-center gap-3 pt-6">
              <Avatar>
                <AvatarImage src={data.user.image as string | undefined} />
              </Avatar>
              <div>
                <h3>{data.user.name}</h3>
                <span className="block text-xs text-muted-foreground">
                  {data.user.email}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-6">
              <h2 className="font-semibold">Olá, faça seu login!</h2>
              <Button size="icon" onClick={handleSightInClick}>
                <LogInIcon />
              </Button>
            </div>
          )}

          <div className="py-6">
            <Separator />
          </div>
          <div className="space-y-2">
            <Button
              className="w-full justify-start gap-3 rounded-full text-sm font-normal"
              onClick={handleHomeClick}
            >
              <HomeIcon size={16} />
              <span className="block">Início</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 rounded-full text-sm font-normal"
              asChild
            >
              <Link href="/my-orders">
                <ScrollTextIcon size={16} />
                <span className="block">Meus pedidos</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 rounded-full text-sm font-normal"
              asChild
            >
              <Link href="/my-favorite-restaurants">
                <HeartIcon size={16} />
                <span className="block">Restaurantes favoritos</span>
              </Link>
            </Button>
          </div>
          <div className="py-6">
            <Separator />
          </div>

          {data?.user && (
            <Button
              variant="outline"
              className="w-full justify-start gap-3 rounded-full text-sm font-normal"
              onClick={handleSightOutClick}
            >
              <LogOutIcon size={16} />
              <span>Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
