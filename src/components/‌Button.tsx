import { cn } from "@/lib/utils";

export default function Button({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "flex items-center justify-center gap-2 rounded-full bg-blue-500 px-3 py-2 font-semibold text-white transition-colors hover:bg-blue-700 active:bg-blue-700 disabled:bg-gray-300",
        className,
      )}
      {...props}
    />
  );
}
