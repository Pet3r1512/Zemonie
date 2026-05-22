import { ExternalLink } from "lucide-react";

export default function FooterBottom() {
  return (
    <div className="text-gray-500 flex justify-between">
      <p className="cursor-default">
        © {new Date().getFullYear().toString()} Zemonie. All rights reserved.
      </p>
      <a
        href="https://github.com/Pet3r1512/Zemonie"
        target="_blank"
        className="flex items-center gap-x-0.5 lg:hover:text-secondary transition-all duration-150 ease-linear"
      >
        <p>Github</p> <ExternalLink size={16} />
      </a>
    </div>
  );
}
