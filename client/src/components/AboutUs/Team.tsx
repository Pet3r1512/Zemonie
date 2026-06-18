import { Users, } from "lucide-react";

const team = [
  {
    name: "Peter Pham",
    profileLink: "https://www.linkedin.com/in/peterpham1512/",
    role: "Co-founder & CEO",
    initials: "PP",
    bio: "Software Engineer",
  },
];

export default function Team() {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-dark-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6 cursor-default">
            <Users size={20} className="text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Our Team</span>
          </div>
          <h2 className="text-4xl font-bold text-secondary mb-4">The people behind Zemonie</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">A small team with a big vision</p>
        </div>
        <div className="flex gpa-6 justify-center">
          {team.map((member,) => (
            <div key={member.name} className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {member.initials}
              </div>
              <a
                href={member.profileLink}
                target="_blank"
                className="text-lg font-bold text-gray-900 dark:text-white underline underline-offset-2"
              >
                {member.name}
              </a>
              <p className="text-sm text-primary mb-2 font-medium">{member.role}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
