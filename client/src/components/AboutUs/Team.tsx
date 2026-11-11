import { Users } from "lucide-react";

const team = [
  {
    name: "Peter Pham",
    profileLink: "https://www.linkedin.com/in/peterpham1512/",
    role: "Founder & CEO",
    initials: "PP",
    bio: "Software Engineer",
  },
];

export default function Team() {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ff7900]/30 bg-[#ff7900]/10 mb-6 cursor-default">
            <Users size={16} className="text-primary dark:text-[#ff9a3d]" />
            <span className="text-[13px] font-semibold text-primary dark:text-[#ff9a3d]">
              Our Team
            </span>
          </div>
          <h2 className="font-display font-bold tracking-[-0.03em] text-4xl text-gray-900 dark:text-white mb-4">
            The people behind Zemonie
          </h2>
          <p className="text-xl text-gray-600 dark:text-[#b5b3b2]">
            A small team with a big vision
          </p>
        </div>
        <div className="flex gpa-6 justify-center">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-linear-to-br from-[#ff9d33] to-[#ff6200] flex items-center justify-center text-white text-2xl font-bold shadow-[0_0_30px_rgba(255,121,0,0.35)]">
                {member.initials}
              </div>
              <a
                href={member.profileLink}
                target="_blank"
                className="text-lg font-bold text-gray-900 dark:text-white underline underline-offset-2"
              >
                {member.name}
              </a>
              <p className="text-sm text-primary dark:text-[#ff9a3d] mb-2 font-medium">
                {member.role}
              </p>
              <p className="text-sm text-gray-500 dark:text-[#8b8988]">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
