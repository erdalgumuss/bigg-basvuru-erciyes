import dynamic from "next/dynamic";

const BasvuruForm = dynamic(() => import("@/components/BasvuruForm").then((m) => m.BasvuruForm), {
  ssr: false,
  loading: () => <div className="p-10 text-center text-slate-500">Yükleniyor...</div>,
});

export default function Page() {
  return (
    <main>
      <BasvuruForm />
    </main>
  );
}
