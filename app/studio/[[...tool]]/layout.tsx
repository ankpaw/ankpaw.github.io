export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div suppressHydrationWarning>
      {children}
    </div>
  );
}
