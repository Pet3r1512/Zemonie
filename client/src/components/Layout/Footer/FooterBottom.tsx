import { ExternalLink } from "lucide-react";

export default function FooterBottom() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-y-5 text-gray-500 dark:text-[#8b8988]">
      <p className="cursor-default">
        © {new Date().getFullYear().toString()} <strong className="text-primary">Zemonie</strong>.
        All rights reserved.
      </p>
      <a
        href="https://github.com/Pet3r1512/Zemonie"
        target="_blank"
        className="flex items-center gap-x-0.5 hover:text-[#ff9a3d] transition-all duration-150 ease-linear"
      >
        <p>Github</p> <ExternalLink size={16} />
      </a>
    </div>
  );
}
