export type Cinsiyet = "Kadın" | "Erkek" | "";
export type BasvuruKurulusu = "erciyes" | "wind" | "";
export type EgitimDurumu =
  | "Ön Lisans Öğrencisi"
  | "Ön Lisans Mezunu"
  | "Lisans Öğrencisi"
  | "Lisans Mezunu"
  | "Yüksek Lisans Öğrencisi"
  | "Yüksek Lisans Mezunu"
  | "Doktora Öğrencisi"
  | "Doktora Mezunu"
  | "";
export type CalismaDurumu = "Çalışıyorum" | "Çalışmıyorum" | "";
export type TematikSinif =
  | "Akıllı Ulaşım"
  | "Akıllı Üretim Sistemleri"
  | "Enerji ve Temiz Teknolojiler"
  | "İletişim ve Sayısal Dönüşüm"
  | "Sağlık ve İyi Yaşam"
  | "Sürdürülebilir Tarım ve Beslenme"
  | "";
export type EvetHayir = "Evet" | "Hayır" | "";
export type OdulDurumu =
  | "Derece Aldım ve Belgelendirebilirim."
  | "Derece Almadım, Belgelendiremem."
  | "";
export type EtikKurul =
  | "Süreci hemen başlatabilirim."
  | "Süreç hakkında bilgim yok."
  | "Süreci yetiştiremem."
  | "";

export interface BasvuruData {
  adSoyad: string;
  kimlikNo: string;
  cinsiyet: Cinsiyet;
  dogumTarihi: string;
  yas: string;
  telefon: string;
  email: string;
  il: string;
  ilce: string;
  semt: string;
  acikAdres: string;
  postaKodu: string;

  basvuruKurulusu: BasvuruKurulusu;
  egitimDurumu: EgitimDurumu;

  onLisansOkul: string;
  onLisansTarih: string;
  lisansOkul: string;
  lisansTarih: string;
  yuksekLisansOkul: string;
  yuksekLisansTarih: string;
  doktoraOkul: string;
  doktoraTarih: string;

  akademisyenBilgi: string;

  calismaDurumu: CalismaDurumu;
  isFikriAdi: string;
  isFikriAciklama: string;
  yenilikciYonler: string;
  tematikSinif: TematikSinif;
  ticariDeger: string;
  gecmisTecrube: string;
  mevcutAsama: string;

  ekip: string;

  ortaklikVarMi: EvetHayir;
  tubitakOdulu: OdulDurumu;
  ardebProje: EvetHayir;
  etikKurul: EtikKurul;
  kvkkOnay: boolean;
}

export const defaultValues: BasvuruData = {
  adSoyad: "", kimlikNo: "", cinsiyet: "", dogumTarihi: "", yas: "",
  telefon: "", email: "", il: "", ilce: "", semt: "", acikAdres: "", postaKodu: "",
  basvuruKurulusu: "", egitimDurumu: "",
  onLisansOkul: "", onLisansTarih: "", lisansOkul: "", lisansTarih: "",
  yuksekLisansOkul: "", yuksekLisansTarih: "", doktoraOkul: "", doktoraTarih: "",
  akademisyenBilgi: "",
  calismaDurumu: "", isFikriAdi: "", isFikriAciklama: "", yenilikciYonler: "",
  tematikSinif: "", ticariDeger: "", gecmisTecrube: "", mevcutAsama: "",
  ekip: "",
  ortaklikVarMi: "", tubitakOdulu: "", ardebProje: "", etikKurul: "",
  kvkkOnay: false,
};

export const zorunluAlanlar: (keyof BasvuruData)[] = [
  "adSoyad", "kimlikNo", "cinsiyet", "dogumTarihi", "yas", "telefon", "email",
  "il", "ilce", "semt", "acikAdres", "postaKodu",
  "basvuruKurulusu", "egitimDurumu", "calismaDurumu",
  "isFikriAdi", "isFikriAciklama", "yenilikciYonler", "tematikSinif",
  "ticariDeger", "gecmisTecrube", "mevcutAsama", "ekip",
  "ortaklikVarMi", "tubitakOdulu", "ardebProje", "etikKurul", "kvkkOnay",
];
