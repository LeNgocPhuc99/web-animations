import { Link } from "react-router";

import { navLinkClass } from "~/styles/classes";

import { cn } from "~/lib/utils";

export type NavbarLink = readonly [id: string, label: string];

const Navbar = ({
  logo = "Animation Labs",
  logoColor = "bg-primary",
  links = [],
}: {
  logo?: string;
  logoColor?: string;
  links?: readonly NavbarLink[];
}) => {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-bg-main/88 backdrop-blur">
      <div className="mx-auto flex min-h-15 max-w-295 items-center justify-between gap-5 px-6 max-md:flex-col max-md:items-start max-md:py-3">
        <Link
          className="flex items-center gap-2.5 whitespace-nowrap text-lg font-extrabold text-text-base"
          to="/"
        >
          <span
            className={cn("lab-logo-dot h-2 w-2 rounded-full", logoColor)}
          />
          {logo}
        </Link>
        <nav
          aria-label="Section nhanh"
          className="lab-top-nav flex gap-1 overflow-x-auto scrollbar-none max-md:w-full"
        >
          {links.map(([id, label]) => (
            <a className={navLinkClass} href={`#${id}`} key={id}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
