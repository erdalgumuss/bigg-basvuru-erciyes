import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";
import type { BasvuruData } from "../schema";

const fontBase = typeof window !== "undefined" ? window.location.origin : "";
Font.register({
  family: "DejaVu",
  fonts: [
    { src: `${fontBase}/fonts/DejaVuSans.ttf`, fontWeight: "normal" },
    { src: `${fontBase}/fonts/DejaVuSans-Bold.ttf`, fontWeight: "bold" },
  ],
});
// Prevent word-level hyphenation that can cause layout issues with long labels
Font.registerHyphenationCallback((word) => [word]);

const BORDER = "#000";

const s = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 45,
    fontSize: 10,
    fontFamily: "DejaVu",
    lineHeight: 1.35,
    color: "#000",
  },
  cell: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: BORDER,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  cellTop: { borderTopWidth: 1 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
  logo1: { width: 180, height: 80, objectFit: "contain" },
  logo2: { width: 160, height: 68, objectFit: "contain" },
  titleCenter: { alignItems: "center" },
  titleBig: { fontSize: 20, fontWeight: "bold", marginVertical: 2, textAlign: "center" },
  titleMed: { fontSize: 16, fontWeight: "bold", marginVertical: 3, textAlign: "center" },
  kvkk: { fontSize: 9, textAlign: "justify" },
  zorunlu: { color: "#c00", fontSize: 9 },
  star: { color: "#c00" },
  hint: { color: "#c00", fontSize: 9 },
  textareaValue: { fontSize: 10, marginTop: 3, minHeight: 26 },
  choice: { fontSize: 10, marginTop: 2, flexDirection: "row" },
  contactTitle: { fontWeight: "bold", marginTop: 4 },
  instruction: { color: "#c00", fontSize: 9, marginTop: 2 },
});

function Check({ checked }: { checked: boolean }) {
  return <Text>{checked ? "☒" : "☐"}</Text>;
}

function Cell({ top, wrap = true, children }: { top?: boolean; wrap?: boolean; children: React.ReactNode }) {
  return <View style={[s.cell, top ? s.cellTop : {}]} wrap={wrap}>{children}</View>;
}

function InlineField({ label, value, top }: { label: string; value?: string; top?: boolean }) {
  return (
    <Cell top={top} wrap={false}>
      <Text>
        <Text>{label} </Text>
        <Text style={s.star}>*</Text>
        <Text>:{value ? ` ${value}` : ""}</Text>
      </Text>
    </Cell>
  );
}

function LongField({
  label, value, hint, top, required = true,
}: { label: string; value?: string; hint?: string; top?: boolean; required?: boolean }) {
  return (
    <Cell top={top}>
      <Text>
        {label}
        {required ? " " : ""}
        {required && <Text style={s.star}>*</Text>}
      </Text>
      {hint && <Text style={s.hint}>{hint}</Text>}
      <Text style={s.textareaValue}>{value || ""}</Text>
    </Cell>
  );
}

function ChoiceCell({
  label, instruction, options, selected, top, required = true,
}: {
  label: string;
  instruction?: string;
  options: string[];
  selected: string;
  top?: boolean;
  required?: boolean;
}) {
  return (
    <Cell top={top}>
      <Text>
        {label}
        {required ? " " : ""}
        {required && <Text style={s.star}>*</Text>}
      </Text>
      {instruction && <Text style={s.instruction}>{instruction}</Text>}
      {options.map((o) => (
        <View key={o} style={s.choice}>
          <Check checked={selected === o} />
          <Text> {o}</Text>
        </View>
      ))}
    </Cell>
  );
}

export function BasvuruPDF({ data }: { data: BasvuruData }) {
  const kurulusSelected =
    data.basvuruKurulusu === "erciyes"
      ? "Erciyes Teknopark – BİGG ERCİYES (Kayseri)"
      : data.basvuruKurulusu === "wind"
      ? "Süleyman Demirel Teknoloji Transfer Ofisi – BİGG WİND (Isparta)"
      : "";

  const calismaSelected =
    data.calismaDurumu === "Çalışıyorum" ? "Çalışıyorum."
    : data.calismaDurumu === "Çalışmıyorum" ? "Çalışmıyorum." : "";

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header: logos */}
        <Cell top wrap={false}>
          <View style={s.headerRow}>
            <Image src="/logos/bigg-erciyes.png" style={s.logo1} />
            <Image src="/logos/bigg-wind.png" style={s.logo2} />
          </View>
        </Cell>

        {/* Titles: BİGG ERCİYES / BİGG WİND + TÜBİTAK / BAŞVURU FORMU */}
        <Cell wrap={false}>
          <View style={[s.titleCenter, { paddingVertical: 10 }]}>
            <Text style={s.titleBig}>BİGG ERCİYES</Text>
            <Text style={s.titleBig}>BİGG WİND</Text>
            <Text style={s.titleMed}>TÜBİTAK 1812 BİGG 2026-1 ÇAĞRISI</Text>
            <Text style={s.titleMed}>BAŞVURU FORMU</Text>
          </View>
        </Cell>

        {/* KVKK */}
        <Cell>
          <Text style={s.kvkk}>
            TEKNOLOJİ VE YENİLİK DESTEK PROGRAMLARI BAŞKANLIĞI (TEYDEB) 1812 BİGG Yatırım Tabanlı
            Girişimcilik Destekleme Programı Başvuru bilgilerinin eksiksiz ve doğru şekilde girilmesi
            başvurunun değerlendirilmesi için önem arz etmektedir! KVKK BİLGİLENDİRME METNİ: KİŞİSEL
            VERİLERİNİZİN İŞLENMESİNDE 6698 SAYILI KANUNDA VE DİĞER KANUNLARDA ÖNGÖRÜLEN USUL VE
            ESASLAR DİKKATE ALINMAKTADIR. Kişisel verilerinizi mevzuattan doğan yetki ve
            yükümlülüklerimiz çerçevesinde, hukuka ve dürüstlük kurallarına uygun, belirli, açık,
            meşru amaçlar için ve onayınız çerçevesinde işlemekteyiz. Bu kapsamda tarafınızdan temin
            edilen isim, soy isim, e-posta, adres bilgisi gibi veriler kurumumuzun faaliyet ve
            etkinliklerle ilgili tarafınızı haberdar etmek üzere işlenmektedir. Kişisel verileriniz,
            elektronik ortamda mevcut bulunan veri tabanımızda muhafaza edilmektedir.
          </Text>
          <Text style={[s.zorunlu, { marginTop: 6 }]}>* Doldurulması zorunlu alandır.</Text>
        </Cell>

        {/* Personal info */}
        <InlineField label="Adınız ve Soyadınız" value={data.adSoyad} />
        <InlineField label="Kimlik Numaranız" value={data.kimlikNo} />
        <Cell>
          <Text>
            <Text>Cinsiyetiniz </Text>
            <Text style={s.star}>*</Text>
            <Text>: </Text>
            <Check checked={data.cinsiyet === "Kadın"} />
            <Text> Kadın  </Text>
            <Check checked={data.cinsiyet === "Erkek"} />
            <Text> Erkek</Text>
          </Text>
        </Cell>
        <InlineField label="Doğum Tarihiniz (Gün/Ay/Yıl)" value={data.dogumTarihi} />
        <InlineField label="Yaşınız" value={data.yas} />
        <InlineField label="Cep Telefonu Numaranız" value={data.telefon} />
        <InlineField label="E-posta Adresiniz" value={data.email} />
        <InlineField label="İl" value={data.il} />
        <InlineField label="İlçe" value={data.ilce} />
        <InlineField label="Semt" value={data.semt} />
        <InlineField label="Açık adresiniz" value={data.acikAdres} />
        <InlineField label="Posta Kodunuz" value={data.postaKodu} />

        {/* Institution + education */}
        <ChoiceCell
          label="Başvuru Kuruluşunuzu Seçiniz. (Süreçler her iki kuruluştan başvuran tüm girişimciler için Uygulayıcı Kuruluş Erciyes Teknopark tarafından ortak yürütülecektir.)"
          instruction="Yalnızca bir seçeneği işaretleyiniz!"
          options={[
            "Erciyes Teknopark – BİGG ERCİYES (Kayseri)",
            "Süleyman Demirel Teknoloji Transfer Ofisi – BİGG WİND (Isparta)",
          ]}
          selected={kurulusSelected}
        />
        <ChoiceCell
          label="Eğitim durumunuzu seçiniz."
          instruction="Yalnızca bir seçeneği işaretleyiniz!"
          options={[
            "Ön Lisans Öğrencisi", "Ön Lisans Mezunu",
            "Lisans Öğrencisi", "Lisans Mezunu",
            "Yüksek Lisans Öğrencisi", "Yüksek Lisans Mezunu",
            "Doktora Öğrencisi", "Doktora Mezunu",
          ]}
          selected={data.egitimDurumu}
        />
        <LongField
          label="Ön lisans eğitiminizi tamamladığınız/tamamlayacağınız üniversite/enstitü-fakülte/bölümü yazınız."
          hint="(Ön lisans eğitimi almadıysanız bu bölümü boş bırakabilirsiniz.)"
          value={data.onLisansOkul}
        />
        <LongField
          label="Ön lisans mezuniyet tarihinizi yazınız. (Ön lisans öğrencisi iseniz tahmini mezuniyet tarihinizi yazınız (Gün/Ay/Yıl))"
          hint="(Ön lisans eğitimi almadıysanız bu bölümü boş bırakabilirsiniz.)"
          value={data.onLisansTarih}
        />
        <LongField
          label="Lisans eğitiminizi tamamladığınız/tamamlayacağınız üniversite/enstitü-fakülte/bölümü yazınız."
          hint="(Lisans eğitimi almadıysanız bu bölümü boş bırakabilirsiniz.)"
          value={data.lisansOkul}
        />
        <LongField
          label="Lisans mezuniyet tarihinizi yazınız. (Lisans öğrencisi iseniz tahmini mezuniyet tarihinizi yazınız (Gün/Ay/Yıl))"
          hint="(Lisans eğitimi almadıysanız bu bölümü boş bırakabilirsiniz.)"
          value={data.lisansTarih}
        />
        <LongField
          label="Yüksek lisans eğitiminizi tamamladığınız/tamamlayacağınız üniversite/enstitü-fakülte/bölümü yazınız."
          hint="(Yüksek lisans eğitimi almadıysanız bu bölümü boş bırakabilirsiniz.)"
          value={data.yuksekLisansOkul}
        />
        <LongField
          label="Yüksek lisans mezuniyet tarihinizi yazınız. (Yüksek lisans öğrencisi iseniz tahmini mezuniyet tarihinizi yazınız (Gün/Ay/Yıl))"
          hint="(Yüksek lisans eğitimi almadıysanız bu bölümü boş bırakabilirsiniz.)"
          value={data.yuksekLisansTarih}
        />
        <LongField
          label="Doktora eğitiminizi tamamladığınız/tamamlayacağınız üniversite/enstitü-fakülte/bölümü yazınız."
          hint="(Doktora eğitimi almadıysanız bu bölümü boş bırakabilirsiniz.)"
          value={data.doktoraOkul}
        />
        <LongField
          label="Doktora mezuniyet tarihinizi yazınız. (Doktora öğrencisi iseniz tahmini mezuniyet tarihinizi yazınız (Gün/Ay/Yıl))"
          hint="(Doktora eğitimi almadıysanız bu bölümü boş bırakabilirsiniz.)"
          value={data.doktoraTarih}
        />

        {/* Idea */}
        <LongField
          label="AKADEMİSYENLER İÇİN: Görev yaptığınız üniversite/fakülte/ bölümünüzü yazınız."
          hint="(Akademisyen olmayan girişimci adayları boş bırakabilir.)"
          value={data.akademisyenBilgi}
          required={false}
        />
        <ChoiceCell
          label="İş fikri sahibinin çalışma durumu"
          instruction="Yalnızca bir seçeneği işaretleyiniz!"
          options={["Çalışıyorum.", "Çalışmıyorum."]}
          selected={calismaSelected}
        />
        <LongField label="İş fikrinizin adını yazınız" value={data.isFikriAdi} />
        <LongField label="İş fikrinizi DETAYLI ve ANLAŞILIR şekilde açıklayınız." value={data.isFikriAciklama} />
        <LongField
          label="İş fikrinizin yenilikçi, özgün yönlerini ve teknolojik üstünlüklerini maddeler halinde yazarak açıklayınız."
          value={data.yenilikciYonler}
        />
        <ChoiceCell
          label="İş fikrinizin tematik sınıfını belirtiniz. (Alt başlıklarla ilgili detaylı bilgi için; https://biggerciyes1812.com/)"
          instruction="Yalnızca bir seçeneği işaretleyiniz!"
          options={[
            "Akıllı Ulaşım", "Akıllı Üretim Sistemleri",
            "Enerji ve Temiz Teknolojiler", "İletişim ve Sayısal Dönüşüm",
            "Sağlık ve İyi Yaşam", "Sürdürülebilir Tarım ve Beslenme",
          ]}
          selected={data.tematikSinif}
        />
        <LongField label="İş fikrinizin ticari değeri ve pazar potansiyeli hakkında bilgi veriniz." value={data.ticariDeger} />
        <LongField label="Çözüm geliştirdiğiniz teknolojik alandaki ve sektördeki geçmiş tecrübenizi/uzmanlığınızı açıklayınız." value={data.gecmisTecrube} />
        <LongField label="Bugüne kadar iş fikrinizle ilgili yaptığınız çalışmaları ve iş fikrinizin şu an bulunduğu aşamayı açıklayınız" value={data.mevcutAsama} />

        {/* Team + yes/no */}
        <LongField
          label="Ekibiniz var ise tanıtınız. (ad, soyad, çalıştığı kurum, eğitim aldığı kurum, projedeki görevi vb.)"
          value={data.ekip}
        />
        <ChoiceCell
          label="Başvuran kişi olarak ön başvuru tarihi itibariyle herhangi bir işletmenin ortaklık yapısında yer alıyor musunuz?"
          options={["Evet", "Hayır"]}
          selected={data.ortaklikVarMi}
        />
        <ChoiceCell
          label="Daha önce TÜBİTAK tarafından düzenlenen veya TÜBİTAK'ın paydaşı olduğu yarışmalarda birincilik, ikincilik veya üçüncülük ödülü aldınız mı? Belgelendirebilir misiniz?"
          options={["Derece Aldım ve Belgelendirebilirim.", "Derece Almadım, Belgelendiremem."]}
          selected={data.tubitakOdulu}
        />
        <ChoiceCell
          label="ARDEB 1001 – Bilimsel ve Teknolojik Araştırma Projelerini Destekleme Programı, 1002 - Hızlı Destek Programı, 1003 – Öncelikli Alanlar Ar-Ge Projeleri Destekleme Programı, 1005 – Ulusal Yeni Fikirler ve Ürünler Araştırma Destek Programı 1071 – Uluslararası Araştırma Fonlarından Yararlanma Kapasitesinin ve Uluslararası Ar-Ge İşbirliklerine Katılımın Arttırılmasına Yönelik Destek Programı, 3501 – Kariyer Destek Programı'ndan en az birinde proje yürütücülüğü yaptınız mı? (TÜBİTAK Araştırma Destek Programları Başkanlığı (ARDEB) tarafından yürütülen aşağıdaki destek programları kapsamında proje yürütücülüğü yapmış girişimcilerin sunduğu iş planlarına 3 ödül puanı verilir. )"
          options={["Evet", "Hayır"]}
          selected={data.ardebProje}
        />
        <ChoiceCell
          label="Girişimcinin aşağıdaki hususlarla ilgili Etik Kurul Onay Belgesi başvurusunu 2. aşama başvurusu öncesinde gerçekleştirmiş veya başvuruya dair planlamayı iş planında detaylı olarak sunmuş olması tavsiye edilmektedir. Süreci hızlıca başlatabilir misiniz? (Etik Kurul Onay Belgesi'ne dair planlamalar panel değerlendirmesinde dikkate alınmaktadır. Anket, mülakat, odak grup çalışması, gözlem, deney, görüşme teknikleri kullanılarak katılımcılardan veri toplanmasını gerektiren nitel ya da nicel yaklaşımlarla yürütülen her türlü araştırma İnsan ve hayvanların (materyal/veriler dahil) deneysel ya da diğer bilimsel amaçlarla kullanılması İnsanlar üzerinde yapılan klinik araştırmalar Hayvanlar üzerinde yapılan araştırmalar Kişisel verilerin korunması kanunu gereğince retrospektif çalışmalar)"
          options={["Süreci hemen başlatabilirim.", "Süreç hakkında bilgim yok.", "Süreci yetiştiremem."]}
          selected={data.etikKurul}
        />
        <Cell>
          <Text style={{ fontSize: 9 }}>
            KVKK BİLGİLENDİRME METNİ: KİŞİSEL VERİLERİNİZİN İŞLENMESİNDE 6698 SAYILI KANUNDA VE DİĞER
            KANUNLARDA ÖNGÖRÜLEN USUL VE ESASLAR DİKKATE ALINMAKTADIR. Kişisel verilerinizi mevzuattan
            doğan yetki ve yükümlülüklerimiz çerçevesinde, hukuka ve dürüstlük kurallarına uygun,
            belirli, açık, meşru amaçlar için ve onayınız çerçevesinde işlemekteyiz. Bu kapsamda
            tarafınızdan temin edilen isim, soy isim, e-posta, adres bilgisi gibi veriler kurumumuzun
            faaliyet ve etkinliklerle ilgili tarafınızı haberdar etmek üzere işlenmektedir. Kişisel
            verileriniz, elektronik ortamda mevcut bulunan veri tabanımızda muhafaza edilmektedir.
            YUKARIDAKİ KVKK İLE İLGİLİ BİLGİLENDİRME METNİNİ OKUDUM{" "}
            <Text style={s.star}>*</Text>
          </Text>
          <View style={s.choice}>
            <Check checked={data.kvkkOnay} />
            <Text> Onaylıyorum.</Text>
          </View>
          <View style={s.choice}>
            <Check checked={!data.kvkkOnay} />
            <Text> Onaylamıyorum.</Text>
          </View>
        </Cell>

        {/* Contact */}
        <Cell>
          <Text style={{ fontWeight: "bold" }}>İLETİŞİM</Text>
          <Text style={s.contactTitle}>Uygulayıcı Kuruluş | Erciyes Teknopark</Text>
          <Text>Tülin ÖGÜL</Text>
          <Text>tulin.ogul@erciyesteknopark.com</Text>
          <Text>0352 224 81 12 – 327</Text>
          <Text style={s.contactTitle}>Süleyman Demirel TTO</Text>
          <Text>Sultan Nilay ŞENGÖL</Text>
          <Text>sultansengol@sdu.edu.tr</Text>
          <Text>0 246 211 09 30</Text>
        </Cell>
      </Page>
    </Document>
  );
}
