import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: 'icnevudila Gizlilik Politikası - Kişisel verilerinizin nasıl toplandığı ve korunduğu hakkında bilgi.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#0f172a] to-[#1e293b]">
      <div className="container-custom py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-[#F97316]">Gizlilik Politikası</h1>
          <p className="text-gray-400 mb-8">Son güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
          
          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#F97316]">1. Toplanan Bilgiler</h2>
              <p className="mb-4">
                Bu web sitesi, ziyaretçilerden kişisel olarak tanımlanabilir bilgiler toplamamaktadır. 
                Ancak, web hosting sağlayıcısı ve analitik araçlar tarafından otomatik olarak toplanan 
                bazı teknik bilgiler bulunmaktadır.
              </p>
              <p className="mb-4">Bu bilgiler arasında şunlar olabilir:</p>
              <ul className="list-disc ml-6 space-y-2">
                <li>IP adresi</li>
                <li>Tarayıcı türü ve sürümü</li>
                <li>İşletim sistemi</li>
                <li>Sayfa görüntüleme zamanı</li>
                <li>Tıklanan linkler</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#F97316]">2. Çerezler (Cookies)</h2>
              <p className="mb-4">
                Bu site, ziyaretçi tercihlerini hatırlamak için çerezler kullanmaktadır. 
                Tema tercihiniz, dil seçiminiz gibi ayarlar çerezlerde saklanır.
              </p>
              <p className="mb-4">
                Çerezleri tarayıcı ayarlarınızdan yönetebilir ve silebilirsiniz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#F97316]">3. İletişim Formları</h2>
              <p className="mb-4">
                İletişim formunu doldurduğunuzda, gönderdiğiniz bilgiler (isim, e-posta, mesaj) 
                bizimle doğrudan iletişim kurmak için kullanılır. Bu bilgiler güvenli bir şekilde 
                saklanır ve üçüncü taraflarla paylaşılmaz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#F97316]">4. Veri Güvenliği</h2>
              <p className="mb-4">
                Kişisel bilgilerinizin güvenliğini sağlamak için SSL şifreleme kullanıyoruz. 
                Ancak, internet üzerinden veri iletiminin %100 güvenli olmasını garanti edemeyiz.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#F97316]">5. İletişim</h2>
              <p className="mb-4">
                Gizlilik politikasıyla ilgili sorularınız için benimle iletişime geçebilirsiniz:
              </p>
              <p className="mb-4">
                <strong className="text-[#F97316]">E-posta:</strong> icnevudila@gmail.com<br />
                <strong className="text-[#F97316]">Telegram:</strong> @icnevudila
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-[#F97316]">6. Değişiklikler</h2>
              <p className="mb-4">
                Bu gizlilik politikası zaman zaman güncellenebilir. Önemli değişiklikler 
                bu sayfada ilan edilecektir.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

