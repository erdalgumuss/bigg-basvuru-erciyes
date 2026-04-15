"use client";
import React, { useEffect, useState } from "react";
import { BasvuruData, defaultValues, zorunluAlanlar } from "@/lib/schema";
import { Section, Field, inputCls, textareaCls, RadioGroup } from "./ui";
import { generateAndDownloadPdf } from "@/lib/pdf/generatePdf";

const STORAGE_KEY = "bigg-basvuru-draft-v1";

const egitimOptions = [
  "Ön Lisans Öğrencisi", "Ön Lisans Mezunu",
  "Lisans Öğrencisi", "Lisans Mezunu",
  "Yüksek Lisans Öğrencisi", "Yüksek Lisans Mezunu",
  "Doktora Öğrencisi", "Doktora Mezunu",
] as const;

const tematikOptions = [
  "Akıllı Ulaşım", "Akıllı Üretim Sistemleri",
  "Enerji ve Temiz Teknolojiler", "İletişim ve Sayısal Dönüşüm",
  "Sağlık ve İyi Yaşam", "Sürdürülebilir Tarım ve Beslenme",
] as const;

export function BasvuruForm() {
  const [data, setData] = useState<BasvuruData>(defaultValues);
  const [loading, setLoading] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setData({ ...defaultValues, ...JSON.parse(raw) });
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {}
  }, [data]);

  function upd<K extends keyof BasvuruData>(k: K, v: BasvuruData[K]) {
    setData((d) => ({ ...d, [k]: v }));
  }

  const missing = zorunluAlanlar.filter((k) => {
    const v = data[k];
    if (typeof v === "boolean") return !v;
    return !v || String(v).trim() === "";
  });

  async function handleDownload() {
    setSubmitAttempted(true);
    if (missing.length > 0) {
      const first = document.querySelector(`[data-field="${missing[0]}"]`);
      if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    try {
      await generateAndDownloadPdf(data);
    } catch (e) {
      console.error(e);
      alert("PDF oluşturulurken bir hata oluştu. Konsolu kontrol edin.");
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    if (!confirm("Tüm alanlar silinecek. Emin misiniz?")) return;
    setData(defaultValues);
    localStorage.removeItem(STORAGE_KEY);
    setSubmitAttempted(false);
  }

  const err = (k: keyof BasvuruData) =>
    submitAttempted && missing.includes(k) ? "ring-2 ring-red-300 border-red-400" : "";

  return (
    <div className="mx-auto max-w-4xl px-4 pb-24 pt-10">
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <img src="/logos/bigg-erciyes.png" alt="BİGG ERCİYES" className="h-12 w-auto" />
          <img src="/logos/bigg-wind.png" alt="BİGG WİND" className="h-10 w-auto" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
          TÜBİTAK 1812 BİGG 2026-1 Çağrısı — Başvuru Formu
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Alanları doldurun, <strong>PDF İndir</strong> butonuna basın. Girdileriniz tarayıcınızda otomatik kaydedilir.
        </p>
      </header>

      <Section title="Kişisel Bilgiler">
        <div data-field="adSoyad">
          <Field label="Adınız ve Soyadınız" required>
            <input className={`${inputCls} ${err("adSoyad")}`} value={data.adSoyad} onChange={(e) => upd("adSoyad", e.target.value)} />
          </Field>
        </div>
        <div data-field="kimlikNo">
          <Field label="Kimlik Numaranız" required>
            <input className={`${inputCls} ${err("kimlikNo")}`} value={data.kimlikNo} onChange={(e) => upd("kimlikNo", e.target.value)} />
          </Field>
        </div>
        <div data-field="cinsiyet" className="md:col-span-2">
          <Field label="Cinsiyetiniz" required>
            <RadioGroup name="cinsiyet" value={data.cinsiyet} onChange={(v) => upd("cinsiyet", v as any)} options={["Kadın", "Erkek"] as const} columns={2} />
          </Field>
        </div>
        <div data-field="dogumTarihi">
          <Field label="Doğum Tarihiniz (Gün/Ay/Yıl)" required>
            <input className={`${inputCls} ${err("dogumTarihi")}`} placeholder="17/11/1998" value={data.dogumTarihi} onChange={(e) => upd("dogumTarihi", e.target.value)} />
          </Field>
        </div>
        <div data-field="yas">
          <Field label="Yaşınız" required>
            <input className={`${inputCls} ${err("yas")}`} value={data.yas} onChange={(e) => upd("yas", e.target.value)} />
          </Field>
        </div>
        <div data-field="telefon">
          <Field label="Cep Telefonu Numaranız" required>
            <input className={`${inputCls} ${err("telefon")}`} placeholder="+90 5XX XXX XX XX" value={data.telefon} onChange={(e) => upd("telefon", e.target.value)} />
          </Field>
        </div>
        <div data-field="email">
          <Field label="E-posta Adresiniz" required>
            <input type="email" className={`${inputCls} ${err("email")}`} value={data.email} onChange={(e) => upd("email", e.target.value)} />
          </Field>
        </div>
        <div data-field="il"><Field label="İl" required><input className={`${inputCls} ${err("il")}`} value={data.il} onChange={(e) => upd("il", e.target.value)} /></Field></div>
        <div data-field="ilce"><Field label="İlçe" required><input className={`${inputCls} ${err("ilce")}`} value={data.ilce} onChange={(e) => upd("ilce", e.target.value)} /></Field></div>
        <div data-field="semt"><Field label="Semt" required><input className={`${inputCls} ${err("semt")}`} value={data.semt} onChange={(e) => upd("semt", e.target.value)} /></Field></div>
        <div data-field="postaKodu"><Field label="Posta Kodu" required><input className={`${inputCls} ${err("postaKodu")}`} value={data.postaKodu} onChange={(e) => upd("postaKodu", e.target.value)} /></Field></div>
        <div data-field="acikAdres" className="md:col-span-2">
          <Field label="Açık Adresiniz" required full>
            <textarea className={`${textareaCls} ${err("acikAdres")}`} value={data.acikAdres} onChange={(e) => upd("acikAdres", e.target.value)} />
          </Field>
        </div>
      </Section>

      <Section title="Başvuru Kuruluşu">
        <div data-field="basvuruKurulusu" className="md:col-span-2">
          <Field label="Başvuru Kuruluşunuzu seçiniz" required full hint="Süreçler her iki kuruluştan başvuran tüm girişimciler için Uygulayıcı Kuruluş Erciyes Teknopark tarafından ortak yürütülür.">
            <RadioGroup
              name="basvuruKurulusu"
              value={data.basvuruKurulusu}
              onChange={(v) => upd("basvuruKurulusu", v as any)}
              options={["erciyes", "wind"] as const}
            />
            <div className="mt-1 text-xs text-slate-500">
              <strong>erciyes:</strong> Erciyes Teknopark – BİGG ERCİYES (Kayseri) ·{" "}
              <strong>wind:</strong> Süleyman Demirel TTO – BİGG WİND (Isparta)
            </div>
          </Field>
        </div>
      </Section>

      <Section title="Eğitim Durumu">
        <div data-field="egitimDurumu" className="md:col-span-2">
          <Field label="Eğitim durumunuz" required full>
            <RadioGroup name="egitimDurumu" value={data.egitimDurumu} onChange={(v) => upd("egitimDurumu", v as any)} options={egitimOptions} columns={2} />
          </Field>
        </div>
        <Field label="Ön Lisans Üniversite / Fakülte / Bölüm" hint="Almadıysanız boş bırakın."><input className={inputCls} value={data.onLisansOkul} onChange={(e) => upd("onLisansOkul", e.target.value)} /></Field>
        <Field label="Ön Lisans Mezuniyet Tarihi" hint="Gün/Ay/Yıl"><input className={inputCls} value={data.onLisansTarih} onChange={(e) => upd("onLisansTarih", e.target.value)} /></Field>
        <Field label="Lisans Üniversite / Fakülte / Bölüm" hint="Almadıysanız boş bırakın."><input className={inputCls} value={data.lisansOkul} onChange={(e) => upd("lisansOkul", e.target.value)} /></Field>
        <Field label="Lisans Mezuniyet Tarihi" hint="Gün/Ay/Yıl"><input className={inputCls} value={data.lisansTarih} onChange={(e) => upd("lisansTarih", e.target.value)} /></Field>
        <Field label="Yüksek Lisans Üniversite / Enstitü / Bölüm"><input className={inputCls} value={data.yuksekLisansOkul} onChange={(e) => upd("yuksekLisansOkul", e.target.value)} /></Field>
        <Field label="Yüksek Lisans Mezuniyet Tarihi" hint="Gün/Ay/Yıl"><input className={inputCls} value={data.yuksekLisansTarih} onChange={(e) => upd("yuksekLisansTarih", e.target.value)} /></Field>
        <Field label="Doktora Üniversite / Enstitü / Bölüm"><input className={inputCls} value={data.doktoraOkul} onChange={(e) => upd("doktoraOkul", e.target.value)} /></Field>
        <Field label="Doktora Mezuniyet Tarihi" hint="Gün/Ay/Yıl"><input className={inputCls} value={data.doktoraTarih} onChange={(e) => upd("doktoraTarih", e.target.value)} /></Field>
        <Field label="Akademisyen iseniz görev yaptığınız üniversite/fakülte/bölüm" full hint="Akademisyen değilseniz boş bırakabilirsiniz.">
          <textarea className={textareaCls} value={data.akademisyenBilgi} onChange={(e) => upd("akademisyenBilgi", e.target.value)} />
        </Field>
      </Section>

      <Section title="İş Fikri">
        <div data-field="calismaDurumu" className="md:col-span-2">
          <Field label="Çalışma Durumu" required full>
            <RadioGroup name="calismaDurumu" value={data.calismaDurumu} onChange={(v) => upd("calismaDurumu", v as any)} options={["Çalışıyorum", "Çalışmıyorum"] as const} columns={2} />
          </Field>
        </div>
        <div data-field="isFikriAdi" className="md:col-span-2">
          <Field label="İş fikrinizin adı" required full>
            <input className={`${inputCls} ${err("isFikriAdi")}`} value={data.isFikriAdi} onChange={(e) => upd("isFikriAdi", e.target.value)} />
          </Field>
        </div>
        <div data-field="isFikriAciklama" className="md:col-span-2">
          <Field label="İş fikrini DETAYLI ve ANLAŞILIR açıklayın" required full>
            <textarea className={`${textareaCls} ${err("isFikriAciklama")} min-h-[160px]`} value={data.isFikriAciklama} onChange={(e) => upd("isFikriAciklama", e.target.value)} />
          </Field>
        </div>
        <div data-field="yenilikciYonler" className="md:col-span-2">
          <Field label="Yenilikçi, özgün yönler ve teknolojik üstünlükler (maddeler halinde)" required full>
            <textarea className={`${textareaCls} ${err("yenilikciYonler")} min-h-[140px]`} value={data.yenilikciYonler} onChange={(e) => upd("yenilikciYonler", e.target.value)} />
          </Field>
        </div>
        <div data-field="tematikSinif" className="md:col-span-2">
          <Field label="Tematik Sınıf" required full>
            <RadioGroup name="tematikSinif" value={data.tematikSinif} onChange={(v) => upd("tematikSinif", v as any)} options={tematikOptions} columns={2} />
          </Field>
        </div>
        <div data-field="ticariDeger" className="md:col-span-2">
          <Field label="Ticari değeri ve pazar potansiyeli" required full>
            <textarea className={`${textareaCls} ${err("ticariDeger")}`} value={data.ticariDeger} onChange={(e) => upd("ticariDeger", e.target.value)} />
          </Field>
        </div>
        <div data-field="gecmisTecrube" className="md:col-span-2">
          <Field label="Teknolojik alandaki geçmiş tecrübeniz / uzmanlığınız" required full>
            <textarea className={`${textareaCls} ${err("gecmisTecrube")}`} value={data.gecmisTecrube} onChange={(e) => upd("gecmisTecrube", e.target.value)} />
          </Field>
        </div>
        <div data-field="mevcutAsama" className="md:col-span-2">
          <Field label="Bugüne kadar yapılan çalışmalar ve iş fikrinin mevcut aşaması" required full>
            <textarea className={`${textareaCls} ${err("mevcutAsama")}`} value={data.mevcutAsama} onChange={(e) => upd("mevcutAsama", e.target.value)} />
          </Field>
        </div>
        <div data-field="ekip" className="md:col-span-2">
          <Field label="Ekip bilgileri (ad, soyad, kurum, eğitim, projedeki görev)" required full>
            <textarea className={`${textareaCls} ${err("ekip")}`} value={data.ekip} onChange={(e) => upd("ekip", e.target.value)} />
          </Field>
        </div>
      </Section>

      <Section title="Ek Bilgiler">
        <div data-field="ortaklikVarMi" className="md:col-span-2">
          <Field label="Ön başvuru tarihi itibariyle herhangi bir işletmenin ortaklık yapısında yer alıyor musunuz?" required full>
            <RadioGroup name="ortaklikVarMi" value={data.ortaklikVarMi} onChange={(v) => upd("ortaklikVarMi", v as any)} options={["Evet", "Hayır"] as const} columns={2} />
          </Field>
        </div>
        <div data-field="tubitakOdulu" className="md:col-span-2">
          <Field label="Daha önce TÜBİTAK yarışmalarında derece aldınız mı?" required full>
            <RadioGroup
              name="tubitakOdulu"
              value={data.tubitakOdulu}
              onChange={(v) => upd("tubitakOdulu", v as any)}
              options={["Derece Aldım ve Belgelendirebilirim.", "Derece Almadım, Belgelendiremem."] as const}
            />
          </Field>
        </div>
        <div data-field="ardebProje" className="md:col-span-2">
          <Field label="ARDEB (1001/1002/1003/1005/1071/3501) programlarından birinde proje yürütücülüğü yaptınız mı?" required full>
            <RadioGroup name="ardebProje" value={data.ardebProje} onChange={(v) => upd("ardebProje", v as any)} options={["Evet", "Hayır"] as const} columns={2} />
          </Field>
        </div>
        <div data-field="etikKurul" className="md:col-span-2">
          <Field label="Etik Kurul Onay süreci" required full>
            <RadioGroup
              name="etikKurul"
              value={data.etikKurul}
              onChange={(v) => upd("etikKurul", v as any)}
              options={["Süreci hemen başlatabilirim.", "Süreç hakkında bilgim yok.", "Süreci yetiştiremem."] as const}
            />
          </Field>
        </div>
        <div data-field="kvkkOnay" className="md:col-span-2">
          <label className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 ${submitAttempted && !data.kvkkOnay ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50"}`}>
            <input type="checkbox" checked={data.kvkkOnay} onChange={(e) => upd("kvkkOnay", e.target.checked)} className="mt-1 h-4 w-4 accent-blue-600" />
            <span className="text-sm text-slate-700">
              KVKK Bilgilendirme Metnini okudum ve <strong>onaylıyorum</strong>.
            </span>
          </label>
        </div>
      </Section>

      <div className="sticky bottom-4 z-10 mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-lg backdrop-blur">
        <div className="text-sm text-slate-500">
          {missing.length === 0 ? (
            <span className="text-emerald-600">✓ Tüm zorunlu alanlar tamam.</span>
          ) : (
            <span>{missing.length} zorunlu alan eksik.</span>
          )}
        </div>
        <div className="flex gap-2">
          <button onClick={handleReset} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Formu Temizle
          </button>
          <button
            onClick={handleDownload}
            disabled={loading}
            className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "PDF Oluşturuluyor..." : "PDF İndir"}
          </button>
        </div>
      </div>
    </div>
  );
}
