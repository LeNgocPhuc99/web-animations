import { Link } from "react-router";

import { sectionLinks, type SectionLink } from "../css-animations/data";
import { navLinkClass } from "../css-animations/classes";

const Navbar = ({
  links = sectionLinks,
}: {
  links?: readonly SectionLink[];
}) => {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-bg-main/88 backdrop-blur">
      <div className="mx-auto flex min-h-15 max-w-295 items-center justify-between gap-5 px-6 max-md:flex-col max-md:items-start max-md:py-3">
        <Link
          className="flex items-center gap-2.5 whitespace-nowrap text-lg font-extrabold text-text-base"
          to="/"
        >
          <span className="lab-logo-dot h-2 w-2 rounded-full bg-primary" />
          Animation Lab
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
