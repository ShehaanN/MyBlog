const CMSHeader = () => {
  const user = { name: "Shehan Nadeesha", email: "shehan@gmail.com" };
  return (
    <header className="sticky top-0 z-40 bg-background border-b border-border">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>

        {user && (
          <div className="flex items-center gap-3 ">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="font-semibold text-sm">
                {user.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default CMSHeader;
