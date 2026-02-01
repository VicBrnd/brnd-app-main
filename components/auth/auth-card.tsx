import { ThemeSwitcher } from "@/components/theme/theme-switcher";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AuthCard(props: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{props.title}</CardTitle>
          <ThemeSwitcher />
        </div>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      {props.children}
    </Card>
  );
}
