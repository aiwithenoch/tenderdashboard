import { Link } from "react-router";

type FooterLink = {
  title: string;
  href: string;
};

const footerLinks: FooterLink[] = [
  { title: "Document Vault", href: "/documents" },
  { title: "System Settings", href: "/settings" },
];

export default function Footer() {
  return (
    <div className="flex md:flex-row flex-col items-center justify-between gap-3 text-center">
      <p className="text-sm text-muted-foreground">
        © 2026 TenderPilot Enterprise · Private tender intelligence simulation
      </p>

      <div className="flex gap-4">
        {footerLinks.map((item) => (
          <Link
            key={item.title}
            to={item.href}
            className="text-sm hover:text-primary text-muted-foreground"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
