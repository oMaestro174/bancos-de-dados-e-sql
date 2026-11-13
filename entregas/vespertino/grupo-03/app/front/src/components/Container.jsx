export default function Container({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {children}
      </div>
    </div>
  );
}